const mongoose = require("monngoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }, // references the _id field in the users collection
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
    }, // references the _id field in the drivers collection
    trackingId: { type: Number, required: true },
    items: [
      {
        itemId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Item",
        }, // references the _id field in the items collection
        quantity: { type: Number, require: true, default: 1 },
      },
    ],
    takeAway: { type: Boolean },
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
