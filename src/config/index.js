const dotenv = require("dotenv");
// config() will read your .env file, parse the contents, assign it to process.env.
dotenv.config();

module.exports = {
  port: process.env.PORT,
  mongoDb: {
    mongoPass: process.env.MONGO_PASS,
    mongoUser: process.env.MONGO_USER,
  },
};
