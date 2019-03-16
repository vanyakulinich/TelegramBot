import Promise from "bluebird";
import TelegramBot from "node-telegram-bot-api";
import TokenGenerator from "uuid-token-generator";
import { BOT_KEY } from "../../config/bot";
import { messages, botRegEx } from "../../helpers/botHelpers";
import { validDate } from "../../utils/dateUtils";
import { validTime } from "../../utils/timeUtils";

Promise.config({
  cancellation: true
});

export default class Bot {
  constructor(database) {
    this.bot = new TelegramBot(BOT_KEY, { polling: true });
    this.tokgen = new TokenGenerator();
    this.db = database.DB;
  }

  start() {
    // bot start chat
    this.bot.onText(botRegEx.start, async msg => {
      const dbResponse = await this.db.startNewUser(msg.chat);
      const { first_name, last_name } = msg.from;
      const name = first_name || last_name;
      this.bot.sendMessage(
        msg.chat.id,
        dbResponse ? messages.start(name) : messages.errorMsg
      );
    });

    // bot help
    this.bot.onText(botRegEx.help, msg =>
      this.bot.sendMessage(msg.chat.id, messages.help)
    );

    // web link
    this.bot.onText(botRegEx.link, async msg => {
      const linkPart = await this._setWebAppConnection(msg.chat.id);
      if (!linkPart) {
        this.bot.sendMessage(msg.chat.id, messages.errorMsg);
        return;
      }
      // TODO: implement real url when deploying
      const link = `http://www.localhost:3000/app/${linkPart}/reminder_manager`;
      this.bot.sendMessage(msg.chat.id, `[${messages.link}](${link})`, {
        parse_mode: "Markdown"
      });
    });

    // set new reminder
    this.bot.onText(botRegEx.remind, async (msg, match) => {
      const dateValidation = validDate(match[2]);
      const timeValidation = validTime(match[3], match[2]);
      if (!dateValidation || !timeValidation) {
        this.bot.sendMessage(msg.chat.id, messages.invalidDatetime);
        return;
      }
      const dbResponse = await this.db.botDataHandler(
        msg.chat.id,
        match,
        "post"
      );
      this.bot.sendMessage(
        msg.chat.id,
        dbResponse ? messages.successReminder(match) : messages.errorMsg
      );
    });
    // list of all reminders
    this.bot.onText(botRegEx.list, async msg => {
      const list = await this.db.botAskListOfReminders(msg.chat.id);
      this.bot.sendMessage(msg.chat.id, messages.list(list || []));
    });

    // any other commands
    this.bot.onText(/(.+)/, (msg, match) => {
      const matchedInput = Object.keys(botRegEx).find(expression =>
        botRegEx[expression].test(match[0])
      );
      !matchedInput &&
        this.bot.sendMessage(
          msg.chat.id,
          match[0].includes("remind")
            ? messages.invalidRemind
            : messages.invalid
        );
    });
    this.db.botCB = this._cbToDbWatcher.bind(this);
  }

  _cbToDbWatcher({ id, text, date, time }) {
    this.bot.sendMessage(id, messages.activatedReminder({ text, date, time }));
  }

  async _setWebAppConnection(id) {
    const tokens = {
      publicToken: this.tokgen.generate(),
      privateToken: this.tokgen.generate()
    };
    const dbResponse = await this.db.setUpWebConnection({
      tokens,
      id
    });
    return dbResponse;
  }
}
