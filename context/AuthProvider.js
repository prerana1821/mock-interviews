import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useReducer } from "react";
import cookies from "js-cookie";

export const AuthContext = createContext();

export const setUserAuth = ({ authDispatch, user, token }) => {
  localStorage?.setItem("token", JSON.stringify({ token }));
  localStorage?.setItem(
    "user",
    JSON.stringify({
      _id: user._id,
      username: user.username,
      email: user.email,
    })
  );
  cookies.set("token", token, { expires: 7 });
  cookies.set("userId", user._id, { expires: 7 });
  authDispatch({ type: "LOGIN_USER", payload: user });
  authDispatch({ type: "ADD_TOKEN", payload: { token } });
  authDispatch({
    type: "SET_STATUS",
    payload: {
      status: { success: `Hurray! Signup Successful ${user.username}` },
    },
  });
};

export const authReducer = (state, action) => {
  console.log(state, action);
  switch (action.type) {
    case "LOGIN_USER":
      return { ...state, user: action.payload };
    case "LOAD_USER_DETAILS":
      return {
        ...state,
        user: action.payload.userDetails,
        token: action.payload.token,
      };
    case "UPDATE_USER":
      return {
        ...state,
        user: {
          ...state.user,
          portfolio: action.payload.portfolio,
          fullName: action.payload.fullName,
          interviewDone: action.payload.interviewDone,
        },
      };
    case "ADD_TOKEN":
      return { ...state, token: action.payload.token };
    case "SET_STATUS":
      return { ...state, status: action.payload.status };
    case "LOGOUT":
      return {
        token: "",
        user: null,
        status: null,
      };
    default:
      console.log(state);
      console.log("Something went wrong!");
      break;
  }
};

export const AuthProvider = ({ children, token, userId }) => {
  const router = useRouter();

  console.log(63, token);
  console.log(63, userId);

  const [authState, authDispatch] = useReducer(authReducer, {
    token: "",
    user: null,
    status: null,
  });

  useEffect(() => {
    (async () => {
      if (token) {
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
      }
    })();
  }, [token]);

  const signInUser = async ({ username, password, email }) => {
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
      // router.push(`/profile/${data.user._id}`);
      router.push("/interviews");
    }
  };

  const loginUser = async ({ username, password }) => {
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
      // router.push("/interviews");
      router.push(`/profile/${data.data.user._id}`);
    }
  };

  const logoutUser = () => {
    authDispatch({ type: "LOGOUT" });
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
