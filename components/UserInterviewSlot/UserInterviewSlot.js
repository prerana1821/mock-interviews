import cn from "classnames";
import { useInterviewSlot } from "../../context";
import { formatDateTime } from "../../utils/dateFormatter";
import userInterviewSlot from "./UserInterviewSlot.module.css";

export const UserInterviewSlot = ({ userDetail }) => {
  const { interviewSlotState } = useInterviewSlot();

  console.log(interviewSlotState.userInterViewSlots.slots);

  return (
    <>
      <h1 className='textCenter'>Your Interview Slots</h1>
      <div className={userInterviewSlot.interviewSlots}>
        {interviewSlotState?.userInterViewSlots?.slots?.map((item) => {
          return (
            <div
              key={item._id}
              className={cn({
                [userInterviewSlot.greenInterviewSlot]: item.partner,
                [userInterviewSlot.redInterviewSlot]: !item.partner,
              })}
            >
              <h3>@{userDetail?.username}</h3>
              <p>{formatDateTime(item.slot)}</p>
              {item.partner && (
                <div>
                  <h3>Partner:</h3>
                  <p>@{item.partner.username}</p>
                  <p>{item.partner.fullName}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};
