import { useEffect, useState } from "react";
import { formatDateTime } from "../utils/dateFormatter";
import interviewSlotStyles from "../styles/Interviews.module.css";
import { LoginAlert } from "../components";
import { useAuth, useInterviewSlot } from "../context";

const interviews = ({ interviewSlots }) => {
  const { authState } = useAuth();
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const { interviewSlotState, interviewSlotDispatch } = useInterviewSlot();

  useEffect(() => {
    if (typeof interviewSlots === "string") {
      interviewSlotDispatch({
        type: "SET_STATUS",
        payload: {
          status: { error: interviewSlots },
        },
      });
    } else {
      interviewSlotDispatch({
        type: "LOAD_INTERVIEW_SLOTS",
        payload: { interviewSlots },
      });
    }
  }, [interviewSlots]);

  const connectWithUser = async (interviewId) => {
    if (authState.token) {
      try {
        interviewSlotDispatch({
          type: "SET_STATUS",
          payload: {
            status: { loading: "Connectingg...!" },
          },
        });
        const response = await fetch(
          `http://localhost:3000/api/interviewSlot/${authState.user._id}/${interviewId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: authState.token,
            },
            body: JSON.stringify({ partner: authState.user._id }),
          }
        );
        const data = await response.json();
        console.log({ data });
        if (data.success) {
          interviewSlotDispatch({
            type: "UPDATE_INTERVIEW_SLOTS",
            payload: { interviewSlot: data.data },
          });
        }
      } catch (error) {
        console.log({ error });
        interviewSlotDispatch({
          type: "SET_STATUS",
          payload: { status: { error: "Couldn't connect! Try again later" } },
        });
      }
    } else {
      setShowLoginAlert(true);
    }
  };

  let filteredSlots;
  if (authState.token) {
    filteredSlots = interviewSlotState.interviewSlots.filter(
      (interviewSlot) => {
        return authState.user._id !== interviewSlot.userId._id;
      }
    );
  }

  const showInterviewSlots = (slots) => {
    return slots.map((interviewSlot) => {
      return interviewSlot.slots.map((slot) => {
        return (
          !slot.partner && (
            <div
              key={slot._id}
              className={interviewSlotStyles.interviewSlotCard}
            >
              <h3>{interviewSlot.userId.fullName}</h3>
              <h4>@{interviewSlot.userId.username}</h4>
              <p>{formatDateTime(slot.slot)}</p>
              <button
                onClick={() => connectWithUser(slot._id)}
                className='btnPrimary'
              >
                Connect
              </button>
            </div>
          )
        );
      });
    });
  };

  return (
    <div>
      {showLoginAlert && <LoginAlert setShowLoginAlert={setShowLoginAlert} />}
      <h1 className='textCenter'>Interview Slots</h1>
      <div className={interviewSlotStyles.interviewSlots}>
        {filteredSlots
          ? showInterviewSlots(filteredSlots)
          : showInterviewSlots(interviewSlotState.interviewSlots)}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  let interviewSlots;
  try {
    let response = await fetch(`http://localhost:3000/api/interviewSlot`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.success) {
      interviewSlots = data.data;
    }
  } catch (error) {
    console.log({ error });
    interviewSlots = "Couldn't load interview slots! Try again later";
  }

  return { props: { interviewSlots } };
}

export default interviews;
