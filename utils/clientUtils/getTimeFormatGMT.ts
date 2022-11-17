// convert date to YYYY-MM-DDTHH:MM:SS-HH:MM
export const getTimeFormatGMT = (date: Date) => {
  const dateType = new Date(date);
  return `${dateType.getFullYear()}-${
    dateType.getMonth() + 1
  }-${dateType.getDate()}T${dateType.getHours()}:${dateType.getMinutes()}:${dateType.getSeconds()}+05:30`;
};
