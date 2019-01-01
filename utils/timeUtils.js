export const validTime = (inputTime) => {
  const times = inputTime.split(':');
  const hours = validHours(times[0]);
  const minutes = validMinutes(times[1]); 
  return (hours && minutes);
}; 

export const validHours = (hours) => (+hours >= 0 && +hours <= 24);

export const validMinutes = (mins) => (+mins >= 0 && +mins <= 59);