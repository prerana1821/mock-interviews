import dbConnect from "../../../middlewares/db.connect";
import UserCredential from "../../../models/UserCredential";
import { generateToken } from "../../../utils";
import runCors, { cors } from "../../../middlewares/cors";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  const { method } = req;
  const { email, fullName, uid } = req.body;

  await dbConnect();
  await runCors(req, res, cors);

  console.log({ email, fullName, uid });

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
          // const validPassword = await bcrypt.compare(password, user.password);
          // if (validPassword) {
          //   const token = generateToken(user._id);
          //   return res.status(200).json({
          //     data: {
          //       user: user._doc,
          //       token,
          //     },
          //     success: true,
          //     message: "Login Successful",
          //   });
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
          // return res.status(400).json({
          //   success: false,
          //   errorMessage: "Invalid Password. Enter correct password",
          // });
        }
        //   return res.status(401).json({
        //   success: false,
        //   errorMessage: "User not found. Check your user credentials",
        // });
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
