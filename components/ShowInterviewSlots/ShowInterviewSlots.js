import { formatDateTime } from "../../utils";
import { connectWithUser } from "../../serviceCalls";
import { useAuth, useInterviewSlot } from "../../context";
import interviewSlotStyles from "../../styles/Interviews.module.css";

export const ShowInterviewSlots = ({ slots, setShowLoginAlert }) => {
  const { authState } = useAuth();
  const { interviewSlotDispatch } = useInterviewSlot();
  return slots.length === 0 ? (
    <div>We don't have any scheduled interview slots</div>
  ) : (
    slots.map((interviewSlot) => {
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
                onClick={() =>
                  connectWithUser(
                    slot._id,
                    authState,
                    interviewSlotDispatch,
                    setShowLoginAlert
                  )
                }
                className='btnPrimary'
              >
                Connect
              </button>
            </div>
          )
        );
      });
    })
  );
};
