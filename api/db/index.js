import { firebase, ID_DECODER } from "../../config/db";
import {
  path,
  newUserFactory,
  webConnectFactory,
  webDataFactory,
  checkLinkLifeTime
} from "../../utils/dbUtils";
import { capitalizeStringFirstLetter } from "../../helpers/generalHelpers";

export default class Database {
  constructor() {
    this.db = firebase.database();
  }
  // private methods
  async _checkTokens(tokens) {
    const userId = tokens.id ^ ID_DECODER;
    const webConnection = await this.db.ref(path.web(userId));
    return webConnection
      .once("value")
      .then(data => data.val())
      .then(
        webConnect =>
          webConnect &&
          webConnect.publicToken === tokens.publicToken &&
          webConnect.privateToken === tokens.privateToken
            ? userId
            : false,
        err => false
      );
  }

  async _manageReminder(id, reminder) {
    const reminders = await this.db.ref(path.reminders(id));
    return reminders.once("value").then(
      data => {
        const existingReminders = data.val();
        const manageReminder = () => {
          if (!reminder.dateMs)
            return {
              [existingReminders[reminder.DateMs]]: null
            };
          return existingReminders[reminder.dateMs]
            ? {
                [existingReminders[reminder.dateMs]]: { ...reminder }
              }
            : {
                [reminder.dateMs]: { ...reminder }
              };
        };
        const newReminder = manageReminder();
        const newData =
          !existingReminders || existingReminders === "empty"
            ? newReminder
            : { ...existingReminders, ...newReminder };
        reminders.update(newData);
        this._toggleClosestReminder(id, reminder.dateMs);
        return true;
      },
      err => false
    );
  }

  async _managePersonal(id, personal) {
    const personalData = await this.db.ref(path.personal(id));
    return personalData.once("value").then(
      data => {
        const personalInfo = data.val();
        const newPersonalInfo = () => {
          const items = Object.entries(personal);
          if (!personalInfo.extra) personalInfo.extra = {};
          if (items[0][1]) {
            personalInfo.extra[items[0][0]] = items[0][1];
          } else {
            delete personalInfo.extra[items[0][0]];
          }
          return {
            ...personalInfo,
            extra: {
              ...personalInfo.extra
            }
          };
        };
        const updatedInfo = newPersonalInfo();
        personalData.update(updatedInfo);
        return updatedInfo;
      },
      err => false
    );
  }

  _nextClosestReminder(id) {
    const reminders = this.db.ref(path.reminders(id));
    reminders
      .once("value")
      .then(data => data.val())
      .then(idReminders => {
        const newReminder = Object.keys(idReminders).find(
          item => !idReminders[item].expired
        );
        return newReminder;
      })
      .then(closest => {
        this.db.ref(path.user(id)).update({ nextReminder: closest || null });
      });
  }

  _toggleClosestReminder(id, reminderDate) {
    const closestReminder = this.db.ref(path.nextReminder(id));
    closestReminder
      .once("value")
      .then(data => data.val())
      .then(nextReminder => {
        const user = this.db.ref(path.user(id));
        if (
          !nextReminder ||
          reminderDate < nextReminder ||
          nextReminder < Date.now()
        ) {
          user.update({ nextReminder: reminderDate });
        }
      });
  }

  getDB() {
    return this;
  }

  async getUser(id) {
    const user = await this.db.ref(path.user(id));
    return user.once("value").then(data => data.val(), err => false);
  }

  async startNewUser(userData) {
    const users = await this.db.ref(path.users());
    return users.once("value").then(
      data => {
        !data.child(userData.id).exists() &&
          users.update(newUserFactory(userData));
        return true;
      },
      err => false
    );
  }

  manageReminder(id, reminder) {
    return this._manageReminder(id, reminder);
  }

  async manageDataFromWebRequest({ tokens, data, type }) {
    const userId = await this._checkTokens(tokens);
    const dataType = capitalizeStringFirstLetter(type);
    return userId ? this[`_manage${dataType}`](userId, data) : false;
  }

  async activateReminder(id, reminderId) {
    const reminderPath = await this.db.ref(path.reminderId(id, reminderId));
    return reminderPath
      .once("value")
      .then(
        reminder => {
          const reminderData = {
            ...reminder.val(),
            expired: true
          };
          reminderPath.update({
            ...reminderData
          });
          return reminderData;
        },
        err => false
      )
      .then(data => {
        if (!data) return false;
        this._nextClosestReminder(id);
        return data;
      });
  }

  async findClosestReminderInUsers() {
    const users = await this.db.ref(path.users());
    return users
      .once("value")
      .then(data => data.val())
      .then(
        users => {
          const usersIds = Object.keys(users);
          const newNextReminder = {
            time: 0,
            id: null
          };
          usersIds.forEach(user => {
            if (
              !newNextReminder.time ||
              (users[user].nextReminder &&
                users[user].nextReminder < newNextReminder.time)
            ) {
              newNextReminder.time = users[user].nextReminder || null;
              newNextReminder.id = user;
            }
          });
          return newNextReminder;
        },
        err => false
      );
  }

  // web connection
  async setUpWebConnection({ tokens, id }) {
    tokens.id = id ^ ID_DECODER;
    const webConnect = webConnectFactory(tokens);
    const user = await this.db.ref(path.user(id));
    user.update({ webConnect }, err => false);
    return user ? tokens.publicToken : false;
  }

  async closeWebConnection({ tokens }) {
    const userId = await this._checkTokens(tokens);
    if (!userId) return false;
    const userWebConnect = await this.db.ref(path.user(userId));
    userWebConnect.update({ webConnect: null }, err => false);
    return true;
  }

  // web init request for data
  async getInitUserDataForWebApp(urlToken) {
    const users = await this.db.ref(path.users());
    return users
      .once("value")
      .then(data => data.val())
      .then(
        users => {
          const userIds = Object.keys(users);
          const matchedId = userIds.find(
            id =>
              users[id].webConnect &&
              checkLinkLifeTime(users[id].webConnect) &&
              users[id].webConnect.publicToken === urlToken
          );
          return matchedId ? webDataFactory(users[matchedId]) : false;
        },
        err => false
      );
  }
}
