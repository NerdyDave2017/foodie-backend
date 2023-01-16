class HttpException extends Error {
  status;
  message;
  constructor(status, message) {
    console.log("got to httpexception");
    super(message);
    this.status = status;
    this.message = message;
  }
}

module.exports = HttpException;
