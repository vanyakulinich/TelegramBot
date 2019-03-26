const FIRST_HOUR_OR_MIN = 0;
const LAST_HOUR = 24;
const LAST_MIN = 59;

export const validTime = (inputTime, inputDate) => {
  const [hoursFromDate, minsFromDate] = inputTime.split(":");
  const hours = validHours(hoursFromDate);
  const minutes = validMinutes(minsFromDate);
  const [day, month, year] = inputDate.split(".");
  const notPastTime =
    hours &&
    minutes &&
    validCurrentTime({
      hours,
      minutes,
      day,
      month,
      year
    });
  return hours && minutes && notPastTime;
};

export const validHours = hours =>
  +hours >= FIRST_HOUR_OR_MIN && +hours <= LAST_HOUR;

export const validMinutes = mins =>
  +mins >= FIRST_HOUR_OR_MIN && +mins <= LAST_MIN;

export const validCurrentTime = ({ hours, mins, day, month }) => {
  const today = new Date();
  if (
    +day === today.getDay() &&
    +month === today.getMonth() &&
    +year === today.getFullYear()
  ) {
    return +hours === today.getHours()
      ? mins > today.getMinutes()
      : hours > today.getHours();
  }
  return true;
};
