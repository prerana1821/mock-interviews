import runCors, { cors } from "../../../middlewares/cors";
import dbConnect from "../../../middlewares/db.connect";
import InterviewSlot from "../../../models/InterviewSlot";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();
  await runCors(req, res, cors);

  // slots: { $gte: new Date(new Date().setDate(new Date().getDate() - 1)) }

  switch (method) {
    case "GET":
      try {
        // mongoose query slots.slot based on yesterday's date
        // $and: [
        //   ...,
        //   {
        //     slots: {
        //       $elemMatch: {
        //         start: { $gte: params.start },
        //         end: { $lte: params.end },
        //       }
        //     }
        //   }
        // ]

        const interviewSlots = await InterviewSlot.find({
          // 'slots': {
          //   $elemMatch: {
          //     slot: { $gte: new Date(new Date().setDate(new Date().getDate() - 1)) },
          //     // end: { $lte: params.end },
          //   }
          //   // $gte: new Date(new Date().setDate(new Date().getDate() - 1))
          // }
        })
          .populate({
            path: "userId",
            select: "username fullName",
          })
          .populate({
            path: "slots.partner",
            select: "username fullName",
          })
          .exec();
        console.log(1, { slot: interviewSlots.slots });
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
