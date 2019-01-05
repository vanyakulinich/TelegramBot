import Promise from 'bluebird';
import TelegramBot from 'node-telegram-bot-api';
import { BOT_KEY } from '../config/bot';
import { messages, botRegEx, manageValidations } from '../../helpers/botHelpers';
import { validDate } from '../../utils/dateUtils';
import { validTime, createUTCDate, createMSDate } from '../../utils/timeUtils';
Promise.config({
  cancellation: true
});


export default class Bot {
  constructor(database) {
    this.bot = new TelegramBot(BOT_KEY, { polling: true});
    this.db = database.getDB();
    this.nextReminder = {
      time: null,
      timeoutID: null
    }
  }

  // TODO: implement watching reminders
  start() {
    // bot start chat
    this.bot.onText(botRegEx.start, async msg => {
      const dbResponse = await this.db.startNewUser(msg.chat);
      this.bot.sendMessage(
        msg.chat.id, 
        dbResponse ? messages.start : messages.errorMsg)
    });

    // bot help
    this.bot.onText(botRegEx.help, msg => (
      this.bot.sendMessage(this.getId(msg), messages.help))
    );

    // web link 
    this.bot.onText(botRegEx.link, msg => {
      const link = `http://www.localhost:5000/vue-app/` // TODO: implement personal link
      this.bot.sendMessage(
        msg.chat.id,
        `[Your personal page link](${link})`, { parse_mode: 'Markdown' });
    });

    // set new reminder
    this.bot.onText(botRegEx.remind, async (msg, match) => {
      const dateValidation = validDate(match[2]);
      const timeValidation = validTime(match[3]);
      const isValid = manageValidations(dateValidation, timeValidation);
      if (!isValid.valid) {
        this.bot.sendMessage(msg.chat.id, isValid.msg)
        return;
      }
      const dateUTC = createUTCDate(match[2], match[3]);
      const dateMs = createMSDate(dateUTC);
      const dbResponse = await this.db.setNewReminder(
        msg.chat.id, 
        {
          text: match[1],
          date: match[2],
          time: match[3],
          dateUTC,
          dateMs,
          expired: false,
          repeat: false // TODO: implement repeat option
        }
      );
      this._watchNextReminder(msg.chat.id, dateMs);
      this.bot.sendMessage(
        msg.chat.id, 
        dbResponse ? messages.successReminder(match) : messages.errorMsg);
    });

    // any other commands
    this.bot.onText(/(.+)/, (msg, match) => {
      const matchedInput = Object.keys(botRegEx).find(expression => (
        botRegEx[expression].test(match[0]))
      );
      (!matchedInput) && (
        this.bot.sendMessage(
          msg.chat.id,
          (match[0].includes('remind')) ?
            messages.invalidRemind :
            messages.invalid
        )
      );
    });
  }

  _watchNextReminder(id, activateTime) {
    if(this.nextReminder.time > activatedTime) return;
    this.nextReminder.time = activateTime;
    const timePoint = activateTime - Date.now();
    this.nextReminder.timeoutID = setTimeout(() =>(
      this._activateClosestReminder(id, activateTime)
    ), timePoint)
  }

  async _activateClosestReminder(id, activateTime) {
    const reminderData = await this.db.activateReminder(id, activateTime);
    if (!reminderData) setTimeout(() => {
      this.db.activateReminder(id, activateTime);
    }, 1000);
    const { text, date, time } = reminderData;
    this.bot.sendMessage(
      id, 
      messages.activatedReminder({ text, date, time })
    );
  }

  async _toggleClosestReminder() {
    const newClosestReminder = await this.db._toggleClosestReminder();
    console.log(newClosestReminder);
    // TODO: implement nearest reminder
  }
}

