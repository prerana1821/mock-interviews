import { Dispatch } from "react";
import { Status } from "../types";
import { UserDetails } from "./Auth.types";

export type InterviewSlotContextT = {
  interviewSlotState: InterviewSlotState;
  interviewSlotDispatch: Dispatch<InterviewSlotAction>;
};

export type InterviewSlotState = {
  interviewSlots: InterviewsSlots[];
  userInterViewSlots: { slots: Slots[] };
  status: Status;
};

export type InterviewSlotAction = {
  type:
    | "LOAD_INTERVIEW_SLOTS"
    | "UPDATE_INTERVIEW_SLOTS"
    | "LOAD_USER_INTERVIEW_SLOT"
    | "ADD_USER_INTERVIEW_SLOT"
    | "DELETE_USER_INTERVIEW_SLOT"
    | "REMOVE_USER_INTERVIEW_SLOTS"
    | "SET_STATUS";
  payload: any;
};

export type Slots = {
  partner?: UserDetails;
  slot: Date;
  _id: string;
};

export type InterviewsSlots = {
  _id: string;
  _v: number;
  slots: Slots[];
  userId: UserDetails;
};
