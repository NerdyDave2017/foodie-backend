const mongoose = require("mongoose");
const RestaurantSchema = new mongoose.Schema(
  {
    restaurantName: { type: String },
    restaurantPhone: { type: String },
    Decription: { type: String },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "Users" }, // references the _id field in the user collection
    restaurantImage: { type: String },
    categories: {
      type: String,
      enum: {
        values: [
          "Potes de Sorvetes",
          "Multon FR",
          "Wine Beer",
          "high carb",
          "wine Shop",
          "beauty",
          "veg Pizza",
          "hair spa",
          "Coffee",
          "Sushi",
          "Ramen",
          "Bar Food",
          "Japanese",
          "New Mexican",
          "Sandwiches",
          "Mediterrenean",
        ],
        message: "{VALUE} is not supported",
      },
    },
    services: [{ type: String }],
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
        // references the _id field in the items collection
      },
    ],
    restaurantAddress: {
      address: { type: String },
      city: { type: String },
      apartmentSuite: { type: String },
      state: { type: String },
      country: { type: String },
      zipCode: { type: String },
    },
    deliverySetting: { type: Boolean },
    delivery: {
      chargePerKm: { type: Number },
      minDeliveryCharge: { type: Number },
    },
  },
  {
    timestamps: true,
  }
);

RestaurantSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

RestaurantSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Restaurants = mongoose.model("Restaurants", RestaurantSchema);
module.exports = Restaurants;
