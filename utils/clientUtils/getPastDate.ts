export const getPastDate = (): string => {
  const dtToday = new Date();
  let month = dtToday.getMonth() + 1;
  let day = dtToday.getDate();
  const year = dtToday.getFullYear();
  const hours = dtToday.getHours();
  const minutes = dtToday.getMinutes();
  if (month < 10) month = +"0" + +month.toString();
  if (day < 10) day = +"0" + +day.toString();
  const maxDate = `${year}-${month}-${day}T${hours}:${minutes}`;
  return maxDate;
};
