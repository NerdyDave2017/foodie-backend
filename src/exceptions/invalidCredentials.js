const HttpException = require("./HttpExceptions.js");

class InvalidCredentialsException extends HttpException {
  constructor() {
    super(404, `Invalid Credentials`);
  }
}

module.exports = InvalidCredentialsException;
