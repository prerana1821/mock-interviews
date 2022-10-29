import cookies from "js-cookie";

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
  cookies.set("token", token, { expires: 1 });
  cookies.set("userId", user._id, { expires: 1 });
  authDispatch({ type: "LOGIN_USER", payload: user });
  authDispatch({ type: "ADD_TOKEN", payload: { token } });
  authDispatch({
    type: "SET_STATUS",
    payload: {
      status: { success: `Hello ${user.username}` },
    },
  });
};
