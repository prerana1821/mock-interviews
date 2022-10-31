import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { interviewSlotReducer } from "../reducer";
import { InterviewSlotAction } from "../reducer/interviewSlotReducer";
import { loadInterviewSlotsData } from "../serviceCalls";
import { InterviewsSlots, Slots } from "../types";

type InterviewSlotContext = {
  interviewSlotState: InterviewSlotState;
  interviewSlotDispatch: Dispatch<InterviewSlotAction>;
};

export const InterviewSlotContext = createContext({} as InterviewSlotContext);

export type InterviewSlotState = {
  interviewSlots: InterviewsSlots[];
  userInterViewSlots: { slots: Slots[] };
  status: Object;
};

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
    loadInterviewSlotsData(token, interviewSlotState, interviewSlotDispatch);
  }, [token]);

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
