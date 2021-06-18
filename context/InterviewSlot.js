import { createContext, useContext, useReducer } from "react";

export const InterviewSlotContext = createContext();

export const interviewSlotReducer = (state, action) => {
  console.log(state, action);
  switch (action.type) {
    case "ADD_INTERVIEW_SLOT":
      console.log(action.payload);
      return {
        ...state,
        userInterViewSlots: {
          ...state.userInterViewSlots,
          slots: action.payload.slots,
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
