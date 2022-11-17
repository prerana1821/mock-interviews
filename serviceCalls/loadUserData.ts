import { Dispatch } from "react";
import { AuthAction } from "../context/Auth/Auth.types";

type LoadUserDataParams = {
  token: string;
  userId: string;
  authDispatch: Dispatch<AuthAction>;
};

export const loadUserData = async ({
  token,
  userId,
  authDispatch,
}: LoadUserDataParams): Promise<void> => {
  if (token && userId !== null) {
    try {
      authDispatch({
        type: "SET_STATUS",
        payload: {
          status: { loading: { actionType: "Loading user profile..." } },
        },
      });
      const response = await fetch(`/api/userDetail/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const data = await response.json();
      if (data.success) {
        authDispatch({
          type: "LOAD_USER_DETAILS",
          payload: { userDetails: data.data, token },
        });
      }
    } catch (error) {
      console.log({ error });
      authDispatch({
        type: "SET_STATUS",
        payload: { status: { error: "Couldn't load user profile..." } },
      });
    }
  }
};
