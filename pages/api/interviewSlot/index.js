import runCors, { cors } from "../../../middlewares/cors";
import dbConnect from "../../../middlewares/db.connect";
import InterviewSlot from "../../../models/InterviewSlot";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();
  await runCors(req, res, cors);

  switch (method) {
    case "GET":
      try {
        const interviewSlots = await InterviewSlot.find({})
          .populate({
            path: "userId",
            select: "username fullName email",
          })
          .populate({
            path: "slots.partner",
            select: "username fullName email",
          })
          .exec();
        return res.status(200).json({
          data: interviewSlots,
          success: true,
          message: "Successful Retrieval",
        });
      } catch (error) {
        res.status(404).json({
          success: false,
          message: "Error while retrieving interview slots",
          errorMessage: error.message,
        });
      }
      break;
    default:
      res.status(400).json({ success: false, errorMessage: "Invalid" });
      break;
  }
}
