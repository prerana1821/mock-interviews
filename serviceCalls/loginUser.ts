import { NextRouter } from "next/router";
import { Dispatch } from "react";
import { AuthAction, UserDetails } from "../context/Auth/Auth.types";
import { SetUserAuthParams } from "../utils/clientUtils/setUserAuth";

type LoginUserParams = {
  authDispatch: Dispatch<AuthAction>;
  setUserAuth: ({ authDispatch, user, token }: SetUserAuthParams) => void;
  router: NextRouter;
} & Pick<UserDetails, "email" | "fullName" | "uid">;

export const loginUser = async ({
  email,
  fullName,
  uid,
  authDispatch,
  setUserAuth,
  router,
}: LoginUserParams): Promise<void> => {
  try {
    authDispatch({
      type: "SET_STATUS",
      payload: { status: { loading: { actionType: "Logining user..." } } },
    });
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        fullName,
        uid,
      }),
    });
    const data = await response.json();
    console.log("LOGINN", { data });
    if (data.success) {
      setUserAuth({
        authDispatch,
        user: data.data.user,
        token: data.data.token,
      });
      router.push(`/profile/${data.data.user._id}`);
    } else {
      authDispatch({
        type: "SET_STATUS",
        payload: { status: { error: data.errorMessage } },
      });
    }
  } catch (error) {
    console.log({ error });
    authDispatch({
      type: "SET_STATUS",
      payload: { status: { error: "Couldn't login user..." } },
    });
  }
};
