import runCors, { cors } from "../../../middlewares/cors";
import dbConnect from "../../../middlewares/db.connect";
import verifiedUser from "../../../middlewares/verifiedUser";
import InterviewSlot from "../../../models/InterviewSlot";
import { addInterviewSlot } from "../../../utils";

async function handler(req, res) {
  const {
    query: { userId },
    method,
  } = req;
  const { dateAndTime } = req.body;

  await dbConnect();
  await runCors(req, res, cors);

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
          return res.status(202).json({
            success: true,
            data: "Interviews not scheduled",
            statusCode: 202,
          });
        }
        res.status(200).json({
          success: true,
          data: interviewSlots,
          message: "Successful",
          statusCode: 200,
        });
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
