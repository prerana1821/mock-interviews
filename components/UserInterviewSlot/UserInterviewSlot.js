import cn from "classnames";
import { formatDateTime } from "../../utils/dateFormatter";
import userInterviewSlot from "./UserInterviewSlot.module.css";

export const UserInterviewSlot = ({ slots, userDetail }) => {
  console.log("Hello");
  return (
    <>
      <h1 className='textCenter'>Your Interview Slots</h1>
      <div className={userInterviewSlot.interviewSlots}>
        {slots.map((item) => {
          return (
            <div
              key={item._id}
              className={cn({
                [userInterviewSlot.greenInterviewSlot]: item.partner,
                [userInterviewSlot.redInterviewSlot]: !item.partner,
              })}
            >
              <h3>@{userDetail.username}</h3>
              <p>{formatDateTime(item.slot)}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};
