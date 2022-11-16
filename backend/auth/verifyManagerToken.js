const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyManagerToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log(authHeader);
  if (!authHeader) {
    return res.status(403).json({message: "Token not found"})
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(500)
        .json({ err, message: "Failed to authenticate token" });
    } else {
      res
        .status(200)
        .json({ message: "Token is valid", username: decoded.username });
      req.username = decoded.username;
      next();
    }
  });
};

module.exports = verifyManagerToken;
