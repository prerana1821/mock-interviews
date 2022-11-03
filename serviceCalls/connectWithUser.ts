import { Dispatch, SetStateAction } from "react";
import { UserState } from "../context/Auth.types";
import { InterviewSlotAction } from "../context/Interview.types";

type ConnectWithUserParams = {
  interviewId: string;
  authState: UserState;
  interviewSlotDispatch: Dispatch<InterviewSlotAction>;
  setShowLoginAlert: Dispatch<SetStateAction<boolean>>;
};

export const connectWithUser = async ({
  interviewId,
  authState,
  interviewSlotDispatch,
  setShowLoginAlert,
}: ConnectWithUserParams): Promise<void> => {
  if (authState.token) {
    try {
      interviewSlotDispatch({
        type: "SET_STATUS",
        payload: {
          status: {
            loading: { actionType: "Scheduling the interview slot...!" },
          },
        },
      });
      const response = await fetch(
        `${process.env.API_URL}api/interviewSlot/${authState.user._id}/${interviewId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: authState.token,
          },
          body: JSON.stringify({ partner: authState.user._id }),
        }
      );
      const data = await response.json();
      if (data.success) {
        interviewSlotDispatch({
          type: "UPDATE_INTERVIEW_SLOTS",
          payload: { interviewSlot: data.data },
        });
      }
    } catch (error) {
      console.log({ error });
      interviewSlotDispatch({
        type: "SET_STATUS",
        payload: { status: { error: "Couldn't connect! Try again later" } },
      });
    }
  } else {
    setShowLoginAlert(true);
  }
};
