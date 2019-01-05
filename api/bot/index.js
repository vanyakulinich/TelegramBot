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
      const dbResponse = await this.db.setNewReminder(
        msg.chat.id, 
        {
          text: match[1],
          date: match[2],
          time: match[3],
          dateUTC,
          dateMs: createMSDate(dateUTC)
        }
      );
      this.bot.sendMessage(
        msg.chat.id, 
        dbResponse ? messages.successReminder(match) : messages.errorMsg);
    });

    // any other commands
    this.bot.onText(/(.+)/, (msg, match) => {
      const matchedInput = Object.keys(botRegEx).find(expression => (
        botRegEx[expression].test(match[0]))
      );
      if(!matchedInput) {
        this.bot.sendMessage(
          msg.chat.id,
          (match[0].includes('remind')) ?
            messages.invalidRemind :
            messages.invalid
        );
      };
    });
  }
}

