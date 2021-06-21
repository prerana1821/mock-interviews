import { useAuth, useInterviewSlot } from "../../context";
import { formatDateTime } from "../../utils/dateFormatter";
import { scheduledSlots } from "../../utils/getScheduledInterviews";
import styles from "../UserInterviewSlot/UserInterviewSlot.module.css";

export const ScheduledInterviewSlot = () => {
  const { authState } = useAuth();
  const { interviewSlotState } = useInterviewSlot();

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
              <div className={styles.greenInterviewSlot} key={interview._id}>
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
