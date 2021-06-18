import dbConnect from "../../../middlewares/db.connect";
import InterviewSlot from "../../../models/InterviewSlot";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const interviewSlots = await InterviewSlot.find({})
          .populate({
            path: "userId",
            select: "username fullName",
          })
          .populate({
            path: "slots.partner",
            select: "username fullName",
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
      res.status(400).json({ success: false, message: "Invalid" });
      break;
  }
}

// const filleredSlots = interviewSlots.map((item) => {
//   console.log(item.slots);
//   return {
//     _id: item._id,
//     userId: item.userId,
//     slots: item.slots.map((val) => {
//       if ("partner" in val) {
//         return val;
//       }
//     }),
//   };
// });
