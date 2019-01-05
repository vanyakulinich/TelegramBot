import { firebase } from '../config/db';

class Database {
  constructor() {
    this.db = firebase.database();
    this._usersPath = '/users'
  }

  _remindersPath(id) {
    return `/users/${id}/reminders`;
  }

  getDB() {
    return this;
  }

  startNewUser(userData) {
    const { id, first_name, last_name } = userData;
    return (
      this.db.ref(this._usersPath).once('value')
      .then((data) => {
        if(!data.child(id).exists()) {
          this.db.ref(this._usersPath).update({
            [id]: {
              personal: {
                firstName: first_name || '',
                lastName: last_name || ''
              },
              reminders: 'empty'
            }
          });
        }
        return true;
      },
      err => false)
    )
  }

  setNewReminder(id, reminder) {
    return (
      this.db.ref(this._remindersPath(id)).once('value')
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
            Object.assign({}, existingReminders, newReminder)
        )
        this.db.ref(this._remindersPath(id)).update(newData);
        return true;
      },
      err => false)
    )
  }
}

export default new Database();