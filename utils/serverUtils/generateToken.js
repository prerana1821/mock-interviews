import jwt from "jsonwebtoken";

const jwtSecret = "gfkjcgbkjsbjfgkhbjcabb";

export const generateToken = (userId) => {
  return jwt.sign({ userId }, jwtSecret, { expiresIn: "24h" });
};
