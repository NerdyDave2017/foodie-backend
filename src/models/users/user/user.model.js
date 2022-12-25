const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, require: true, default: "user" }, // one of "driver", "user", "merchant", "admin"
    customerAddress: {
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

const Users = mongoose.model("User", UserSchema);

class UserModel {
  constructor() {
    this.Users = Users;
  }

  async create(userData) {
    try {
      const newUser = new this.Users({
        ...userData,
      });
      await newUser.save();
      return { user: newUser };
    } catch (error) {}
  }

  async update(email, userData) {
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
  }

  async matchPassword(password) {
    try {
      const validPassword = await this.Users.matchPassword(password);
      return { validPassword };
    } catch (error) {}
  }

  async findBy(data, field) {
    try {
      const user = await this.Users.find({ field: data }, { password: 0 }); //Don't return password
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

module.exports = UserModel;
