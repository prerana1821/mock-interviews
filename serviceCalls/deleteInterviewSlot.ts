import { Dispatch } from "react";
import { UserState } from "../context/Auth/Auth.types";
import { InterviewSlotAction } from "../context/InterviewSlot/InterviewSlot.types";

type DeleteInterviewSlotParams = {
  slotId: string;
  authState: UserState;
  interviewSlotDispatch: Dispatch<InterviewSlotAction>;
};

export const deleteInterviewSlot = async ({
  slotId,
  authState,
  interviewSlotDispatch,
}: DeleteInterviewSlotParams): Promise<void> => {
  try {
    interviewSlotDispatch({
      type: "SET_STATUS",
      payload: {
        status: { loading: { actionType: "Deleting Interview Slot..." } },
      },
    });
    const response = await fetch(
      `${process.env.API_URL}api/interviewSlot/${authState.user._id}/${slotId}`,
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
        type: "DELETE_USER_INTERVIEW_SLOTS",
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
