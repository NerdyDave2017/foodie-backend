const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    }, // references the _id field in the users collection (customer)
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurants",
      required: true,
    }, // references the _id field in the restaurants collection (merchant)
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Drivers",
      default: null,
    }, // references the _id field in the drivers collection (driver)
    trackingId: { type: toString, required: true },
    items: {
      type: Array,
      default: [],
      item: {
        itemId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Items",
        }, // references the _id field in the items collection
        quantity: { type: Number, require: true, default: 1 },
      },
      required: true,
    },
    orderType: { type: String, required: true, default: "delivery" }, // delivery or takeout
    totalPrice: { type: Number, required: true, default: null },
    status: { type: String, required: true, default: "pending" }, // one of "pending", "accepted", "rejected", "in_progress", "delivered"
    offerCoupon: { type: String, default: "" },
    discount: { type: Number, default: 0 },
    tipValue: { type: Number, default: 0 },
    adminCommission: { type: Number, default: null },
    adminCommissionType: { type: String, default: null },
    takeAway: { type: Boolean, default: false },
    deliveryAddress: {
      address: { type: String, default: "", required: true },
      city: { type: String, default: "", required: true },
      apartmentSuite: { type: String, default: "" },
      state: { type: String, default: "", required: true },
      country: { type: String, default: "", required: true },
      postalCode: { type: Number, default: null },
      location: {
        latitude: { type: Number, default: null },
        longitude: { type: Number, default: null },
      },
      line1: { type: Number, default: null },
      line2: { type: Number, default: null },
      email: { type: String, default: "" },
    },
    deliveryCharge: { type: Number, default: null },
    specialDiscount: { type: Array, default: [] },
    deliveryStartTime: { type: String, default: "", required: true },
    deliveryEndTime: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const Orders = mongoose.model("Orders", OrderSchema);

module.exports = Orders;
