import { formatDateTime } from "../utils/dateFormatter";
import interviewSlotStyles from "../styles/Interviews.module.css";

const interviews = ({ interviewSlots }) => {
  // console.log({ interviewSlots });
  return (
    <div>
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
                <button>Connect</button>
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
