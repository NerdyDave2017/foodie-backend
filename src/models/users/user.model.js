const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    _id: ObjectId(),
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, require: true, default: "user" }, // one of "driver", "user", "merchant", "admin"
    customerAddress: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zipCode: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
