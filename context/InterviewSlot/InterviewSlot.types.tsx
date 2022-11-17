import { Dispatch } from "react";
import { Status } from "../../types";
import { UserDetails } from "../Auth/Auth.types";

export type InterviewSlotContextT = {
  interviewSlotState: InterviewSlotState;
  interviewSlotDispatch: Dispatch<InterviewSlotAction>;
};

export type InterviewSlotState = {
  interviewSlots: InterviewsSlots[];
  userInterViewSlots: { slots: Slots[] };
  status: Status;
};

type InterviewActions =
  | "LOAD"
  | "UPDATE"
  | "LOAD_USER"
  | "ADD_USER"
  | "DELETE_USER"
  | "REMOVE_USER";

export type InterviewSlotAction = {
  type: `${InterviewActions}_INTERVIEW_SLOTS` | "SET_STATUS";
  payload: any;
};

export type Slots = {
  partner?: UserDetails;
  meetLink?: string;
  slot: Date;
  _id: string;
};

export type InterviewsSlots = {
  _id: string;
  _v: number;
  slots: Slots[];
  userId: UserDetails;
};
