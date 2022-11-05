import { formatTime } from "../../utils";
import { connectWithUser } from "../../serviceCalls";
import { useAuth, useInterviewSlot } from "../../context";
import interviewSlotStyles from "../../styles/Interviews.module.css";
import { formatDate } from "../../utils/clientUtils/getFormattedDate";
import { useEffect } from "react";

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

const CLIENT_ID =
  "863578440757-fb81u1g8ht6flj68aau1op47k6rj1msl.apps.googleusercontent.com";
const API_KEY = "AIzaSyADkO_oXckoz7YIjM9BXZQDi69oGruLcsc";
const SCOPES = "https://www.googleapis.com/auth/calendar.events";

export const ShowInterviewSlots = ({ slots, setShowLoginAlert }) => {
  const { authState } = useAuth();
  const { interviewSlotDispatch } = useInterviewSlot();

  return slots.length === 0 ? (
    <div>We don't have any scheduled interview slots</div>
  ) : (
    slots.map((interviewSlot) => {
      console.log({ interviewSlot });
      return interviewSlot.slots
        .filter((slot) => {
          const today = new Date();
          let yesterday = new Date(today);
          yesterday.setDate(yesterday.getDate() - 1);
          return new Date(formatDate(slot.slot)) > new Date(yesterday);
        })
        .sort((a, b) => +new Date(a.slot) - +new Date(b.slot))
        .map((slot) => {
          console.log({ time: slot.slot });
          return (
            !slot.partner && (
              <div
                key={slot._id}
                className={interviewSlotStyles.interviewSlotCard}
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
                      CLIENT_ID,
                      API_KEY,
                      SCOPES,
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
