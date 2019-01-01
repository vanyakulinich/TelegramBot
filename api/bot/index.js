import Promise from 'bluebird';
import TelegramBot from 'node-telegram-bot-api';
import { BOT_KEY } from '../config/bot';
import { messages, botRegEx, remindMessage } from '../../helpers/botHelpers';
import { validDate } from '../../utils/dateUtils';
import { validTime } from '../../utils/timeUtils';
Promise.config({
  cancellation: true
});


export default class Bot {
  constructor(database) {
    this.bot = new TelegramBot(BOT_KEY, { polling: true});
    this.db = database;
  }

  getId(msg) { 
    return msg.chat.id; 
  }

  // TODO: implement database integration
  start() {

    // bot start chat
    this.bot.onText(botRegEx.start, msg => this.bot.sendMessage(this.getId(msg), messages.start));

    // bot help
    this.bot.onText(botRegEx.help, msg => this.bot.sendMessage(this.getId(msg), messages.help));

    // web link 
    this.bot.onText(botRegEx.link, msg => {
      const link = `http://www.localhost:5000/vue-app/` // TODO: implement personal link
      this.bot.sendMessage(this.getId(msg), `[Your personal page link](${link})`, { parse_mode: 'Markdown' });
    });

    // set new reminder
    this.bot.onText(botRegEx.remind, (msg, match) => {
      const dateValidation = validDate(match[2]);
      const timeValidation = validTime(match[3]);
      const message = remindMessage(dateValidation, timeValidation);
      this.bot.sendMessage(this.getId(msg), message());
    });

    // any other commands
    this.bot.onText(/(.+)/, (msg, match) => {
      const matchedInput = Object.keys(botRegEx).find(expression => botRegEx[expression].test(match[0]));
      if(!matchedInput) {
        return (match[0].includes('remind')) ?
          this.bot.sendMessage(this.getId(msg), messages.invalidRemind) :
          this.bot.sendMessage(this.getId(msg), messages.invalid);
      }
    })
  }
}

