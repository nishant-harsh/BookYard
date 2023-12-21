const express = require("express");
const { body } = require("express-validator");
const { validate } = require("../middleware/validationMiddleware");
const { register, login, refreshToken, getUser, logout } = require("../controllers/authenticationController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// User Registration
router.post(
  "/register",
  [
    body("name").notEmpty(),
    body("email").notEmpty().isEmail().normalizeEmail(),
    body("password").notEmpty().isLength({ min: 6 }),
  ],
  validate,
  register
);

// User Login
router.post(
  "/login",
  [
    body("email").notEmpty().isEmail().normalizeEmail(),
    body("password").notEmpty(),
  ],
  validate,
  login
);

// Get User
router.get("/user", authMiddleware, getUser)

// Refresh access token
router.get("/refresh_token", refreshToken);

// Logout
router.delete("/logout", authMiddleware, logout)

module.exports = router;
