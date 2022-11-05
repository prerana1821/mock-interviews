import { useAuth, useInterviewSlot } from "../../context";
import { formatTime, scheduledSlots } from "../../utils";
import { formatDate } from "../../utils/clientUtils/getFormattedDate";
import { InterviewsSlots, Slots } from "../../context/Interview.types";
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
      <h1 className='textCenter'>Your Scheduled Interviews</h1>
      <p className='textCenter'>
        Interview will take place on #teamtanay discord. Connect with the person
        using discord id.
      </p>
      <div className={styles.interviewSlots}>
        {scheduledInterviews.map((scheduledInterview: InterviewsSlots) => {
          return (
            scheduledInterview.slots
              // .filter((slot) => {
              //   const today = new Date();
              //   let yesterday = new Date(today);
              //   yesterday.setDate(yesterday.getDate() - 1);
              //   return new Date(formatDate(slot.slot)) > new Date(yesterday);
              // })
              .sort(
                (a: Slots, b: Slots) => +new Date(a.slot) - +new Date(b.slot)
              )
              .map((interview: Slots) => {
                return (
                  <div
                    className={styles.greenInterviewSlot}
                    key={interview._id}
                  >
                    <div className={styles.greenInterviewSlotHR}>
                      <h3>@{scheduledInterview.userId.username}</h3>
                      <p>{formatTime(interview.slot)}</p>
                      <p>{formatDate(interview.slot)}</p>
                    </div>
                  </div>
                );
              })
          );
        })}
      </div>
    </div>
  );
};