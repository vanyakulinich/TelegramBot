import Promise from "bluebird";
import TelegramBot from "node-telegram-bot-api";
import TokenGenerator from "uuid-token-generator";
import { BOT_KEY } from "../../config/bot";
import {
  messages,
  botRegEx,
  manageValidations
} from "../../helpers/botHelpers";
import { validDate } from "../../utils/dateUtils";
import { validTime } from "../../utils/timeUtils";
import { watcherGenerator, newReminderFactory } from "../../utils/botUtils";

Promise.config({
  cancellation: true
});

export default class Bot {
  constructor(database) {
    this.bot = new TelegramBot(BOT_KEY, { polling: true });
    this.tokgen = new TokenGenerator();
    this.db = database.getDB();
    this.nextReminder = {
      time: null,
      userId: null,
      timeoutID: null
    };
    this.watcher = watcherGenerator(this);
  }

  start() {
    // bot start chat
    this.bot.onText(botRegEx.start, async msg => {
      const dbResponse = await this.db.startNewUser(msg.chat);
      this.bot.sendMessage(
        msg.chat.id,
        dbResponse ? messages.start : messages.errorMsg
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
      const isValid = manageValidations(dateValidation, timeValidation);
      if (!isValid.valid) {
        this.bot.sendMessage(msg.chat.id, isValid.msg);
        return;
      }
      const newReminder = newReminderFactory(match);
      const dbResponse = await this.db.setNewReminder(msg.chat.id, newReminder);
      this._watchReminders(msg.chat.id, newReminder.dateMs);
      this.bot.sendMessage(
        msg.chat.id,
        dbResponse ? messages.successReminder(match) : messages.errorMsg
      );
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

    this.watcher.next();
  }

  _watchReminders(newReminderId, newReminderTime) {
    return !this.nextReminder.time && !this.nextReminder.userId
      ? this.watcher.next({
          id: newReminderId,
          time: newReminderTime
        })
      : this._checkForClosestReminder(newReminderId, newReminderTime);
  }

  async _activateClosestReminder(id, activateTime) {
    const reminderData = await this.db.activateReminder(id, activateTime);
    if (!reminderData) this.db._activateClosestReminder(id, activateTime);
    const { text, date, time } = reminderData;
    this.bot.sendMessage(id, messages.activatedReminder({ text, date, time }));
    this._findNextClosestReminder();
  }

  async _findNextClosestReminder() {
    const closestReminder = await this.db.findClosestReminderInUsers();
    if (!closestReminder.time || !closestReminder.id) {
      Object.keys(this.nextReminder).forEach(item => {
        this.nextReminder[item] = null;
      });
      return;
    }
    this.watcher.next({ ...closestReminder });
  }

  _checkForClosestReminder(newId, newTime) {
    if (newTime < this.nextReminder.time) {
      this.watcher.next({ id: newId, time: newTime });
    }
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
