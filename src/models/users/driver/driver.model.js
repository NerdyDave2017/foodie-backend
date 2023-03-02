const mongoose = require("mongoose");
const DriverSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true, default: "" },
    lastname: { type: String, required: true, default: "" },
    gender: { type: String, required: true, default: "" },
    dob: { type: String, required: true, default: "" },
    email: { type: String, required: true, default: "" },
    phone: { type: String, required: true, default: "" },
    vehicleImage: { type: String, default: "" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // references the _id field in the user collection
    vehicleModel: { type: String, default: "" },
    vehicleColor: { type: String, default: "" },
    vehicleName: { type: String, default: "" },
    vehiclePlateNo: { type: String, default: "" },
    isActive: { type: Boolean, default: false },
    location: {
      latitude: { type: Number, default: 0 },
      longitude: { type: Number, default: 0 },
    },
  },
  {
    timestamps: true,
  }
);

const Drivers = mongoose.model("Drivers", DriverSchema);

module.exports = Drivers;
