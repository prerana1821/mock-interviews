import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useReducer } from "react";
import { authReducer } from "../reducer";
import cookies from "js-cookie";
import { setUserAuth } from "../utils";

export const AuthContext = createContext();

export const loadUserData = async (token, userId, authDispatch) => {
  if (token && userId !== null) {
    try {
      authDispatch({
        type: "SET_STATUS",
        payload: {
          status: { loading: { userType: "Loading user profile..." } },
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
      console.log({ data });
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

export const AuthProvider = ({ children, token, userId }) => {
  const router = useRouter();

  const [authState, authDispatch] = useReducer(authReducer, {
    token: "",
    user: null,
    status: null,
  });

  // useEffect(() => {
  //   (async () => {
  //     if (token && userId !== null) {
  //       try {
  //         authDispatch({
  //           type: "SET_STATUS",
  //           payload: {
  //             status: { loading: { userType: "Loading user profile..." } },
  //           },
  //         });
  //         const response = await fetch(`/api/userDetail/${userId}`, {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: token,
  //           },
  //         });
  //         const data = await response.json();
  //         console.log({ data });
  //         if (data.success) {
  //           authDispatch({
  //             type: "LOAD_USER_DETAILS",
  //             payload: { userDetails: data.data, token },
  //           });
  //         }
  //       } catch (error) {
  //         console.log({ error });
  //         authDispatch({
  //           type: "SET_STATUS",
  //           payload: { status: { error: "Couldn't load user profile..." } },
  //         });
  //       }
  //     }
  //   })();
  // }, [token]);

  useEffect(() => {
    loadUserData(token, userId, authDispatch);
  }, [token]);

  const signInUser = async ({ username, password, email }) => {
    try {
      authDispatch({
        type: "SET_STATUS",
        payload: { status: { loading: { userType: "Signing in user..." } } },
      });
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, email }),
      });

      const data = await response.json();
      console.log({ data });
      if (data.success) {
        setUserAuth({
          authDispatch,
          user: { username, _id: data.user._id, email },
          token: data.user.token,
        });
        router.push(`/profile/${data.user._id}`);
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
        payload: { status: { error: "Couldn't sign in user..." } },
      });
    }
  };

  const loginUser = async ({ username, password }) => {
    try {
      authDispatch({
        type: "SET_STATUS",
        payload: { status: { loading: { userType: "Logining user..." } } },
      });
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      console.log({ data });
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

  const logoutUser = (interviewSlotDispatch) => {
    authDispatch({ type: "LOGOUT" });
    interviewSlotDispatch({ type: "REMOVE_USER_INTERVIEW_SLOTS" });
    localStorage?.removeItem("token");
    localStorage?.removeItem("user");
    cookies.remove("token");
    cookies.remove("userId");
    router.replace("/");
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        authDispatch,
        signInUser,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
