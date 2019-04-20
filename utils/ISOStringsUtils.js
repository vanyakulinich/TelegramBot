import { DateTime } from "luxon";
export const combineDateAndTimeISOStrings = (date, time) => {
  const parsedDate = date.split("T")[0];
  const parsedTime = time.split("T")[1];
  return new Date(`${parsedDate}T${parsedTime}`);
};

export const createTodayISODate = () => new Date().toISOString();

export const createTodayISODateWithOffset = offset =>
  new Date(Date.now() + offset).toISOString();

export const getCurrentTimeZone = () =>
  Intl.DateTimeFormat().resolvedOptions().timeZone;

export const beautifyTimeFromISOString = time => {
  const date = new Date(time);
  const hours = date.getHours();
  const mins = date.getMinutes();
  return `${checkTimeValue(hours)}:${checkTimeValue(mins)}`;
};

export const beautifyDateFromISOString = date => {
  // const parsedDate = new Date(date).toLocaleDateString().split("/");
  // const month = checkTimeValue(parsedDate[0]);
  // const days = checkTimeValue(parsedDate[1]);
  return DateTime.fromISO(date).toFormat("dd.LL.yyyy");
};

export const checkTimeValue = (val, limit = 10) =>
  `${val < limit ? `0${val}` : val}`;
