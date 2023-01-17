function errorMiddleware(error, req, res, next) {
  if (res.headersSent) {
    return next(error);
  }
  const status = error.status || 500;
  const message = error.message || "Something went wrong";
  res.status(status).json({
    status: "error",
    message,
  });
}

module.exports = errorMiddleware;
