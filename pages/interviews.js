import { useState } from "react";
import { formatDateTime } from "../utils/dateFormatter";
import interviewSlotStyles from "../styles/Interviews.module.css";
import { LoginAlert } from "../components";
import { useAuth } from "../context";

const interviews = ({ interviewSlots }) => {
  const { authState } = useAuth();
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  const connectWithUser = async (interviewId) => {
    if (authState.token) {
      try {
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

        console.log({ response });
      } catch (error) {
        console.log(error);
      }
    } else {
      setShowLoginAlert(true);
    }
  };

  // console.log({ interviewSlots });
  return (
    <div>
      {showLoginAlert && <LoginAlert setShowLoginAlert={setShowLoginAlert} />}
      <h1 className='textCenter'>Interview Slots</h1>
      <div className={interviewSlotStyles.interviewSlots}>
        {interviewSlots.map((interviewSlot) => {
          return interviewSlot.slots.map((slot) => {
            return (
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
            );
          });
        })}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  let response = await fetch(`http://localhost:3000/api/interviewSlot`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const { data } = await response.json();
  // console.log({ data });
  return { props: { interviewSlots: data } };
}

export default interviews;
