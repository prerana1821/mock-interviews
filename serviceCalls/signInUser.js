export const signInUser = async ({
  username,
  password,
  email,
  authDispatch,
  setUserAuth,
  router,
}) => {
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
    console.log({ response });
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
