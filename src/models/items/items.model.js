const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema(
  {
    name: { type: String },
    description: { type: String },
    category: { type: String },
    price: { type: Number },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurants",
    }, // references the _id field in the users collection for the merchant who added this item
  },
  {
    timestamps: true,
  }
);

const Items = mongoose.model("Items", ItemSchema);

module.exports = Items;
