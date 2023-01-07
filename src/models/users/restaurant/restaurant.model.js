const mongoose = require("mongoose");
const RestaurantSchema = new mongoose.Schema(
  {
    restaurantName: { type: String },
    restaurantPhone: { type: String },
    Decription: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // references the _id field in the user collection
    categories: { type: String },
    services: [{ type: String }],
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
        // references the _id field in the items collection
      },
    ],
    restaurantAddress: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zipCode: { type: String },
    },
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

class RestaurantModel {
  constructor() {
    this.Restaurants = Restaurants;
  }

  create = async (userData) => {
    try {
      const newUser = new this.Restaurants({
        ...userData,
      });
      await newUser.save();
      return { user: newUser };
    } catch (error) {}
  };

  update = async (email, userData) => {
    try {
      const updatedUser = await this.Restaurants.findOneAndUpdate(
        { email: email },
        {
          ...userData,
        },
        { password: 0 }, //Don't return password
        {
          new: true,
        }
      );
      return { updatedUser };
    } catch (error) {}
  };

  matchPassword = async (password) => {
    try {
      const validPassword = await this.Restaurants.matchPassword(password);
      return { validPassword };
    } catch (error) {}
  };

  findByEmail = async (email) => {
    try {
      const user = await this.Restaurants.find(
        { email: email },
        { password: 0 }
      ); //Don't return password
      return { user };
    } catch (error) {}
  };

  getAll = async () => {
    try {
      const users = await this.Restaurants.find({}, { password: 0 }); //Don't return password
      return { users };
    } catch (error) {}
  };
}

module.exports = RestaurantModel;
