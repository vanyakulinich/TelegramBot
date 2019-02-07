import { createMSDate } from "./dateUtils";
import {
  beautifyDateFromISOString,
  beautifyTimeFromISOString,
  combineDateAndTimeISOStrings
} from "./ISOStringsUtils";
export const createNewReminder = ({ text, date, time, dateISO }) => ({
  text,
  date,
  time,
  dateISO,
  dateMs: createMSDate(dateISO),
  expired: false
});

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
