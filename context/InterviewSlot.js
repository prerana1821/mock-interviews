import { createContext, useContext, useEffect, useReducer } from "react";
import { interviewSlotReducer } from "../reducer";
import { loadInterviewSlotsData } from "../serviceCalls";

export const InterviewSlotContext = createContext();

export const InterviewSlotProvider = ({ children, token }) => {
  const [interviewSlotState, interviewSlotDispatch] = useReducer(
    interviewSlotReducer,
    {
      interviewSlots: [],
      userInterViewSlots: { slots: [] },
      status: null,
    }
  );

  useEffect(() => {
    loadInterviewSlotsData(token, interviewSlotState, interviewSlotDispatch);
  }, [token]);

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
