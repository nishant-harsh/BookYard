const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["Admin", "Member"], default: "Member" },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }

  next();
});

userSchema.methods.generateAuthToken = async function () {
  try {
    const user = this;
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    
    await user.save();

    return token;
  } catch (error) {
    console.error("Error generating auth token: ", error);
    throw error;
  }
};

userSchema.methods.generateRefreshToken = async function () {
  try {
    const user = this;
    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    user.tokens = user.tokens.concat({ token: refreshToken });
    await user.save();

    return refreshToken;
  } catch (error) {
    console.error("Error generating refresh token: ", error);
    throw error;
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
