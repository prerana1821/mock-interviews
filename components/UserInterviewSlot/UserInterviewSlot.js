import computedClassName from "classnames";
import { useAuth, useInterviewSlot } from "../../context";
import { formatTime } from "../../utils";
import userInterviewSlot from "./UserInterviewSlot.module.css";
import { deleteInterviewSlot } from "../../serviceCalls";
import Image from "next/image";
import { formatDate } from "../../utils/clientUtils/getFormattedDate";

const pastTime = (item, date) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  return new Date(date) < new Date(yesterday) && !item.slot;
};

export const UserInterviewSlot = ({ userDetail }) => {
  const { interviewSlotState, interviewSlotDispatch } = useInterviewSlot();
  const { authState } = useAuth();

  return (
    <>
      <h1 className='textCenter'>Your Interview Slots</h1>
      <div className={userInterviewSlot.interviewSlots}>
        {interviewSlotState?.userInterViewSlots?.slots
          ?.sort((a, b) => new Date(a.slot) - new Date(b.slot))
          .map((item) => {
            return (
              <div
                key={item._id}
                className={computedClassName({
                  [userInterviewSlot.greenInterviewSlot]: item.partner,
                  [userInterviewSlot.redInterviewSlot]: !item.partner,
                  // [userInterviewSlot.greyInterviewSlot]:
                  //   item.slot === null || pastTime(item, formatDate(item.slot)),
                })}
              >
                {/* {!pastTime(item, formatDate(item.slot)) && ( */}
                <button
                  className='btnIcon'
                  onClick={() =>
                    deleteInterviewSlot(
                      item._id,
                      authState,
                      interviewSlotDispatch
                    )
                  }
                >
                  <Image src='/images/delete.png' width='30px' height='30px' />
                </button>
                <h3>@{userDetail?.username}</h3>
                <p>{formatTime(item.slot)}</p>
                <p>{formatDate(item.slot)}</p>
                {item.partner && (
                  <div>
                    <h3>Partner:</h3>
                    <p>Discord Username: @{item.partner.username}</p>
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
