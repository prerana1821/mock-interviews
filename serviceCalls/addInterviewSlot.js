export const addInterviewSlot = async (
  event,
  authState,
  dateAndTime,
  setDateAndTime,
  interviewSlotDispatch
) => {
  event.preventDefault();
  console.log(2, { dateAndTime });
  try {
    interviewSlotDispatch({
      type: "SET_STATUS",
      payload: {
        status: { loading: { actionType: "Adding interview slot..." } },
      },
    });
    const response = await fetch(`/api/interviewSlot/${authState.user._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authState.token,
      },
      body: JSON.stringify({
        dateAndTime,
      }),
    });
    const data = await response.json();
    if (data.success) {
      interviewSlotDispatch({
        type: "ADD_USER_INTERVIEW_SLOT",
        payload: { slot: data.data.slot },
      });
      setDateAndTime(null);
    }
  } catch (error) {
    console.log({ error });
    interviewSlotDispatch({
      type: "SET_STATUS",
      payload: {
        status: { error: "Couldn't add interview slot! Try again later" },
      },
    });
  }
};
