import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;

export const generateToken = (userId: string) => {
  return jwt.sign({ userId }, jwtSecret, { expiresIn: "24h" });
};
