import dbConnect from "../../../middlewares/db.connect";
import UserCredential from "../../../models/UserCredential";
import runCors, { cors } from "../../../middlewares/cors";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  const { method } = req;
  const { email, password } = req.body;

  await dbConnect();
  await runCors(req, res, cors);

  switch (method) {
    case "POST":
      try {
        const user = await UserCredential.findOne({
          email: email,
        }).exec();
        if (user) {
          console.log(user);
          //   const validPassword = await bcrypt.compare(password, user.password);
          //   if (validPassword) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(password, salt);
          const savedUser = await user.save();
          return res.status(200).json({
            success: true,
            message: "Password changed successfully, Login now",
          });
          //   } else {
          //     return res.status(400).json({
          //       success: false,
          //       errorMessage: "Invalid Password. Enter correct password",
          //     });
          //   }
        }
        return res.status(401).json({
          success: false,
          errorMessage: "Email does not exist, user not found!",
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          errorMessage: "Error! Couldn't Change Password",
        });
      }
      break;
    default:
      res.status(400).json({ success: false, errorMessage: "Invalid" });
      break;
  }
}
