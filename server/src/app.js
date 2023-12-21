const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require('dotenv').config();

const errorHandler = require("../middleware/errorHandlingMiddleware");

const authRoutes = require("../routes/authRoutes");
const bookRoutes = require("../routes/bookRoutes");
const userRoutes = require("../routes/userRoutes");

const app = express();

// CORS configuration for better security
const corsOptions = {
  origin: process.env.FRONTEND_BASE_URL || "http://localhost:5173", // replace with your frontend app URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true,
  optionsSuccessStatus: 204,
};

// Middleware
app.use(helmet());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/auth", authRoutes);
app.use("/book", bookRoutes);
app.use("/user", userRoutes);

// Error Handling Middleware
app.use(errorHandler);

module.exports = app;
