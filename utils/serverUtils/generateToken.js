import jwt from "jsonwebtoken";

const jwtSecret = process.env.jwtSecret;

export const generateToken = (userId) => {
  return jwt.sign({ userId }, jwtSecret, { expiresIn: "24h" });
};
