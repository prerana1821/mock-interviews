import dbConnect from "../../../middlewares/db.connect";
import verifiedUser from "../../../middlewares/verifiedUser";
import UserCredential from "../../../models/UserCredential";

async function handler(req, res) {
  const {
    query: { userId },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const userDetails = await UserCredential.findById(userId);
        if (!userDetails) {
          return res
            .status(400)
            .json({ success: false, message: "User Details not found" });
        }
        res
          .status(200)
          .json({ success: true, data: userDetails, message: "Successful" });
      } catch (error) {
        res.status(400).json({ success: false, message: "Error" });
      }
      break;
    // case "POST" /* Edit a model by its ID */:
    //   try {
    //     const pet = await Pet.findByIdAndUpdate(id, req.body, {
    //       new: true,
    //       runValidators: true,
    //     });
    //     if (!pet) {
    //       return res.status(400).json({ success: false });
    //     }
    //     res.status(200).json({ success: true, data: pet });
    //   } catch (error) {
    //     res.status(400).json({ success: false });
    //   }
    //   break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}

export default verifiedUser(handler);
