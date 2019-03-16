import { firebase, ID_DECODER } from "../../config/db";
import {
  dbPath as path,
  createNewUser,
  createNewWebConnect,
  createUserWebData,
  checkLinkLifeTime,
  createNewReminder
} from "../../utils/dbUtils";

export default class Database {
  constructor() {
    this.db = firebase.database();
    this.watcher = this.watcherGenerator();
    this.nextReminderToFire = {
      time: null,
      timeoutID: null
    };
    // start watcher
    this.watcher.next();
  }

  // db instance getter
  get DB() {
    return this;
  }
  // setter of bot reverse callback
  set botCB(cb) {
    this.cbToBot = cb;
  }

  // new user creator
  async startNewUser(userData) {
    const users = await this.db.ref(path.users());
    return users.once("value").then(
      data => {
        !data.child(userData.id).exists() &&
          users.update(createNewUser(userData));
        return true;
      },
      err => false
    );
  }

  // bot data handler
  botDataHandler(id, data, method) {
    const newReminder = createNewReminder(data);
    return this._dataHandler(id, newReminder, method, "reminder");
  }

  async botAskListOfReminders(id) {
    const reminders = await this.db.ref(path.reminders(id));
    return reminders
      .once("value")
      .then(data => data.val())
      .then(
        list => {
          const prepairedList = Object.keys(list).map(item => {
            const { date, time, text, expired } = list[item];
            return { date, time, text, expired };
          });
          return prepairedList;
        },
        err => false
      );
  }

  // reciever of data from web app
  async manageDataFromWebRequest({ tokens, data, type, method }) {
    const userId = await this._checkTokens(tokens);
    return userId ? this._dataHandler(userId, data, method, type) : false;
  }

  // checker of web tokens
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

  // private data handler
  _dataHandler(id, data, method, type) {
    const actionType =
      method === "put" || method === "post" ? "update" : method;
    return this[`_${type}Manager`](id, data, actionType);
  }

  // manager of reminders
  async _reminderManager(id, reminder, type) {
    const user = await this.db.ref(path.user(id));
    return user
      .once("value")
      .then(data => data.val())
      .then(
        userData => {
          const { reminders, nextReminder = null } = userData;
          let updatedReminders = reminders === "empty" ? {} : { ...reminders };
          type === "update" &&
            (updatedReminders[reminder.id] = { ...reminder });
          type === "delete" && delete updatedReminders[reminder.id];

          const isRemindersLength = !!Object.keys(updatedReminders).length;
          const closestReminder = isRemindersLength
            ? this._findUserClosestReminderDate(updatedReminders)
            : null;
          user.update({
            reminders: isRemindersLength ? { ...updatedReminders } : "empty",
            nextReminder:
              closestReminder != nextReminder ? closestReminder : nextReminder
          });
          (!nextReminder || closestReminder != this.nextReminderToFire.time) &&
            this.watcher.next();
          return isRemindersLength ? { ...updatedReminders } : null;
        },
        err => false
      );
  }

  // manager of personal info
  async _personalManager(id, personal, type) {
    const personalData = await this.db.ref(path.personal(id));
    return personalData
      .once("value")
      .then(data => data.val())
      .then(
        personalInfo => {
          const item = Object.entries(personal);
          const extra = personalInfo.extra || {};
          type === "update" && (extra[item[0][0]] = item[0][1]);
          type === "delete" && delete extra[item[0][0]];
          const updatedPersonalData = {
            ...personalInfo,
            extra: {
              ...extra
            }
          };
          personalData.update(updatedPersonalData);
          return updatedPersonalData;
        },
        err => false
      );
  }

  // watcher of next reminder to fire
  *watcherGenerator() {
    while (true) {
      yield;
      const users = this.db.ref(path.users());
      users
        .once("value")
        .then(data => data.val())
        .then(
          allUsers => {
            const usersIds = Object.keys(allUsers)
              .filter(id => allUsers[id].nextReminder)
              .sort((a, b) => a.dateMs - b.dateMs);
            const nearestUser = !!usersIds.length && usersIds[0];
            const reminderTime = nearestUser
              ? allUsers[nearestUser].nextReminder.dateMs
              : null;

            // remove prev timeout
            this.nextReminderToFire.timeoutID &&
              clearTimeout(this.nextReminderToFire.timeoutID);

            // set next reminder to fire
            this.nextReminderToFire.time = reminderTime;
            this.nextReminderToFire.timeoutID = reminderTime
              ? setTimeout(() => {
                  const expireReminderId =
                    allUsers[nearestUser].nextReminder.id;
                  this._expireReminder(nearestUser, expireReminderId);
                }, reminderTime - Date.now())
              : null;
          },
          err => false
        );
    }
  }

  // find and set user closest reminder
  _findUserClosestReminderDate(reminders) {
    let closestReminderDate = null;
    for (let reminder in reminders) {
      const { expired, dateMs, id } = reminders[reminder];
      if (expired) continue;
      if (!closestReminderDate || dateMs < closestReminderDate) {
        closestReminderDate = { dateMs, id };
      }
    }
    return closestReminderDate;
  }

  // set up expired reminder, when it has already fired
  async _expireReminder(id, reminderId) {
    const user = await this.db.ref(path.user(id));
    user
      .once("value")
      .then(data => data.val())
      .then(userData => {
        const { reminders } = userData;
        reminders[reminderId].expired = true;
        const updatedReminders = {
          ...reminders
        };
        const nextClosestReminder = this._findUserClosestReminderDate(
          reminders
        );
        user.update({
          reminders: updatedReminders,
          nextReminder: nextClosestReminder
        });
        const { text, date, time } = reminders[reminderId];
        this.cbToBot({ id, text, date, time });
        this.watcher.next();
      });
  }

  // web app methods
  async setUpWebConnection({ tokens, id }) {
    tokens.id = id ^ ID_DECODER;
    const webConnect = createNewWebConnect(tokens);
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
          return matchedId ? createUserWebData(users[matchedId]) : false;
        },
        err => false
      );
  }
}
