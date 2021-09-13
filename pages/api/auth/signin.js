import dbConnect from "../../../middlewares/db.connect";
import runCors, { cors } from "../../../middlewares/cors";
import UserCredential from "../../../models/UserCredential";
import { generateToken } from "../../../utils";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  const { method } = req;
  const { username, password, email } = req.body;

  await dbConnect();
  await runCors(req, res, cors);

  switch (method) {
    case "POST":
      try {
        const user = await UserCredential.findOne({
          username: username,
        }).exec();
        if (!user) {
          const NewUser = new UserCredential({ username, password, email });
          const salt = await bcrypt.genSalt(10);
          NewUser.password = await bcrypt.hash(NewUser.password, salt);
          const savedUser = await NewUser.save();
          const token = generateToken(savedUser._id);
          return res.status(201).json({
            user: { _id: savedUser._id, token },
            success: true,
            message: "Sign Up Successful",
          });
        } else {
          return res
            .status(403)
            .json({ success: false, errorMessage: "User Already Exists" });
        }
      } catch (error) {
        res.status(400).json({
          success: false,
          errorMessage: "Error! Couldn't Sign In User",
        });
      }
      break;
    default:
      res.status(400).json({ success: false, errorMessage: "Invalid" });
      break;
  }
}
