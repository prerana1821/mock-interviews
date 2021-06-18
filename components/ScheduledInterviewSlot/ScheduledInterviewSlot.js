import { useAuth, useInterviewSlot } from "../../context";
import { formatDateTime } from "../../utils/dateFormatter";
import styles from "../UserInterviewSlot/UserInterviewSlot.module.css";

export const ScheduledInterviewSlot = () => {
  const { authState } = useAuth();
  const { interviewSlotState } = useInterviewSlot();

  const scheduledSlots = (interviewSlots, userId) => {
    console.log(interviewSlots, userId);
    const slots = interviewSlots.filter((interviewSlot) => {
      return interviewSlot.userId._id !== userId;
    });
    console.log({ slots });
    const filteredInterviewSlots = slots.reduce((acc, item) => {
      console.log({ item });
      return acc.concat({
        userId: item.userId,
        slots: item.slots.reduce((acc, slot) => {
          return slot.partner?._id === userId ? acc.concat(slot) : acc;
        }, []),
      });
    }, []);
    console.log({ filteredInterviewSlots });

    const scheduledInterviewSlots = filteredInterviewSlots.filter(
      (interviewSlot) => {
        return interviewSlot.slots.length !== 0;
      }
    );
    console.log({ scheduledInterviewSlots });
    return scheduledInterviewSlots;
  };

  const scheduledInterviews = scheduledSlots(
    interviewSlotState.interviewSlots,
    authState.user?._id
  );

  return (
    <div>
      <h1 className='textCenter'>Other Scheduled Interviews</h1>
      <div className={styles.interviewSlots}>
        {scheduledInterviews.map((scheduledInterview) => {
          return scheduledInterview.slots.map((interview) => {
            return (
              <div className={styles.greenInterviewSlot}>
                <h3>@{scheduledInterview.userId.username}</h3>
                <p>Time:{formatDateTime(interview.slot)}</p>
              </div>
            );
          });
        })}
      </div>
    </div>
  );
};
