import { createContext, useContext, useEffect, useReducer } from "react";

export const InterviewSlotContext = createContext();

export const interviewSlotReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_INTERVIEW_SLOTS":
      return {
        ...state,
        interviewSlots: action.payload.interviewSlots,
      };
    case "UPDATE_INTERVIEW_SLOTS":
      console.log("action", action.payload);
      return {
        ...state,
        interviewSlots: state.interviewSlots.map((interviewSlot) => {
          return interviewSlot.userId._id ===
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
    default:
      console.log("Something went wrong");
      break;
  }
};

export const InterviewSlotProvider = ({ children, token }) => {
  const [interviewSlotState, interviewSlotDispatch] = useReducer(
    interviewSlotReducer,
    {
      interviewSlots: [],
      userInterViewSlots: { slots: [] },
    }
  );

  useEffect(() => {
    (async () => {
      if (token && interviewSlotState.interviewSlots.length === 0) {
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
      }
    })();
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
