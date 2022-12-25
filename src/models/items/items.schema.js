const mongoose = require("monngoose");

const ItemSchema = new mongoose.Schema(
  {
    name: { type: String },
    price: { type: Number },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "restaurant",
    }, // references the _id field in the users collection for the merchant who added this item
  },
  {
    timestamps: true,
  }
);

const Items = mongoose.model("Items", ItemSchema);

module.exports = Items;
