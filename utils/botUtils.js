import { createUTCDate, createMSDate } from "./timeUtils";

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

export const newReminderFactory = match => {
  const dateUTC = createUTCDate(match[2], match[3]);
  const dateMs = createMSDate(dateUTC);
  return {
    text: match[1],
    date: match[2],
    time: match[3],
    dateUTC,
    dateMs,
    expired: false
  };
};
