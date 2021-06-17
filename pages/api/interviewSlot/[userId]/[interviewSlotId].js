import dbConnect from "../../../../middlewares/db.connect";
import verifiedUser from "../../../../middlewares/verifiedUser";
import InterviewSlot from "../../../../models/InterviewSlot";

async function handler(req, res) {
  const {
    query: { userId, interviewSlotId },
    method,
  } = req;
  const { partner } = req.body;
  console.log({ partner });

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        console.log("Hello");
        const interviewSlots = await InterviewSlot.findOne({
          userId: userId,
        }).exec();
        if (!interviewSlots) {
          return res.status(400).json({
            success: true,
            message: "User's scheduled interviews not found",
          });
        } else {
          const interviewSlot = await InterviewSlot.findOne({
            "slots._id": interviewSlotId,
          });
          if (!interviewSlot) {
            return res.status(400).json({
              success: true,
              message: "Scheduled interview not found",
            });
          } else {
            interviewSlot.slots.id(interviewSlotId).partner = partner;
            const updatedInterviewSlotFromDB = await interviewSlot.save();
            console.log(updatedInterviewSlotFromDB.slots);
            res.status(200).json({
              success: true,
              data: updatedInterviewSlotFromDB,
              message: "Successful",
            });
          }
        }
      } catch (error) {
        res.status(400).json({ success: false, message: "Error" });
      }
      break;
    case "DELETE":
      try {
        const interviewSlots = await InterviewSlot.findOne({
          userId: userId,
        }).exec();
        if (!interviewSlots) {
          return res.status(400).json({
            success: true,
            message: "User's scheduled interviews not found",
          });
        } else {
          const interviewSlot = await InterviewSlot.findOne({
            "slots._id": interviewSlotId,
          });
          if (!interviewSlot) {
            return res.status(400).json({
              success: true,
              message: "Scheduled interview not found",
            });
          }
          interviewSlots.slots.pull({ _id: interviewSlotId });
          await interviewSlots.save();
          res.status(200).json({
            success: true,
            data: interviewSlotId,
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
