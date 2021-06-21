const jwt = require("jsonwebtoken");
const jwtSecret = "gfkjcgbkjsbjfgkhbjcabb";

const verifiedUser = (handler) => {
  return async (req, res) => {
    const token = req.headers.authorization;
    try {
      const decoded = jwt.verify(token, jwtSecret);
      req.user = { userId: decoded.userId };
      return handler(req, res);
    } catch (error) {
      console.log(error);
      return res
        .status(401)
        .json({ errorMessage: "Unauthorised access, please add the token" });
    }
  };
};

export default verifiedUser;
