import Promise from "bluebird";
import BotLib from "./BotLib";

Promise.config({
  cancellation: true
});

export default class ReminderBot extends BotLib {
  constructor(database) {
    super(database);
    this.facilities = this._constructBotFacilites();
  }

  start() {
    for (let facility in this.facilities) {
      const { pattern, callback } = this.facilities[facility];
      const dataForMsgReciever = {
        pattern,
        callback: callback.bind(this)
      };
      this.registerMsgListener(dataForMsgReciever);
    }

    this.db.registerCallback({ botCallback: this._botCallback.bind(this) });
  }
}
