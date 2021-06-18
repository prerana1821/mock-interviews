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

// console.log("9898", context.req.cookies);
// const authToken = context.req.cookies.token;

// let userDetail = await UserCredential.findById(context.params.userId).lean();
// userDetail = JSON.parse(JSON.stringify(userDetail));

// let response = await fetch(
//   `http://localhost:3000/api/userDetail/${context.params.userId}`,
//   {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: authToken,
//     },
//   }
// );

// const data = await response.json();
// console.log(data);
// if(data.success){

// }

//  console.log("working");
//  console.log({ userId });
//  const result = await InterviewSlot.findOneAndUpdate(
//    { userId },
//    { $push: { slots: { slot: dateAndTime } } },
//    { safe: true, upsert: true, new: true },
//    function (err, model) {
//      console.log(err);
//    }
//  );
