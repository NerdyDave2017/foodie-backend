const HttpException = require("./HttpExceptions.js");

class InvalidCredentials extends HttpException {
  constructor() {
    super(404, `Invalid Credentials`);
  }
}

module.exports = InvalidCredentials;
