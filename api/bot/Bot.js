import Promise from "bluebird";
import BotLib from "./BotLib";

Promise.config({
  cancellation: true
});

export default class Bot extends BotLib {
  constructor(database) {
    super();
    this.db = database.DB;
    this.facilities = this._constructBotFacilites();
  }

  start() {
    for (let facility in this.facilities) {
      const { pattern, callback } = this.facilities[facility];
      const dataForMsgReciever = {
        pattern,
        callback: callback.bind(this)
      };
      this.recieveMsg(dataForMsgReciever);
    }
    this.db.botCB = this._callbackbToDBWatcher.bind(this);
  }
}
