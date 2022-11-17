import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { interviewSlotReducer } from "../../reducer";
import { loadInterviewSlotsData } from "../../serviceCalls";
import {
  InterviewSlotContextT,
  InterviewSlotState,
} from "./InterviewSlot.types";

export const InterviewSlotContext = createContext({} as InterviewSlotContextT);

export const InterviewSlotProvider = ({
  children,
  token,
}: {
  children: ReactNode;
  token: string;
}) => {
  const initialInterviewSlotState: InterviewSlotState = {
    interviewSlots: [],
    userInterViewSlots: { slots: [] },
    status: null,
  };
  const [interviewSlotState, interviewSlotDispatch] = useReducer(
    interviewSlotReducer,
    initialInterviewSlotState
  );

  useEffect(() => {
    loadInterviewSlotsData({
      token,
      interviewSlotState,
      interviewSlotDispatch,
    });
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
