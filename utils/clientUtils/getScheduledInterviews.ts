import { InterviewsSlots } from "../../context/InterviewSlot/InterviewSlot.types";

export const scheduledSlots = (
  interviewSlots: InterviewsSlots[],
  userId: string
): InterviewsSlots[] => {
  const slots = interviewSlots.filter((interviewSlot) => {
    return interviewSlot?.userId?._id !== userId;
  });
  const filteredInterviewSlots = slots.reduce((acc, item) => {
    return acc.concat({
      userId: item.userId,
      slots: item.slots.reduce((acc, slot) => {
        return slot.partner?._id === userId ? acc.concat(slot) : acc;
      }, []),
    });
  }, []);
  const scheduledInterviewSlots = filteredInterviewSlots.filter(
    (interviewSlot) => {
      return interviewSlot.slots.length !== 0;
    }
  );
  return scheduledInterviewSlots;
};
