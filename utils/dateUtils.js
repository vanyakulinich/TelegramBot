import { messages } from "../helpers/botHelpers";

const months = {
  start: 1,
  febr: 2,
  end: 12,
  monthsWith30Days: [4, 6, 9, 11]
};
const daysInMonth = {
  "31": 31,
  "30": 30,
  "28": 28,
  "29": 29
};

export const validDate = complexDate => {
  const [dayFromDate, monthFromDate, yearFromDate] = complexDate.split(".");
  const year = validYear(yearFromDate);
  if (!year) return messages.pastYear;
  const month = validMonth(monthFromDate);
  const days = validDays(dayFromDate, month, year);
  if (days === "noleap") return messages.noleapYear;
  const currentDate = new Date();
  const notPastDay = days >= currentDate.getDate();
  const notPastMonth = month >= currentDate.getMonth() + 1;
  return (
    year && month && notPastMonth && days && (notPastMonth ? true : notPastDay)
  );
};

export const validYear = year =>
  +year >= new Date().getFullYear() ? +year : false;
export const validMonth = month =>
  +month >= months.start && +month <= months.end ? +month : false;
export const validDays = (inputDay, month, year) => {
  if (!month) return false;
  const days = checkDaysInMonth(month, year);
  return month === months.febr &&
    +inputDay === daysInMonth["29"] &&
    !isLeapYear(year)
    ? "noleap"
    : +inputDay > 0 && +inputDay <= days
    ? +inputDay
    : false;
};

export const checkDaysInMonth = (month, year) => {
  if (isLeapYear(year) && month === months.febr) return daysInMonth["29"];
  if (month === months.febr) return daysInMonth["28"];
  if (months.monthsWith30Days.includes(month)) return daysInMonth["30"];
  return daysInMonth["31"];
};

export const isLeapYear = year => year % 4 === 0;

export const createMSDate = date => Date.parse(date);

export const createISODate = (date, time) => {
  const dateVals = date.split(".").reverse();
  dateVals[1] -= 1;
  const timeVals = time.split(":");
  return new Date(...dateVals, ...timeVals);
};

export const isToday = someDate => {
  const date = typeof someDate === "number" ? new Date(someDate) : someDate;
  const today = new Date();
  return (
    date.getDate() == today.getDate() &&
    date.getMonth() == today.getMonth() &&
    date.getFullYear() == today.getFullYear()
  );
};
