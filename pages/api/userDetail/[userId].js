import dbConnect from "../../../middlewares/db.connect";
import verifiedUser from "../../../middlewares/verifiedUser";
import UserCredential from "../../../models/UserCredential";
import { extend } from "lodash";

async function handler(req, res) {
  const {
    query: { userId },
    method,
  } = req;
  const { fullName, portfolio, interviewDone } = req.body;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const userDetails = await UserCredential.findById(userId);
        if (!userDetails) {
          return res
            .status(400)
            .json({ success: false, errorMessage: "User Details not found" });
        }
        res
          .status(200)
          .json({ success: true, data: userDetails, message: "Successful" });
      } catch (error) {
        res.status(400).json({ success: false, errorMessage: "Error" });
      }
      break;
    case "POST":
      try {
        const userDetails = await UserCredential.findById(userId);
        if (!userDetails) {
          return res
            .status(400)
            .json({ success: false, message: "User Details not found" });
        }
        const updatedUserDetails = extend(userDetails, {
          fullName,
          portfolio,
          interviewDone,
        });
        const userDetailsFromDB = await userDetails.save();
        res.status(200).json({
          success: true,
          data: userDetailsFromDB,
          message: "Successful",
        });
      } catch (error) {
        res.status(400).json({ success: false, errorMessage: "Error" });
      }
      break;
    default:
      res.status(400).json({ success: false, errorMessage: "Invalid" });
      break;
  }
}

export default verifiedUser(handler);
