import { firebase } from "../../config/db";
import {
  path,
  newUserFactory,
  webConnectFactory,
  webDataFactory
} from "../../utils/dbUtils";

export default class Database {
  constructor() {
    this.db = firebase.database();
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

  async setNewReminder(id, reminder) {
    const reminders = await this.db.ref(path.reminders(id));
    return reminders.once("value").then(
      data => {
        const existingReminders = data.val();
        const newReminder = {
          [reminder.dateMs]: {
            ...reminder
          }
        };
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

  getReminders(id) {
    return this.db
      .ref(path.reminders(id))
      .once("value")
      .then(data => data.val(), err => false);
  }

  activateReminder(id, reminderId) {
    const reminderPath = this.db.ref(path.reminderId(id, reminderId));
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
  // web
  async setUpWebConnection({ tokens, id }) {
    const webConnect = webConnectFactory(tokens);
    const user = await this.db.ref(path.user(id));
    user.update({ webConnect }, err => false);
    return user ? tokens.publicToken : user;
  }

  async getUserDataForWebApp(urlToken) {
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
              users[id].webConnect.publicToken === urlToken
          );
          const isExpiredLink = this._checkLinkExpiration(
            users[matchedId].webConnect
          );
          // TODO: handle with link lifetime and set db watchers
          if (isExpiredLink) {
            this.db.ref(path.user(matchedId)).update({ webConnect: null });
            return false;
          }
          matchedId &&
            this.db.ref(path.web(matchedId)).update({ isConnected: true });
          return matchedId && webDataFactory(users[matchedId]);
        },
        err => false
      );
  }

  _checkLinkExpiration(data) {
    const { askLinkTime, linkLifeTime } = data;
    return askLinkTime + linkLifeTime < Date.now();
  }
}
