export const validTime = (inputTime, inputDate) => {
  const times = inputTime.split(":");
  const hours = validHours(times[0]);
  const minutes = validMinutes(times[1]);
  const date = inputDate.split(".");
  const notPastTime =
    hours &&
    minutes &&
    validCurrentTime({
      hours: times[0],
      mins: times[1],
      day: date[0],
      month: date[1],
      year: date[2]
    });
  return hours && minutes && notPastTime;
};

export const validHours = hours => +hours >= 0 && +hours <= 24;

export const validMinutes = mins => +mins >= 0 && +mins <= 59;

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

export const createISODate = (date, time) => {
  const dateVals = date.split(".").reverse();
  dateVals[1] -= 1;
  const timeVals = time.split(":");
  return new Date(...dateVals, ...timeVals);
};

export const createMSDate = date => Date.parse(date);
