import { formatTime } from "../../utils";
import { connectWithUser } from "../../serviceCalls";
import { useAuth, useInterviewSlot } from "../../context";
import interviewSlotStyles from "../../styles/Interviews.module.css";
import { formatDate } from "../../utils/clientUtils/getFormattedDate";

export const ShowInterviewSlots = ({ slots, setShowLoginAlert }) => {
  const { authState } = useAuth();
  const { interviewSlotDispatch } = useInterviewSlot();
  return slots.length === 0 ? (
    <div>We don't have any scheduled interview slots</div>
  ) : (
    slots.map((interviewSlot) => {
      return interviewSlot.slots
        .filter((slot) => {
          const today = new Date();
          let yesterday = new Date(today);
          yesterday.setDate(yesterday.getDate() - 1);
          return new Date(formatDate(slot.slot)) > new Date(yesterday);
        })
        .sort((a, b) => new Date(a.slot) - new Date(b.slot))
        .map((slot) => {
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
                    connectWithUser(
                      slot._id,
                      authState,
                      interviewSlotDispatch,
                      setShowLoginAlert
                    )
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
