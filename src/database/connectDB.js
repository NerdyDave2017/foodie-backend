const mongoose = require("mongoose");
require("dotenv").config();
const config = require("../config");
//  remember to replace with appropriate names
let username = config.mongoDb.mongoUser;
let password = config.mongoDb.mongoPass;

const MONGO_URI = `mongodb+srv://${username}:${password}@cluster0.tnwwg.mongodb.net/foodie?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    // mongodb connection string
    const con = await mongoose.connect(MONGO_URI);

    console.log(`MongoDB connected: ${con.connection.host}`);
  } catch (err) {
    console.log("Connection broken");
    console.log(err);
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
