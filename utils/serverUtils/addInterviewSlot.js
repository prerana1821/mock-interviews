export const addInterviewSlot = async (interviewSlot, dateAndTime, res) => {
  interviewSlot.slots.push({ slot: dateAndTime });
  const newUserInterviewSlot = await interviewSlot.save();
  const newSlot = newUserInterviewSlot.slots.find(
    (slot) => new Date(slot.slot).getTime() === new Date(dateAndTime).getTime()
  );
  return res.status(200).json({
    success: true,
    data: { slot: newSlot },
    message: "Successful",
  });
};
