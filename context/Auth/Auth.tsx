import { useRouter } from "next/router";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { authReducer } from "../../reducer";
import cookies from "js-cookie";
import { loadUserData } from "../../serviceCalls";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  GithubAuthProvider,
  UserCredential,
} from "firebase/auth";
import { auth } from "../../config/firebase";
import { loginUser } from "../../serviceCalls";
import { setUserAuth } from "../../utils";
import { AuthContextT, UserState } from "./Auth.types";

export const AuthContext = createContext<AuthContextT>({} as AuthContextT);

const provider = new GithubAuthProvider();

export const AuthProvider = ({
  children,
  token,
  userId,
}: {
  children: ReactNode;
  token: string;
  userId: string;
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
    loadUserData({ token, userId, authDispatch });
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
