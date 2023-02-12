const express = require("express");

const app = express();
const dotenv = require("dotenv");
const bodyparser = require("body-parser");
const connectDB = require("./database/connectDB");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./apis/middlewares/error.middleware");
const HttpException = require("./exceptions/HttpExceptions");

dotenv.config();

var whitelist = ["*"];
var corsOptions = {
  origin: whitelist,
  credentials: true,
};

app.use(cors(corsOptions));
app.set("trust proxy", 1); // trust first proxy

//Parse Request to body-parser
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(express.json());
// app.use(express.urlencoded());
app.use(express.static("public"));
app.use(cookieParser());

// mongoDB connection
connectDB();

// Load Routers
app.use("/api/v1", require("./apis/routes/index.routes"));
app.use(errorMiddleware);

module.exports = app;
