import cn from "classnames";
import userInterveiwSlot from "./UserInterveiwSlot.module.css";

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
  return `Time: ${strTime} ${
    monthNames[dateObj.getMonth()]
  } ${dateObj.getDate()}, ${dateObj.getFullYear()}`;
};

export const UserInterveiwSlot = ({ slots, userDetail }) => {
  return (
    <>
      <h1 className={userInterveiwSlot.textCenter}>Your Interview Slots</h1>
      <div className={userInterveiwSlot.interviewSlots}>
        {slots.map((item) => {
          return (
            // <div className={`${profileStyles.profileCard}`}>
            <div
              key={item._id}
              className={cn({
                [userInterveiwSlot.greenInterviewSlot]: item.partner,
                [userInterveiwSlot.redInterviewSlot]: !item.partner,
              })}
            >
              <h3>@{userDetail.username}</h3>
              <p>{formatDateTime(item.slot)}</p>
              {/* <p>Partner: {item.partner}</p> */}
            </div>
          );
        })}
      </div>
    </>
  );
};
