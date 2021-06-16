import dbConnect from "../../../middlewares/db.connect";
import verifiedUser from "../../../middlewares/verifiedUser";
import InterviewSlot from "../../../models/InterviewSlot";

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
        }).exec();
        if (!interviewSlots) {
          return res
            .status(400)
            .json({ success: true, message: "Interview not scheduled" });
        }
        res
          .status(200)
          .json({ success: true, data: interviewSlots, message: "Successful" });
      } catch (error) {
        res.status(400).json({ success: false, message: "Error" });
      }
      break;
    case "POST":
      try {
        const interviewSlots = await InterviewSlot.findOne({
          userId: userId,
        }).exec();
        if (!interviewSlots) {
          const NewInterviewSlot = new InterviewSlot({ userId });
          NewInterviewSlot.slots.push({ slot: dateAndTime });
          const newUserInterviewSlot = await NewInterviewSlot.save();
          res.status(200).json({
            success: true,
            data: { slots: newUserInterviewSlot.slots },
            message: "Successful",
          });
        } else {
          interviewSlots.slots.push({ slot: dateAndTime });
          const newInterviewSlot = await interviewSlots.save();
          res.status(200).json({
            success: true,
            data: { slots: newInterviewSlot.slots },
            message: "Successful",
          });
        }
      } catch (error) {
        res.status(400).json({ success: false, message: "Error" });
      }
      break;
    default:
      res.status(400).json({ success: false, message: "Default" });
      break;
  }
}

export default verifiedUser(handler);
