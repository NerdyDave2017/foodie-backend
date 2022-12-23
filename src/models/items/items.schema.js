const mongoose = require("monngoose");

const ItemSchema = new mongoose.Schema(
  {
    _id: ObjectId(),
    name: { type: String },
    price: { type: Number },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "restaurant",
    }, // references the _id field in the users collection for the merchant who added this item
    dateCreated: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const Items = mongoose.model("Items", ItemSchema);

module.exports = Items;
