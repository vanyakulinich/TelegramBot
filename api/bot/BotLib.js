import TokenGenerator from "uuid-token-generator";
import BasicBot from "./BasicBot";

import { createWebAppUrl } from "./config";
import { messages, botRegEx } from "../../helpers/botHelpers";
import { reminderInputDateValidation } from "../../utils/reminderUtils";

export default class BotLib extends BasicBot {
  constructor(DB) {
    super();
    this.db = DB.database;
    this.tokgen = new TokenGenerator();
  }

  async startChat(msg) {
    const dbResponse = await this.db.startNewUser(msg.chat);
    const { first_name, last_name } = msg.from;
    const name = first_name || last_name;
    const responseMsg = dbResponse ? messages.start(name) : messages.errorMsg;
    this.respondToUser(msg.chat.id, responseMsg);
  }

  helpUser(msg) {
    this.respondToUser(msg.chat.id, messages.help);
  }

  async giveLinkToWebApp(msg) {
    const linkPart = await this._setWebAppConnection(msg.chat.id);
    if (!linkPart) {
      this.respondToUser(msg.chat.id, messages.errorMsg);
      return;
    }
    const link = createWebAppUrl(linkPart);
    const linkName = `[${messages.link}](${link})`;
    this.respondToUser(msg.chat.id, linkName, "Markdown");
  }

  async createNewReminder(msg, match) {
    const { dateValidated, timeValidated } = reminderInputDateValidation(match);
    if (!dateValidated || !timeValidated) {
      this.respond(msg.chat.id, messages.invalidDatetime);
      return;
    }
    const dbResponse = await this.db.botDataHandler(msg.chat.id, match, "post");
    const responseMsg = (() => {
      if (dbResponse) {
        return dbResponse === "exist"
          ? messages.reminderExist
          : messages.successReminder(match);
      }
      return messages.errorMsg;
    })();
    this.respondToUser(msg.chat.id, responseMsg);
  }

  async userRemindersLists(msg, match) {
    const isTodayList = match.includes("today") || match.includes("Today");
    const list = await this.db.botAskListOfReminders(msg.chat.id, isTodayList);
    const listIsString = typeof list === "string";
    const responseMsg = listIsString
      ? messages.lists(list, isTodayList)
      : messages.errorMsg;
    this.respondToUser(msg.chat.id, responseMsg);
  }

  unknownMsgHandler(msg, match) {
    const [userInput] = match;
    const matchedInput = Object.keys(botRegEx).find(expression =>
      botRegEx[expression].test(userInput)
    );
    if (matchedInput === "other") {
      const isRemindInMsg = match[0].includes("remind");
      const responseMsg = messages[isRemindInMsg ? "invalidRemind" : "invalid"];
      this.respondToUser(msg.chat.id, responseMsg);
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
  _botCallback({ id, text, date, time }) {
    this.bot.sendMessage(id, messages.activatedReminder({ text, date, time }));
  }

  _createBotFacility(name, callback) {
    return { pattern: botRegEx[name], callback };
  }

  _constructBotFacilites() {
    return {
      start: this._createBotFacility("start", this.startChat),
      help: this._createBotFacility("help", this.helpUser),
      link: this._createBotFacility("link", this.giveLinkToWebApp),
      lists: this._createBotFacility("lists", this.userRemindersLists),
      remind: this._createBotFacility("remind", this.createNewReminder),
      other: this._createBotFacility("other", this.unknownMsgHandler)
    };
  }
}
