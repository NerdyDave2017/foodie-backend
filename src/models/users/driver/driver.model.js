const mongoose = require("mongoose");
const DriverSchema = new mongoose.Schema(
  {
    driverPhone: { type: String, required: true, default: "" },
    carImage: { type: String, default: "" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // references the _id field in the user collection
    carModel: { type: String, default: "" },
    carPlateNo: { type: String, default: "" },
    isActive: { type: Boolean, default: false },
    location: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const Drivers = mongoose.model("Drivers", DriverSchema);

module.exports = Drivers;
