import { UserCredential } from "firebase/auth";
import { Dispatch } from "react";
import { Status } from "../../types";
import { InterviewSlotAction } from "../InterviewSlot/InterviewSlot.types";

export type AuthContextT = {
  authState: UserState;
  authDispatch: Dispatch<AuthAction>;
  logoutUser: (
    interviewSlotDispatch: Dispatch<InterviewSlotAction>
  ) => Promise<void>;
  login: () => Promise<UserCredential>;
};

export type UserDetails = {
  email: string;
  fullName: string;
  uid?: string;
  username: string;
  portfolio: string;
  interviewDone: number;
  _id: string;
};

export type UserState = {
  token: string;
  user: UserDetails;
  status: Status;
};

export type AuthAction = {
  type:
    | "LOGIN"
    | "LOAD_USER_DETAILS"
    | "UPDATE_USER"
    | "ADD_TOKEN"
    | "SET_STATUS"
    | "LOGOUT";
  payload?: any;
};
