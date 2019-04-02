import FirebaseBasic from "./Database";
import { ID_DECODER } from "../../config/db";
import {
  dbPath as path,
  createNewUser,
  createNewWebConnect,
  createUserWebData,
  checkLinkLifeTime,
  createNewReminder
} from "../../utils/dbUtils";
import { isToday } from "../../utils/dateUtils";
import { checkIfReminderTimeIsAvaliable } from "../../utils/reminderUtils";

// TODO: REmove these methods to basic class
class DatabaseLib extends FirebaseBasic {
  constructor() {
    super();
  }
  _applyIdDecoder(id) {
    return id ^ ID_DECODER;
  }

  async _dbDataAccess(path) {
    try {
      const dbRef = await this.db.ref(path);
      const dbData = await dbRef.once("value");
      return { dbData, dbRef };
    } catch (err) {
      return false;
    }
  }

  async _dbDataValAccess(path) {
    const dbAccess = await this._dbDataAccess(path);
    if (!dbAccess) return false;
    const { dbRef, dbData } = dbAccess;
    return { dbRef, dbDataVal: dbData.val() };
  }
}

// --------------------------------------------
export default class DBLib extends DatabaseLib {
  constructor() {
    super();
    this.watcher = this.watcherGenerator();
    this.nextReminderToFire = {
      time: null,
      timeoutID: null
    };
    // start watcher
    this.watcher.next();
  }

  async startNewUser(userData) {
    const dbAccess = await this._dbDataAccess(path.users());
    if (!dbAccess) return false;
    const { dbData, dbRef } = dbAccess;
    const isNewUser = !dbData.child(userData.id).exists();
    if (isNewUser) dbRef.update(createNewUser(userData));
    return true;
  }

  botDataHandler(id, data, method) {
    const newReminder = createNewReminder(data);
    return this._dataHandler(id, newReminder, method, "reminder");
  }

  async botAskListOfReminders(id, isTodayList) {
    const dbAccess = await this._dbDataValAccess(path.reminders(id));
    if (!dbAccess) return false;
    const { dbDataVal: remindersList } = dbAccess;
    let prepairedList = "";
    const isEmptyList = remindersList === "empty" || !remindersList;
    if (isEmptyList) return "empty";
    Object.keys(remindersList).forEach(item => {
      const { date, time, text, expired, dateMs } = remindersList[item];
      if (isTodayList && !isToday(dateMs)) return;
      const expiredMark = expired ? "expired" : "active";
      prepairedList += `${date} ${time} ${text} (${expiredMark})\n`;
    });
    return prepairedList || "empty";
  }

  async manageDataFromWebRequest({ tokens, data, type, method }) {
    const userId = await this._checkTokens(tokens);
    return userId ? this._dataHandler(userId, data, method, type) : false;
  }

  async _checkTokens(tokens) {
    const userId = this._applyIdDecoder(tokens.id);
    const dbAccess = await this._dbDataValAccess(path.web(userId));
    if (!dbAccess) return false;
    const { dbDataVal: webConnect } = dbAccess;
    const isValidConnection =
      webConnect &&
      webConnect.publicToken === tokens.publicToken &&
      webConnect.privateToken === tokens.privateToken;

    return isValidConnection ? userId : false;
  }

  _dataHandler(id, data, method, type) {
    const actionType =
      method === "put" || method === "post" ? "update" : method;
    return this[`_${type}Manager`](id, data, actionType);
  }

  // reminder manager methods
  _updateReminders(reminder, remindersList) {
    const reminderExist = checkIfReminderTimeIsAvaliable(
      reminder,
      remindersList
    );
    if (reminderExist) return false;
    return { ...remindersList, [reminder.id]: { ...reminder } };
  }

