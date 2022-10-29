import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  GithubAuthProvider,
} from "firebase/auth";
import { auth } from "../config/firebase";

const FirebaseAuthContext = createContext({});

const provider = new GithubAuthProvider();

type FirebaseUser = {
  uid: string;
  email: string;
  displayName: string;
};

export const useFirebaseAuth = () => useContext(FirebaseAuthContext);

export const FirebaseAuthProvider = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  console.log(user, "firebase user");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
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
    <FirebaseAuthContext.Provider value={{ user, login, signup, logout }}>
      {loading ? null : children}
    </FirebaseAuthContext.Provider>
  );
};
