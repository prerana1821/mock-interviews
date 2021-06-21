import cn from "classnames";
import { useAuth, useInterviewSlot } from "../../context";
import { formatDateTime } from "../../utils";
import userInterviewSlot from "./UserInterviewSlot.module.css";
import Image from "next/image";
import { API_URL } from "../../env/env";

export const UserInterviewSlot = ({ userDetail }) => {
  const { interviewSlotState, interviewSlotDispatch } = useInterviewSlot();
  const { authState } = useAuth();

  const deleteInterviewSlot = async (slotId) => {
    try {
      interviewSlotDispatch({
        type: "SET_STATUS",
        payload: {
          status: { loading: { actionType: "Deleting Interview Slot..." } },
        },
      });
      const response = await fetch(
        `${API_URL}api/interviewSlot/${authState.user._id}/${slotId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: authState.token,
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        interviewSlotDispatch({
          type: "DELETE_USER_INTERVIEW_SLOT",
          payload: { interviewSlotId: data.data },
        });
      }
    } catch (error) {
      console.log({ error });
      interviewSlotDispatch({
        type: "SET_STATUS",
        payload: {
          status: {
            error: "Couldn't deleting interview slot! Try again later",
          },
        },
      });
    }
  };

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
              <button
                className='btnIcon'
                onClick={() => deleteInterviewSlot(item._id)}
              >
                <Image src='/images/delete.svg' width='30px' height='30px' />
              </button>
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