  async _reminderManager(id, reminder, type) {
    const dbAccess = await this._dbDataValAccess(path.user(id));
    if (!dbAccess) return false;
    const { dbDataVal: userData, dbRef: userRef } = dbAccess;
    const { reminders, nextReminder = null } = userData;

    const isEmptyReminders = !reminders || reminders === "empty";
    let remindersMap = isEmptyReminders ? {} : { ...reminders };

    if (type === "update") {
      remindersMap = this._updateReminders(reminder, remindersMap);
      if (!remindersMap) return "exist";
    }
    if (type === "delete") delete remindersMap[reminder.id];

    const isRemindersLength = !!Object.keys(remindersMap).length;

    const closestReminder = isRemindersLength
      ? this._findUserClosestReminderDate(remindersMap)
      : null;

    const newReminders = isRemindersLength ? { ...remindersMap } : "empty";
    const newNextReminder =
      closestReminder != nextReminder ? closestReminder : nextReminder;

    userRef.update({
      reminders: newReminders,
      nextReminder: newNextReminder
    });

    const notEqualTimes = closestReminder != this.nextReminderToFire.time;

    (!nextReminder || notEqualTimes) && this.watcher.next();

    return isRemindersLength ? { ...remindersMap } : null;
  }

  async _personalManager(id, personal, type) {
    const dbAccess = await this._dbDataValAccess(path.personal(id));
    if (!dbAccess) return false;
    const { dbDataVal: personalInfo, dbRef: personalRef } = dbAccess;

    const [name, value] = Object.entries(personal)[0];
    const extra = personalInfo.extra || {};

    type === "update" && (extra[name] = value);
    type === "delete" && delete extra[name];

    const updatedPersonalInfo = {
      ...personalInfo,
      extra: {
        ...extra
      }
    };
    personalRef.update(updatedPersonalInfo);
    return updatedPersonalInfo;
  }

  // TODO REFACTOR and bug fix
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

  _findUserClosestReminderDate(reminders) {
    let closestReminderDate = null;
    for (let reminder in reminders) {
      const { expired, dateMs, id } = reminders[reminder];
      if (expired) continue;
      if (!closestReminderDate || dateMs < closestReminderDate.dateMs) {
        closestReminderDate = { dateMs, id };
      }
    }
    return closestReminderDate;
  }

  async _expireReminder(id, reminderId) {
    const dbAccess = await this._dbDataValAccess(path.user(id));
    if (!dbAccess) return false;
    const { dbDataVal: userData, dbRef: userRef } = dbAccess;
    const { reminders } = userData;

    reminders[reminderId].expired = true;

    const updatedReminders = {
      ...reminders
    };

    const nextClosestReminder = this._findUserClosestReminderDate(reminders);

    user.update({
      reminders: updatedReminders,
      nextReminder: nextClosestReminder
    });

    const { text, date, time } = reminders[reminderId];
    this.botCallback({ id, text, date, time });
    this.watcher.next();
  }

  // web app methods
  async setUpWebConnection({ tokens, id }) {
    const updatedTokens = { ...tokens };
    updatedTokens.id = this._applyIdDecoder(id);
    const webConnect = createNewWebConnect(updatedTokens);
    const dbAccess = await this._dbDataAccess(path.user(id));
    if (!dbAccess) return false;
    const { dbRef: userRef } = dbAccess;
    userRef.update({ webConnect });
    return userRef ? updatedTokens.publicToken : false;
  }

  async closeWebConnection({ tokens }) {
    const userId = await this._checkTokens(tokens);
    if (!userId) return false;
    const dbAccess = await this._dbDataAccess(path.user(userId));
    if (!dbAccess) return false;
    const { dbRef } = dbAccess;
    dbRef.update({ webConnect: null });
    return true;
  }

  async getInitUserDataForWebApp(urlToken) {
    const dbAccess = await this._dbDataValAccess(path.users());
    if (!dbAccess) return false;
    const { dbDataVal: users } = dbAccess;
    const userIds = Object.keys(users);
    const matchedId = userIds.find(
      id =>
        users[id].webConnect &&
        checkLinkLifeTime(users[id].webConnect) &&
        users[id].webConnect.publicToken === urlToken
    );
    return matchedId ? createUserWebData(users[matchedId]) : false;
  }
}
