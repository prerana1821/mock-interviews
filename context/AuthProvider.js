import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useReducer } from "react";
import { authReducer } from "../reducer";
import cookies from "js-cookie";
import { loadUserData } from "../serviceCalls";

export const AuthContext = createContext();

export const AuthProvider = ({ children, token, userId }) => {
  const router = useRouter();

  const [authState, authDispatch] = useReducer(authReducer, {
    token: "",
    user: null,
    status: null,
  });

  useEffect(() => {
    loadUserData(token, userId, authDispatch);
  }, [token]);

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
      value={ {
        authState,
        authDispatch,
        logoutUser,
      } }
    >
      { children }
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
