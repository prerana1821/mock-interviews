export const deleteInterviewSlot = async (
  slotId,
  authState,
  interviewSlotDispatch
) => {
  try {
    interviewSlotDispatch({
      type: "SET_STATUS",
      payload: {
        status: { loading: { actionType: "Deleting Interview Slot..." } },
      },
    });
    const response = await fetch(
      `${process.env.API_URL}api/interviewSlot/${authState.user._id}/${slotId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: authState.token,
        },
      }
    );
    const data = await response.json();
    if (data.success) {
      interviewSlotDispatch({
        type: "DELETE_USER_INTERVIEW_SLOT",
        payload: { interviewSlotId: data.data },
      });
    }
  } catch (error) {
    console.log({ error });
    interviewSlotDispatch({
      type: "SET_STATUS",
      payload: {
        status: {
          error: "Couldn't deleting interview slot! Try again later",
        },
      },
    });
  }
};
