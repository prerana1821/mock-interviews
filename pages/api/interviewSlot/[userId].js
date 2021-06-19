import dbConnect from "../../../middlewares/db.connect";
import verifiedUser from "../../../middlewares/verifiedUser";
import InterviewSlot from "../../../models/InterviewSlot";

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

async function handler(req, res) {
  const {
    query: { userId },
    method,
  } = req;
  const { dateAndTime } = req.body;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const interviewSlots = await InterviewSlot.findOne({
          userId: userId,
        })
          .populate({
            path: "slots.partner",
            select: "username fullName",
          })
          .exec();
        if (!interviewSlots) {
          return res
            .status(200)
            .json({ success: true, data: "Interview not scheduled" });
        }
        res
          .status(200)
          .json({ success: true, data: interviewSlots, message: "Successful" });
      } catch (error) {
        res.status(400).json({ success: false, errorMessage: "Error" });
      }
      break;
    case "POST":
      try {
        const interviewSlots = await InterviewSlot.findOne({
          userId: userId,
        }).exec();
        if (!interviewSlots) {
          const NewInterviewSlot = new InterviewSlot({ userId });
          await addInterviewSlot(NewInterviewSlot, dateAndTime, res);
        } else {
          await addInterviewSlot(interviewSlots, dateAndTime, res);
        }
      } catch (error) {
        res.status(400).json({
          success: false,
          errorMessage: "Couldn't add interview slot",
        });
      }
      break;
    default:
      res.status(400).json({ success: false, errorMessage: "Default" });
      break;
  }
}

export default verifiedUser(handler);
