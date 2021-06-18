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
  const { username, password } = req.body;

  await dbConnect();

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
                // _id: user._doc._id,
                // email: user._doc.email,
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
        res.status(400).json({ success: false, message: "Error" });
      }
      break;
    default:
      res.status(400).json({ success: false, message: "Invalid" });
      break;
  }
}
