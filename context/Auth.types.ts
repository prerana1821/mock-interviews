import { UserCredential } from "firebase/auth";
import { Dispatch } from "react";
import { InterviewSlotAction } from "./Interview.types";

export type AuthContextT = {
  authState: UserState;
  authDispatch: Dispatch<AuthAction>;
  logoutUser: (
    interviewSlotDispatch: Dispatch<InterviewSlotAction>
  ) => Promise<void>;
  login: () => Promise<UserCredential>;
};

export type UserDetails = {
  fullName: string;
  username: string;
  _id: string;
};

export type UserState = {
  token: string;
  user: UserDetails;
  status: Object;
};

export type AuthAction = {
  type:
    | "LOGIN_USER"
    | "LOAD_USER_DETAILS"
    | "UPDATE_USER"
    | "ADD_TOKEN"
    | "SET_STATUS"
    | "LOGOUT";
  payload?: any;
};
