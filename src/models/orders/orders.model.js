const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    }, // references the _id field in the users collection (customer)
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurants",
    }, // references the _id field in the restaurants collection (merchant)
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Drivers",
    }, // references the _id field in the drivers collection (driver)
    trackingId: { type: Number, required: true },
    items: [
      {
        itemId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Items",
        }, // references the _id field in the items collection
        quantity: { type: Number, require: true, default: 1 },
      },
    ],
    orderType: { type: String, required: true }, // delivery or takeout
    totalPrice: { type: Number, required: true },
    status: { type: String, required: true }, // one of "pending", "accepted", "rejected", "in_progress", "delivered"
    offerCoupon: { type: String },
    discount: { type: Number },
    tipValue: { type: Number },
    adminCommission: { type: Number },
    adminCommissionType: { type: String },
    takeAway: { type: Boolean },
    deliveryAddress: {
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
    deliveryCharge: { type: Number },
    specialDiscount: { type: Array },
    deliveryStartTime: { type: Date },
    deliveryEndTime: { type: Date },
  },
  {
    timestamps: true,
  }
);

const Orders = mongoose.model("Orders", OrderSchema);

module.exports = Orders;
