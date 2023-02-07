const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    profileProfileURL: { type: String },
    role: [{ type: String, require: true, default: "customer" }], // one or more of "driver", "user", "merchant", "admin"
    settings: {
      newArrivals: { type: Boolean, default: false },
      orderUpdates: { type: Boolean, default: false },
      promotions: { type: Boolean, default: false },
      pushNewMessages: { type: Boolean, default: false },
    },
    shippingAddress: {
      address: { type: String },
      city: { type: String },
      apartmentSuite: { type: String },
      state: { type: String },
      country: { type: String },
      postalCode: { type: Number },
      location: {
        latitude: { type: Number },
        longitude: { type: Number },
      },
      line1: { type: Number },
      line2: { type: Number },
      email: { type: String },
    },
    walletAmount: { type: Number, default: 0 },
    authToken: { type: String },
    fcmToken: { type: String },
    active: { type: Boolean, default: true },
    appIdentifier: { type: String },
    stripeCustomer: { type: String },
    lastOnlineTimestamp: { type: Date },
    favourites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurants",
        // references the _id field in the items collection
      },
    ],

    restaurants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurants",
        // references the _id field in the restaurant collection
      },
    ],
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Drivers",
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

const Users = mongoose.model("Users", UserSchema);

module.exports = Users;
