const mongoose = require("mongoose");
const DriverSchema = new mongoose.Schema(
  {
    driverPhone: { type: String, required: true },
    carImage: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // references the _id field in the user collection
    carModel: { type: String },
    carPlateNo: { type: String },
    isActive: { type: Boolean },
    location: { type: String },
  },
  {
    timestamps: true,
  }
);

const Drivers = mongoose.model("Drivers", DriverSchema);

module.exports = DriverModel;
