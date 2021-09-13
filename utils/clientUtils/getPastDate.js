export const getPastDate = () => {
  let dtToday = new Date();
  let month = dtToday.getMonth() + 1;
  let day = dtToday.getDate();
  let year = dtToday.getFullYear();
  let hours = dtToday.getHours();
  let minutes = dtToday.getMinutes();
  if (month < 10) month = "0" + month.toString();
  if (day < 10) day = "0" + day.toString();
  let maxDate = `${year}-${month}-${day}T${hours}:${minutes}`;
  return maxDate;
};
