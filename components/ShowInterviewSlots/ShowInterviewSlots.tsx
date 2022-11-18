import { formatTime } from "../../utils";
import { connectWithUser } from "../../serviceCalls";
import { useAuth, useInterviewSlot } from "../../context";
import interviewSlotStyles from "../../styles/Interviews.module.css";
import { formatDate } from "../../utils/clientUtils/getFormattedDate";
import {
  InterviewsSlots,
  Slots,
} from "../../context/InterviewSlot/InterviewSlot.types";
import { useTheme } from "../../context/Theme/Theme";
import { Dispatch, SetStateAction } from "react";

declare global {
  interface Window {
    gapi: any;
    triggerGoogleLoaded: () => void;
  }
}

let gapi;
if (typeof window !== "undefined") {
  console.log({ window });
  gapi = window.gapi;
}

export const ShowInterviewSlots = ({ slots, setShowLoginAlert }) => {
  const { authState } = useAuth();
  const { theme } = useTheme();
  const { interviewSlotDispatch } = useInterviewSlot();

  return slots.length === 0 ? (
    <div>We don't have any scheduled interview slots</div>
  ) : (
    slots.map((interviewSlot) => {
      return interviewSlot.slots
        .filter((slot: Slots): boolean => {
          const today = new Date();
          let yesterday = new Date(today);
          yesterday.setDate(yesterday.getDate() - 1);
          return new Date(formatDate(slot.slot)) > new Date(yesterday);
        })
        .sort(
          (a: Slots, b: Slots): number => +new Date(a.slot) - +new Date(b.slot)
        )
        .map((slot: Slots): JSX.Element => {
          return (
            !slot.partner && (
              <div
                key={slot._id}
                className={interviewSlotStyles.interviewSlotCard}
                style={{ ...theme, boxShadow: theme.primaryBoxShadow }}
              >
                <h3>{interviewSlot.userId.fullName}</h3>
                <h4>@{interviewSlot.userId.username}</h4>
                <p>{formatTime(slot.slot)}</p>
                <p>{formatDate(slot.slot)}</p>
                <button
                  onClick={() =>
                    connectWithUser({
                      slot,
                      interviewSlot,
                      authState,
                      interviewSlotDispatch,
                      setShowLoginAlert,
                      gapi,
                    })
                  }
                  className='btnPrimary'
                >
                  Schedule Interview
                </button>
              </div>
            )
          );
        });
    })
  );
};
