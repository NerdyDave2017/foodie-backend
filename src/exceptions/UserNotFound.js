const HttpException = require("./HttpExceptions.js");

class UserNotFound extends HttpException {
  constructor() {
    super(404, `User Not Found`);
  }
}

module.exports = UserNotFound;
