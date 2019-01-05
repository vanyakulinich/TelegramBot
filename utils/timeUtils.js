export const validTime = (inputTime) => {
  const times = inputTime.split(':');
  const hours = validHours(times[0]);
  const minutes = validMinutes(times[1]); 
  return (hours && minutes);
}; 

export const validHours = (hours) => (+hours >= 0 && +hours <= 24);

export const validMinutes = (mins) => (+mins >= 0 && +mins <= 59);

export const createUTCDate = (date, time) => {
  const dateVals = date.split('.').reverse();
  dateVals[1]-=1;
  const timeVals = time.split(':');
  return new Date(...dateVals, ...timeVals);
};

export const createMSDate = (date) => Date.parse(date);