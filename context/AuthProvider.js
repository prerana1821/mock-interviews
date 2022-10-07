import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useReducer } from "react";
import { authReducer } from "../reducer";
import cookies from "js-cookie";
import { loadUserData } from "../serviceCalls";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  GithubAuthProvider,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { loginUser } from "../serviceCalls";
import { setUserAuth } from "../utils"

export const AuthContext = createContext();

const provider = new GithubAuthProvider();

export const AuthProvider = ({ children, token, userId }) => {
  const router = useRouter();

  const [authState, authDispatch] = useReducer(authReducer, {
    token: "",
    user: null,
    status: null,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        loginUser({
          email: user.email,
          fullName: user.displayName,
          uid: user.uid,
          authDispatch,
          setUserAuth,
          router,
        });
      }
    });
    loadUserData(token, userId, authDispatch);

    return () => unsubscribe();
  }, [token]);

  const login = () => {
    return signInWithPopup(auth, provider);
  };

  // const logout = async () => {
  //   setUser(null);


  // };

  const logoutUser = async (interviewSlotDispatch) => {
    authDispatch({ type: "LOGOUT" });
    interviewSlotDispatch({ type: "REMOVE_USER_INTERVIEW_SLOTS" });
    localStorage?.removeItem("token");
    localStorage?.removeItem("user");
    cookies.remove("token");
    cookies.remove("userId");
    router.replace("/");
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={ {
        authState,
        authDispatch,
        logoutUser,
        login
      } }
    >
      { children }
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
