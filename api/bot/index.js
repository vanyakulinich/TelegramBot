import Promise from 'bluebird';
import TelegramBot from 'node-telegram-bot-api';
import { BOT_KEY } from '../../config/bot';
Promise.config({
  cancellation: true
});
const bot = new TelegramBot(BOT_KEY, { polling: true});

export default class Bot {
  constructor() {
    this.bot = bot;
  }
  start() {
    this.bot.on('message', (msg) => {
      const { id } = msg.chat;
      this.bot.sendMessage(id, 'works');
    })
  }
}

