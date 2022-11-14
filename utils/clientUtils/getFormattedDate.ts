export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const formatTime = (date: Date): string => {
  const dateObj = new Date(
    new Date(date).toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
    })
  );
  let hours = dateObj.getHours();
  let minutes = dateObj.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? 0 + minutes : minutes;
  const strTime = hours + ":" + minutes + " " + ampm;
  return `Time: ${strTime}`;
};

export const formatDate = (date: Date): string => {
  const dateObj = new Date(
    new Date(date).toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
    })
  );
  return `Date: ${
    monthNames[dateObj.getMonth()]
  } ${dateObj.getDate()}, ${dateObj.getFullYear()}`;
};
