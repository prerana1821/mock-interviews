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
        // $elemMatch: {
        //   slot: { $gte: new Date(new Date().setDate(new Date().getDate() - 1)) },
        // }
        // db.employees.find({ "emp_age": { $exists: true, $gte: 30 } }).pretty()
        // db.employees.find({ $and: [{ "job_role": "Store Associate" }, { "emp_age": { $gte: 20, $lte: 30 } }] }).pretty()
        const interviewSlots = await InterviewSlot.find({
          // "slots.slot": { $gte: new Date(new Date().setDate(new Date().getDate() - 1)) },
          // "slots.partner": { $exists: false }
          $and: [{
            "slots.slot": { $gte: new Date(new Date().setDate(new Date().getDate() - 1)) },
          }, {
            "slots.partner": { $exists: false }
          }]
          // "slots.slot": {
          //   $gte: new Date(new Date().setDate(new Date().getDate() - 1)),
          // },
          // "slots.partner": {},
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

        // const newData = interviewSlots.reduce((acc, interviewSlot) => {
        //   return interviewSlot.slots.reduce((acc1, slot) => {
        //     return slot.slot >= new Date(new Date().setDate(new Date().getDate() - 1)) && !slot.partner ? {
        //       slots: { acc1, slot }, ...interviewSlot
        //     } : acc
        //   }, [])
        // }, [])
        // const newData = interviewSlots.map(interviewSlot => {
        //   return interviewSlot.slots.map(slot => {
        //     return slot.slot >= new Date(new Date().setDate(new Date().getDate() - 1)) && !slot.partner && { slots: [...slot], ...interviewSlot }
        //   })
        // })

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
