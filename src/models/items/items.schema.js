const mongoose = require("monngoose");

const orderSchema = new mongoose.Schema(
  {
    _id: ObjectId(),
    name: String,
    price: Number,
    merchant_id: ObjectId(), // references the _id field in the users collection for the merchant who added this item
  },
  {
    timestamps: true,
  }
);
