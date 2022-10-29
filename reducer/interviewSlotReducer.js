export const interviewSlotReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_INTERVIEW_SLOTS":
      return {
        ...state,
        interviewSlots: action.payload.interviewSlots,
      };
    case "UPDATE_INTERVIEW_SLOTS":
      return {
        ...state,
        interviewSlots: state.interviewSlots.map((interviewSlot) => {
          return interviewSlot?.userId?._id ===
            action.payload.interviewSlot.userId._id
            ? action.payload.interviewSlot
            : interviewSlot;
        }),
      };
    case "LOAD_USER_INTERVIEW_SLOT":
      return {
        ...state,
        userInterViewSlots: {
          slots: action.payload.slots,
        },
      };
    case "ADD_USER_INTERVIEW_SLOT":
      return {
        ...state,
        userInterViewSlots: {
          ...state.userInterViewSlots,
          slots: state.userInterViewSlots.slots.concat(action.payload.slot),
        },
      };
    case "DELETE_USER_INTERVIEW_SLOT":
      return {
        ...state,
        userInterViewSlots: {
          ...state.userInterViewSlots,
          slots: state.userInterViewSlots.slots.filter((userInterViewSlot) => {
            return userInterViewSlot._id !== action.payload.interviewSlotId;
          }),
        },
      };
    case "REMOVE_USER_INTERVIEW_SLOTS":
      return {
        ...state,
        userInterViewSlots: { slots: [] },
        status: null,
      };
    case "SET_STATUS":
      return {
        ...state,
        status: action.payload.status,
      };
    default:
      console.log({ state });
      console.log("Something went wrong");
      break;
  }
};
