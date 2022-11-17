import { Dispatch } from "react";
import {
  InterviewSlotAction,
  InterviewSlotState,
} from "../context/InterviewSlot/InterviewSlot.types";

type LoadInterviewSlotsDataParams = {
  token: string;
  interviewSlotState: InterviewSlotState;
  interviewSlotDispatch: Dispatch<InterviewSlotAction>;
};

export const loadInterviewSlotsData = async ({
  token,
  interviewSlotState,
  interviewSlotDispatch,
}: LoadInterviewSlotsDataParams): Promise<void> => {
  if (token && interviewSlotState.interviewSlots.length === 0) {
    try {
      interviewSlotDispatch({
        type: "SET_STATUS",
        payload: {
          status: {
            loading: { actionType: "loading interview slots..." },
          },
        },
      });
      const response = await fetch("/api/interviewSlot", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.success) {
        interviewSlotDispatch({
          type: "LOAD_INTERVIEW_SLOTS",
          payload: { interviewSlots: data.data },
        });
      }
    } catch (error) {
      console.log({ error });
      interviewSlotDispatch({
        type: "SET_STATUS",
        payload: {
          status: {
            error: "Couldn't load interview slots! Try again later",
          },
        },
      });
    }
  }
};
