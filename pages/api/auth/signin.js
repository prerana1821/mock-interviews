import dbConnect from "../../../middlewares/db.connect";
import UserCredential from "../../../models/UserCredential";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const jwtSecret = "gfkjcgbkjsbjfgkhbjcabb";

const generateToken = (userId) => {
  return jwt.sign({ userId }, jwtSecret, { expiresIn: "24h" });
};

export default async function handler(req, res) {
  const { method } = req;
  const { username, password, email } = req.body;

  await dbConnect();

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
        res.status(400).json({ success: false, message: "Error" });
      }
      break;
    default:
      res.status(400).json({ success: false, message: "Invalid" });
      break;
  }
}
