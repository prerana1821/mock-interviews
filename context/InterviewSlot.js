import { createContext, useContext, useReducer } from "react";

export const InterviewSlotContext = createContext();

export const interviewSlotReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_INTERVIEW_SLOTS":
      return {
        ...state,
        interviewSlots: action.payload.interviewSlots,
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
    default:
      console.log("Something went wrong");
      break;
  }
};

export const InterviewSlotProvider = ({ children }) => {
  const [interviewSlotState, interviewSlotDispatch] = useReducer(
    interviewSlotReducer,
    {
      interviewSlots: [],
      userInterViewSlots: { slots: [] },
    }
  );

  console.log({ interviewSlotState });

  return (
    <InterviewSlotContext.Provider
      value={{ interviewSlotState, interviewSlotDispatch }}
    >
      {children}
    </InterviewSlotContext.Provider>
  );
};

export const useInterviewSlot = () => {
  return useContext(InterviewSlotContext);
};
