import express from "express";

const app = express();
import dotenv from "dotenv";
import bodyparser from "body-parser";
import connectDB from "./database/connectDB";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorMiddleware from "./apis/middlewares/error.middleware";
import HttpException from "./exceptions/HttpExceptions";

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
