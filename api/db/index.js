import { firebase } from '../config/db';
import { path, newUserFactory } from '../../utils/dbUtils';

class Database {
  constructor() {
    this.db = firebase.database();
  }

  getDB() {
    return this;
  }

  getUser(id) {
    const user = this.db.ref(path.user(id));
    return (
      user
        .once('value')
        .then(data => data.val(),
          err => false)
    )
  }

  startNewUser(userData) {
    const { id, first_name, last_name } = userData;
    const users = this.db.ref(path.users());
    return (
      users
        .once('value')
        .then((data) => {
          (!data.child(id).exists()) && (
            users.update(newUserFactory(id, first_name, last_name))
          )
          return true;
        },
        err => false)
    )
  }

  setNewReminder(id, reminder) {
    const reminders = this.db.ref(path.reminders(id));
    return (
      reminders
        .once('value')
        .then(data => {
          const existingReminders = data.val();
          const newReminder = {
            [reminder.dateMs]: {
              ...reminder
            }
          }
          const newData = (
            (!existingReminders ||
            existingReminders === 'empty') ?
              newReminder : 
              { ...existingReminders, ...newReminder }
          )
          reminders.update(newData);
          this._toggleClosestReminder(id, reminder.dateMs);
          return true;
        },
        err => false)
    )
  }

  getReminders(id) {
    return (
      this.db.ref(path.reminders(id))
      .once('value')
      .then(data => data.val(),
        err => false)
    )
  }

  activateReminder(id, reminderId) {
    const reminderPath = this.db.ref(
      path.reminderId(id, reminderId)
    );
    return (
      reminderPath
        .once('value')
        .then(reminder => {
          const reminderData = {
            ...reminder.val(),
            expired: true
          }
          reminderPath.update(
            {
              ...reminderData
            }
          );
          return reminderData;
        }, err => false)
        .then(data => {
          if(!data) return false;
          this._nextClosestReminder(id);
          return data;
        })
    )
  }

  _nextClosestReminder(id) {
    const reminders = this.db.ref(
      path.reminders(id)
    );
    reminders
      .once('value')
      .then(data => data.val())
      .then(idReminders => {
        const newReminder = Object.keys(idReminders).find(item =>(
          !idReminders[item].expired
        ))
        return newReminder;
      })
      .then(closest => {
        this.db.ref(path.user(id))
          .update({ nextReminder: closest || null })
      });
  }

  _toggleClosestReminder(id, reminderDate) {
    const closestReminder = this.db.ref(path.nextReminder(id));
    closestReminder
      .once('value')
      .then(data => data.val())
      .then(nextReminder => {
        const user = this.db.ref(path.user(id));
        if (!nextReminder ||
            reminderDate < nextReminder ||
            nextReminder < Date.now()) {
          user.update({ nextReminder: reminderDate });
        }
      })
  }

  findClosestReminderInUsers() {
    const users = this.db.ref(path.users());
    return (
      users
        .once('value')
        .then(data => data.val())
        .then(users => {
          const usersIds = Object.keys(users);
          const newNextReminder = {
            time: 0,
            id: null
          }
          usersIds.forEach(user => {
            if(!newNextReminder.time  ||
              ( users[user].nextReminder &&
                users[user].nextReminder < newNextReminder.time)) {
              newNextReminder.time = users[user].nextReminder || null;
              newNextReminder.id = user;
            } 
          })
          return newNextReminder;
        })
    )
  }
}

export default new Database();