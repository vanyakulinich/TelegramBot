import { messages } from '../helpers/botHelpers';

export const validDate = (complexDate) => {
  const dates = complexDate.split('.');
  const year = validYear(dates[2]);
  if (!year) return messages.pastYear;
  const month = validMonth(dates[1]);
  const days = validDays(dates[0], month, year);
  if (days === 'noleap') return messages.noleapYear;
  const currentDate = new Date();
  const notPastDay = (days >= currentDate.getDate());
  const notPastMonth = (month >= currentDate.getMonth() + 1);
  return (
    year && 
    month && 
    notPastMonth && 
    days && 
    (notPastMonth ? true : notPastDay)
  );
};

export const validYear = (year) => (+year >= new Date().getFullYear() ? +year : false);
export const validMonth = (month) => (+month >= 1 && +month <= 12) ? +month : false;
export const validDays = (inputDay, month, year) => {
  if (!month) return false;
  const days = checkDaysInMonth(month, year);
  return (month === 2 && +inputDay === 29 && !isLeapYear(year)) ? 
    'noleap' :
    (+inputDay > 0 && +inputDay <= days) ? +inputDay : false;
};


export const checkDaysInMonth = (month, year) => {
  if (isLeapYear(year) && month === 2) return 29;
  if (month === 2) return 28;
  if (month == 4 || month === 6 || month === 9 || month === 11) return 30;
  return 31;
};

export const isLeapYear = (year) => (year % 4 === 0); 
