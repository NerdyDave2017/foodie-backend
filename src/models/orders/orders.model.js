const mongoose = require("monngoose");

const orderSchema = new mongoose.Schema(
  {
    _id: ObjectId(),
    user_id: ObjectId(), // references the _id field in the users collection
    items: [
      {
        item_id: ObjectId(), // references the _id field in the items collection
        quantity: { type: Number, require: true, default: 1 },
      },
    ],
    total_price: { type: Number, required: true },
    status: { type: String, required: true }, // one of "pending", "in_progress", "delivered"
  },
  {
    timestamps: true,
  }
);
