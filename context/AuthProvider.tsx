import { useRouter } from "next/router";
import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { authReducer } from "../reducer";
import cookies from "js-cookie";
import { loadUserData } from "../serviceCalls";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  GithubAuthProvider,
  UserCredential,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { loginUser } from "../serviceCalls";
import { setUserAuth } from "../utils";
import { UserDetails } from "../types";
import { AuthAction } from "../reducer/authReducer";
import { InterviewSlotAction } from "../reducer/interviewSlotReducer";

type AuthContext = {
  authState: UserState;
  authDispatch: Dispatch<AuthAction>;
  logoutUser: (
    interviewSlotDispatch: Dispatch<InterviewSlotAction>
  ) => Promise<void>;
  login: () => Promise<UserCredential>;
};

export const AuthContext = createContext<AuthContext>({} as AuthContext);

const provider = new GithubAuthProvider();

export type UserState = {
  token: string;
  user: UserDetails;
  status: Object;
};

export const AuthProvider = ({
  children,
  token,
  userId,
}: {
  children: ReactNode;
  token: string;
  userId: any;
}) => {
  const router = useRouter();

  const initialAuthState: UserState = {
    token: "",
    user: null,
    status: null,
  };

  const [authState, authDispatch] = useReducer(authReducer, initialAuthState);

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

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    loadUserData(token, userId, authDispatch);
  }, [token]);

  const login = () => {
    return signInWithPopup(auth, provider);
  };

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
      value={{
        authState,
        authDispatch,
        logoutUser,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
