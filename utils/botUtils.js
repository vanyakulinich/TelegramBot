import { createISODate, createMSDate } from "./timeUtils";

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
  const dateMs = createMSDate(dateISO);
  return {
    text: match[1],
    date: match[2],
    time: match[3],
    dateISO,
    dateMs,
    expired: false
  };
};
