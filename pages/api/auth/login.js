import dbConnect from "../../../middlewares/db.connect";
import UserCredential from "../../../models/UserCredential";
import { generateToken } from "../../../utils";
import runCors, { cors } from "../../../middlewares/cors";

export default async function handler(req, res) {
  const { method } = req;
  const { email, fullName, uid } = req.body;

  await dbConnect();
  await runCors(req, res, cors);


  switch (method) {
    case "POST":
      try {
        const user = await UserCredential.findOne({
          email: email,
        }).exec();
        if (!user) {
          const NewUser = new UserCredential({ fullName, uid, email });
          const savedUser = await NewUser.save();
          const token = generateToken(savedUser._id);
          return res.status(201).json({
            data: { user: savedUser._doc, token },
            success: true,
            message: "Sign Up Successful",
          });
        } else {
          const token = generateToken(user._id);
          return res.status(200).json({
            data: {
              user: user._doc,
              token,
            },
            success: true,
            message: "Login Successful",
          });
        }
      } catch (error) {
        res
          .status(400)
          .json({ success: false, errorMessage: "Error! Couldn't sign in user" });
      }
      break;
    default:
      res.status(400).json({ success: false, errorMessage: "Invalid" });
      break;
  }
}
