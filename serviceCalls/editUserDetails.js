export const editUserDetails = async (
  event,
  authState,
  authDispatch,
  username,
  portfolio,
  interviewDone,
  setEditProfile
) => {
  event.preventDefault();
  console.log({
    username,
    portfolio,
    interviewDone,
  });
  try {
    authDispatch({
      type: "SET_STATUS",
      payload: {
        status: { loading: { userDetailType: "Updating your profile..." } },
      },
    });
    const response = await fetch(`/api/userDetail/${authState.user._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authState.token,
      },
      body: JSON.stringify({
        username,
        portfolio,
        interviewDone,
      }),
    });

    const data = await response.json();
    console.log({ data });
    if (data.success) {
      authDispatch({
        type: "UPDATE_USER",
        payload: {
          portfolio: data.data.portfolio,
          username: data.data.username,
          interviewDone: data.data.interviewDone,
        },
      });
      setEditProfile(false);
    }
  } catch (error) {
    console.log({ error });
    authDispatch({
      type: "SET_STATUS",
      payload: {
        status: { error: "Couldn't update your profile! Try again later" },
      },
    });
  }
};
