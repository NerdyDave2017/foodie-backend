const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    firstname: { type: String },
    lastname: { type: String },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, require: true, default: "user" }, // one of "driver", "user", "merchant", "admin"
    favourites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
        // references the _id field in the items collection
      },
    ],
    customerAddress: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zipCode: { type: String },
    },
    restaurants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        // references the _id field in the restaurant collection
      },
    ],
    driver: {
      driverPhone: { type: String },
    },
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

const Users = mongoose.model("User", UserSchema);

class UserModel {
  constructor() {
    this.Users = Users;
  }

  create = async (userData) => {
    try {
      const newUser = await this.Users.create({
        ...userData,
      });

      return { user: newUser };
    } catch (error) {
      console.log(error);
    }
  };

  update = async (email, userData) => {
    try {
      const updatedUser = await this.Users.findOneAndUpdate(
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
      const validPassword = await this.Users.matchPassword(password);
      return { validPassword };
    } catch (error) {}
  };

  async findBy(data, field) {
    try {
      const user = await this.Users.find({ field: data }, { password: 0 }); //Don't return password
      return { user };
    } catch (error) {}
  }

  getAll = async () => {
    try {
      const users = await this.Users.find({}, { password: 0 }); //Don't return password
      return { users };
    } catch (error) {}
  };
}

module.exports = UserModel;
