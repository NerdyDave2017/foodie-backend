const mongoose = require("monngoose");

const orderSchema = new mongoose.Schema(
  {
    _id: ObjectId(),
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }, // references the _id field in the users collection
    driver_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
    }, // references the _id field in the drivers collection
    tracking_id: { type: Number, required: true },
    items: [
      {
        item_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "item",
        }, // references the _id field in the items collection
        quantity: { type: Number, require: true, default: 1 },
      },
    ],
    takeAway: { type: Boolean },
    totalPrice: { type: Number, required: true },
    status: { type: String, required: true }, // one of "pending", "in_progress", "delivered"
    deliveryStartTime: { type: Date },
    deliveryEndTime: { type: Date },
    dateCreated: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const Orders = mongoose.model("Orders", OrderSchema);

module.exports = Orders;
