function errorMiddleware(error, req, res, next) {
  if (res.headersSent) {
    return next(error);
  }
  const status = error.status || 500;
  const message = error.message || "Something went wrong";

  if (process.env.NODE_ENV === "development") {
    console.log(error);
  }

  res.status(status).json({
    status: "error",
    message,
  });
}

module.exports = errorMiddleware;
