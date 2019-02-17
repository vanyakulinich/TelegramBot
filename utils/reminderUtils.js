import { createMSDate } from "./dateUtils";
import {
  beautifyDateFromISOString,
  beautifyTimeFromISOString,
  combineDateAndTimeISOStrings
} from "./ISOStringsUtils";
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
