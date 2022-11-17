import { Dispatch, FormEvent, SetStateAction } from "react";
import { UserState } from "../context/Auth/Auth.types";
import { InterviewSlotAction } from "../context/InterviewSlot/InterviewSlot.types";

type AddInterviewSlotParams = {
  event: FormEvent<HTMLFormElement>;
  authState: UserState;
  dateAndTime: Date;
  setDateAndTime: Dispatch<SetStateAction<Date>>;
  interviewSlotDispatch: Dispatch<InterviewSlotAction>;
};

export const addInterviewSlot = async ({
  event,
  authState,
  dateAndTime,
  setDateAndTime,
  interviewSlotDispatch,
}: AddInterviewSlotParams): Promise<void> => {
  event.preventDefault();
  try {
    interviewSlotDispatch({
      type: "SET_STATUS",
      payload: {
        status: { loading: { actionType: "Adding interview slot..." } },
      },
    });
    const response = await fetch(`/api/interviewSlot/${authState.user._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authState.token,
      },
      body: JSON.stringify({
        dateAndTime,
      }),
    });
    const data = await response.json();
    if (data.success) {
      interviewSlotDispatch({
        type: "ADD_USER_INTERVIEW_SLOTS",
        payload: { slot: data.data.slot },
      });
      setDateAndTime(null);
    }
  } catch (error) {
    console.log({ error });
    interviewSlotDispatch({
      type: "SET_STATUS",
      payload: {
        status: { error: "Couldn't add interview slot! Try again later" },
      },
    });
  }
};
