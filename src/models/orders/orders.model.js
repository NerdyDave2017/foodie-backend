const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    }, // references the _id field in the users collection
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Drivers",
    }, // references the _id field in the drivers collection
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
    status: { type: String, required: true }, // one of "pending", "in_progress", "delivered"
    deliveryStartTime: { type: Date },
    deliveryEndTime: { type: Date },
  },
  {
    timestamps: true,
  }
);

const Orders = mongoose.model("Orders", OrderSchema);

module.exports = Orders;
