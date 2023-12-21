const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  try {
    let token = "";
    const tokenString = req.header("Cookie") || "";

    token = tokenString?.split(";")[1]?.split("=")[1];

    if (!token) {
      throw { statusCode: 401, message: "Authorization token missing" };
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: decoded.userId,
    });

    if (!user) {
      throw { statusCode: 401, message: "Invalid token or user not found" };
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    next(error);
  }
};

const checkAdminRole = (req, res, next) => {
  // Check user role for authorization
  if (req.user.role !== "Admin") {
    return res
      .status(403)
      .json({ message: "Unauthorized: Insufficient permissions." });
  }
  next();
};

module.exports = { authMiddleware, checkAdminRole };
