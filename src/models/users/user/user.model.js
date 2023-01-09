const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    profileImage: { type: String },
    role: [{ type: String, require: true, default: "user" }], // one or more of "driver", "user", "merchant", "admin"
    settings: {
      allowPushNotifications: { type: Boolean },
      orderUpdates: { type: Boolean },
      promotions: { type: Boolean },
    },
    favourites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurants",
        // references the _id field in the items collection
      },
    ],
    customerAddress: {
      address: { type: String },
      city: { type: String },
      apartmentSuite: { type: String },
      state: { type: String },
      country: { type: String },
      zipCode: { type: String },
    },
    restaurants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        // references the _id field in the restaurant collection
      },
    ],
    driver: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Users = mongoose.model("User", UserSchema);

module.exports = Users;
