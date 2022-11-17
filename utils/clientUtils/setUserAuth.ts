import cookies from "js-cookie";
import { Dispatch } from "react";
import {
  AuthAction,
  UserDetails,
  UserState,
} from "../../context/Auth/Auth.types";

export type SetUserAuthParams = {
  authDispatch: Dispatch<AuthAction>;
  user: UserDetails;
  token: string;
};

export const setUserAuth = ({ authDispatch, user, token }): void => {
  localStorage?.setItem("token", JSON.stringify({ token }));
  localStorage?.setItem(
    "user",
    JSON.stringify({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
    })
  );
  cookies.set("token", token, { expires: 1 });
  cookies.set("userId", user._id, { expires: 1 });
  authDispatch({ type: "LOGIN", payload: user });
  authDispatch({ type: "ADD_TOKEN", payload: { token } });
  authDispatch({
    type: "SET_STATUS",
    payload: {
      status: { success: `Hello ${user.fullName}` },
    },
  });
};
