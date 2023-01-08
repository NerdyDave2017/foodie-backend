const express = require("express");
const HttpException = require("../../exceptions/HttpExceptions");

function errorMiddleware(error, request, response, next) {
  const status = error.status || 500;
  const message = error.message || "Something went wrong";
  response.status(status).json({
    status: "error",
    message,
  });
}

module.exports = errorMiddleware;
