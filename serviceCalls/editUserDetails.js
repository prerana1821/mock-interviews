export const editUserDetails = async (
  event,
  authState,
  authDispatch,
  fullName,
  portfolio,
  interviewDone,
  setEditProfile
) => {
  event.preventDefault();
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
        fullName,
        portfolio,
        interviewDone,
      }),
    });

    const data = await response.json();
    if (data.success) {
      authDispatch({
        type: "UPDATE_USER",
        payload: {
          portfolio: data.data.portfolio,
          fullName: data.data.fullName,
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
