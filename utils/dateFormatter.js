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

export const formatDateTime = (date) => {
  const dateObj = new Date(date);
  let hours = dateObj.getHours();
  let minutes = dateObj.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  const strTime = hours + ":" + minutes + " " + ampm;
  return `Time: ${strTime}, ${
    monthNames[dateObj.getMonth()]
  } ${dateObj.getDate()}, ${dateObj.getFullYear()}`;
};

// console.log(userInterviewDetails.slots);
// console.log({ params });
// const authToken = localStorage.getItem("token");
// // console.log({ context });

// let response = await fetch(`/api/userDetail/${params.userId}`, {
//   method: "GET",
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: authToken,
//   },
// });
// const data = await response.json();
// console.log({ data });
// return { props: { userDetail: data.userDetail } };
// // return { props: { userDetail: {} } };
