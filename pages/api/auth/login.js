import dbConnect from "../../../middlewares/db.connect";
import UserCredential from "../../../models/UserCredential";
import { generateToken } from "../../../utils";
import runCors, { cors } from "../../../middlewares/cors";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  const { method } = req;
  const { username, password } = req.body;

  await dbConnect();
  await runCors(req, res, cors);

  switch (method) {
    case "POST":
      try {
        const user = await UserCredential.findOne({
          username: username,
        }).exec();
        if (user) {
          const validPassword = await bcrypt.compare(password, user.password);
          if (validPassword) {
            const token = generateToken(user._id);
            return res.status(200).json({
              data: {
                user: user._doc,
                token,
              },
              success: true,
              message: "Login Successful",
            });
          } else {
            return res.status(400).json({
              success: false,
              errorMessage: "Invalid Password. Enter correct password",
            });
          }
        }
        return res.status(401).json({
          success: false,
          errorMessage: "User not found. Check your user credentials",
        });
      } catch (error) {
        res
          .status(400)
          .json({ success: false, errorMessage: "Error! Couldn't login User" });
      }
      break;
    default:
      res.status(400).json({ success: false, errorMessage: "Invalid" });
      break;
  }
}
