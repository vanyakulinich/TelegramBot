import { createISODate } from "./dateUtils";
import { createNewReminder as newReminder } from "./reminderUtils";

export function* watcherGenerator(bot) {
  while (true) {
    let { id, time } = yield;
    bot.nextReminder.timeoutID && clearTimeout(bot.nextReminder.timeoutID);
    bot.nextReminder = {
      id,
      time,
      timeoutID: setTimeout(() => {
        bot._activateClosestReminder(id, time);
      }, +time - Date.now())
    };
  }
}

export const createNewReminder = match => {
  const dateISO = createISODate(match[2], match[3]);
  return newReminder({
    text: match[1],
    date: match[2],
    time: match[3],
    dateISO
  });
};
