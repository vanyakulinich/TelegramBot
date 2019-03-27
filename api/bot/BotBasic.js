import TelegramBot from "node-telegram-bot-api";
import { BOT_KEY } from "../../config/bot";

export default class BotBasic {
  constructor() {
    this.bot = new TelegramBot(BOT_KEY, { polling: true });
  }
  recieveMsg({ pattern, callback }) {
    this.bot.onText(pattern, (msg, match) => callback(msg, match));
  }

  respondToUser(userChatId, message, parse_mode) {
    this.bot.sendMessage(userChatId, message, { parse_mode });
  }
}
