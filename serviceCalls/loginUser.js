export const loginUser = async ({
  username,
  password,
  authDispatch,
  setUserAuth,
  router,
}) => {
  try {
    authDispatch({
      type: "SET_STATUS",
      payload: { status: { loading: { userType: "Logining user..." } } },
    });
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (data.success) {
      setUserAuth({
        authDispatch,
        user: data.data.user,
        token: data.data.token,
      });
      router.push(`/profile/${data.data.user._id}`);
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
      payload: { status: { error: "Couldn't login user..." } },
    });
  }
};
