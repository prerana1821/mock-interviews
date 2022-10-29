export const loadInterviewSlotsData = async (
  token,
  interviewSlotState,
  interviewSlotDispatch
) => {
  if (token && interviewSlotState.interviewSlots.length === 0) {
    try {
      interviewSlotDispatch({
        type: "SET_STATUS",
        payload: {
          status: {
            loading: { loadingType: "loading interview slots..." },
          },
        },
      });
      const response = await fetch("/api/interviewSlot", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.success) {
        interviewSlotDispatch({
          type: "LOAD_INTERVIEW_SLOTS",
          payload: { interviewSlots: data.data },
        });
      }
    } catch (error) {
      console.log({ error });
      interviewSlotDispatch({
        type: "SET_STATUS",
        payload: {
          status: {
            error: "Couldn't load interview slots! Try again later",
          },
        },
      });
    }
  }
};
