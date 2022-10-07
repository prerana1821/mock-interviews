import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  GithubAuthProvider,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { loginUser } from "../serviceCalls";
import { useAuth } from "./AuthProvider";
import { setUserAuth } from "../utils";
import { useRouter } from "next/router";

const FirebaseAuthContext = createContext({});

const provider = new GithubAuthProvider();

export const useFirebaseAuth = () => useContext(FirebaseAuthContext);

export const FirebaseAuthProvider = ({ children }) => {
  const router = useRouter();
  // NOT REQUIRED
  const [user, setUser] = useState(null);

  const { authDispatch } = useAuth();

  console.log({ authState });

  const [loading, setLoading] = useState(true);

  console.log(user, "firebase user");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // NOT REQUIRED
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        });
        loginUser({
          email: user.email,
          fullName: user.displayName,
          uid: user.uid,
          authDispatch,
          setUserAuth,
          router,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signup = () => {
    return signInWithPopup(auth, provider);
  };

  const login = () => {
    return signInWithPopup(auth, provider);
  };

  const logout = async () => {
    setUser(null);

    await signOut(auth);
  };

  return (
    <FirebaseAuthContext.Provider value={ { user, login, signup, logout } }>
      { loading ? null : children }
    </FirebaseAuthContext.Provider>
  );
};
