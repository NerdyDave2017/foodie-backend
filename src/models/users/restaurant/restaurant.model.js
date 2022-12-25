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

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Restaurants = mongoose.model("Restaurants", RestaurantSchema);

class RestaurantModel {
  constructor() {
    this.Users = Users;
  }

  async create(userData) {
    const { fullname, email, password, role, customerAddress } = userData;

    try {
      const newUser = new this.Users({
        fullname,
        email,
        password,
        role,
        customerAddress,
      });
      await newUser.save();
      return { user: newUser };
    } catch (error) {}
  }

  async update(userData) {
    const { email } = userData;
    try {
      const updatedUser = await this.Users.findOneAndUpdate(
        { email },
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
  }

  async matchPassword(password) {
    try {
      const validPassword = await this.Users.matchPassword(password);
      return { validPassword };
    } catch (error) {}
  }

  async findBy(userData) {
    try {
      const user = await this.Users.findOne({ userData }, { password: 0 }); //Don't return password
      return { user };
    } catch (error) {}
  }

  async getAll() {
    try {
      const users = await this.Users.find({}, { password: 0 }); //Don't return password
      return { users };
    } catch (error) {}
  }
}

module.exports = RestaurantModel;
