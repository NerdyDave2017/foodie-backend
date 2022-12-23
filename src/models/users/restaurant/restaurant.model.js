const mongoose = require("mongoose");
const RestaurantSchema = new mongoose.Schema(
  {
    _id: ObjectId(),
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    restaurantName: { type: String, required: true },
    restaurantPhone: {
      type: String,
      required: true,
    },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
        // references the _id field in the items collection
      },
    ],
    role: { type: String, require: true, default: "restaurant" }, // one of "driver", "user", "restaurant", "admin"
    restaurantAddress: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zipCode: { type: String },
    },
    dateCreated: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const Restaurants = mongoose.model("Restaurants", RestaurantSchema);

class RestaurantModel {
  Restaurant = Restaurants;

  create() {}

  signIn() {}

  findBy() {}

  getAll() {}
}

module.exports = RestaurantModel;
