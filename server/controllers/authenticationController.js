const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Get User
const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select([
      "-password",
      "-tokens",
    ]);
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// User Registration
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(403)
        .json({ error: "User already exists with this email." });
    }

    const newUser = new User({ name, email, password });

    await newUser.save();

    res.status(201).json({
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      _id: newUser._id,
    });
  } catch (error) {
    next(error);
  }
};

// User Login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const token = await user.generateAuthToken();
    const refreshToken = await user.generateRefreshToken();

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 604800000, // 1 week
    });

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 3600000, // 1 hour
    });

    res.status(200).json({
      name: user.name,
      email: user.email,
      role: user.role,
      _id: user._id,
    });
  } catch (error) {
    next(error);
  }
};

// Refresh token
const refreshToken = async (req, res, next) => {
  try {
    const { refresh_token } = req.cookies;

    if (!refresh_token) {
      return res.status(401).json({ error: "Refresh token is missing." });
    }

    const decoded = jwt.verify(refresh_token, process.env.JWT_REFRESH_SECRET);
    const user = await User.findOne({
      _id: decoded.userId,
      "tokens.token": refresh_token,
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid refresh token." });
    }

    const token = await user.generateAuthToken();

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 3600000, // 1 hour
    });

    res.status(200).send("Token refreshed!");
  } catch (error) {
    next(error);
  }
};

// Logout
const logout = async (req, res, next) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => token.token !== req.cookies.refresh_token);
    await req.user.save();
    res.clearCookie('refresh_token', {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    res.clearCookie('access_token', {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    next(error);
  }
};


module.exports = { getUser, register, login, logout, refreshToken };
