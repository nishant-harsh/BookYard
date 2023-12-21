const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let errorMessage = err.message || "Internal Server Error";

  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    errorMessage = "Token has expired";
  } else if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    errorMessage = "Invalid token";
  }

  res.status(statusCode).json({ error: errorMessage });
};

module.exports = errorHandler;
