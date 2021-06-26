import computedClassName from "classnames";
import { useAuth, useInterviewSlot } from "../../context";
import { formatDateTime } from "../../utils";
import userInterviewSlot from "./UserInterviewSlot.module.css";
import Image from "next/image";

import { deleteInterviewSlot } from "../../serviceCalls";

export const UserInterviewSlot = ({ userDetail }) => {
  const { interviewSlotState, interviewSlotDispatch } = useInterviewSlot();
  const { authState } = useAuth();

  return (
    <>
      <h1 className='textCenter'>Your Interview Slots</h1>
      <div className={userInterviewSlot.interviewSlots}>
        {interviewSlotState?.userInterViewSlots?.slots?.map((item) => {
          return (
            <div
              key={item._id}
              className={computedClassName({
                [userInterviewSlot.greenInterviewSlot]: item.partner,
                [userInterviewSlot.redInterviewSlot]: !item.partner,
              })}
            >
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
                <Image src='/images/delete.svg' width='30px' height='30px' />
              </button>
              <h3>@{userDetail?.username}</h3>
              <p>{formatDateTime(item.slot)}</p>
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
