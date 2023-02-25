const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    profileImageURL: { type: String },
    role: [{ type: String, required: true, default: "customer" }], // one or more of "driver", "user", "merchant", "admin"
    settings: {
      newArrivals: { type: Boolean, default: false },
      orderUpdates: { type: Boolean, default: false },
      promotions: { type: Boolean, default: false },
      pushNewMessages: { type: Boolean, default: false },
    },
    shippingAddress: {
      address: { type: String, default: "" },
      city: { type: String, default: "" },
      apartmentSuite: { type: String, default: "" },
      state: { type: String, default: "" },
      country: { type: String, default: "" },
      postalCode: { type: Number, default: null },
      location: {
        latitude: { type: Number, default: null },
        longitude: { type: Number, default: null },
      },
      line1: { type: Number, default: null },
      line2: { type: Number, default: null },
      email: { type: String, default: "" },
    },
    walletAmount: { type: Number, default: 0 },
    bankDetails: {
      accountName: { type: String, default: "" },
      accountNumber: { type: Number, default: null },
      bankName: { type: String, default: "" },
      branchName: { type: String, default: "" },
      otherInformation: { type: String, default: "" },
    },
    fcmToken: { type: String, default: "" },
    active: { type: Boolean, default: true },
    appIdentifier: { type: String, default: "" },
    stripeCustomer: { type: String, default: "" },
    lastOnlineTimestamp: { type: String, default: "" },
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
