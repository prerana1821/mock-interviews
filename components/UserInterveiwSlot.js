import cn from "classnames";
import { formatDateTime } from "../utils/dateFormatter";
import userInterveiwSlot from "./UserInterveiwSlot.module.css";

export const UserInterveiwSlot = ({ slots, userDetail }) => {
  return (
    <>
      <h1 className='textCenter'>Your Interview Slots</h1>
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
