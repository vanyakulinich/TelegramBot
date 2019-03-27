import { createMSDate, validDate } from "./dateUtils";
import { validTime } from "./timeUtils";
import {
  beautifyDateFromISOString,
  beautifyTimeFromISOString,
  combineDateAndTimeISOStrings
} from "./ISOStringsUtils";

export const reminderInputDateValidation = match => {
  const dateValidated = validDate(match[2]);
  const timeValidated = validTime(match[3], match[2]);
  return { dateValidated, timeValidated };
};

export const createNewReminder = ({ text, date, time, dateISO }) => {
  const dateMs = createMSDate(dateISO);
  return {
    text,
    date,
    time,
    dateISO,
    dateMs,
    id: dateMs,
    expired: false
  };
};

export const updateReminder = ({ text, date, time, id }) => {
  const dateISO = combineDateAndTimeISOStrings(date, time);
  const dateMs = createMSDate(dateISO);
  return {
    text,
    date: beautifyDateFromISOString(date),
    time: beautifyTimeFromISOString(time),
    id,
    dateISO,
    dateMs,
    expired: false
  };
};

export const createNewReminderFromInputs = inputValues => {
  const { text, date, time } = inputValues;
  const dateISO = combineDateAndTimeISOStrings(date, time);
  const newReminderData = {
    text,
    date: beautifyDateFromISOString(date),
    time: beautifyTimeFromISOString(time),
    dateISO
  };

  return createNewReminder(newReminderData);
};

export const checkIfReminderTimeIsAvaliable = (newReminder, reminders) => {
  if (!reminders || !Object.keys(reminders)) return false;
  const result = Object.keys(reminders).find(el => {
    const item = reminders[el];
    const { date, time, dateMs } = newReminder;
    return item.dateMs === dateMs || (item.date === date && item.time === time);
  });
  return result;
};
