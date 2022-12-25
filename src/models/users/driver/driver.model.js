const mongoose = require("mongoose");
const DriverSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    driverPhone: { type: String, required: true },
    role: { type: String, require: true, default: "driver" }, // one of "driver", "user", "merchant", "admin"
    driverAddress: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zipCode: { type: String },
    },
    isActive: { type: Boolean },
    location: { type: String },
    dateCreated: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const Drivers = mongoose.model("Drivers", DriverSchema);

class DriverModel {
  Drivers = Drivers;

  async create() {}

  async signIn() {}

  async findBy() {}

  async getAll() {}
}

module.exports = DriverModel;
