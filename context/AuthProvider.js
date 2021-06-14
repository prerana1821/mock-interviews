import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const setUserAuth = ({
  setUser,
  setToken,
  setStatus,
  username,
  id,
  email,
  token,
}) => {
  setUser({ _id: id, username, email });
  localStorage?.setItem("token", JSON.stringify({ token }));
  setToken(token);
  localStorage?.setItem("user", JSON.stringify({ _id: id, username, email }));
  setStatus({ success: `Hurray! Signup Successful ${username}` });
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({
    _id: "",
    username: "",
    email: "",
  });
  const [status, setStatus] = useState({
    loading: "",
    success: "",
    error: "",
  });

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
        setUser,
        setToken,
        setStatus,
        username,
        id: data.user._id,
        email,
        token: data.user.token,
      });
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
        setUser,
        setToken,
        setStatus,
        username,
        id: data.user._id,
        email: data.user.email,
        token: data.user.token,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{ token, user, status, signInUser, loginUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
