const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    _id: ObjectId(),
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
  Users = Users;

  async create(userData) {
    const { fullname, email, password, role, customerAddress } = userData;

    try {
      const newUser = new Users({
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

  async matchPassword(password) {
    try {
      const validPassword = await Users.matchPassword(password);
      return { validPassword };
    } catch (error) {}
  }

  async findBy(userData) {
    try {
      const user = await Users.findOne({ userData });
      return { user };
    } catch (error) {}
  }

  async getAll() {
    try {
      const users = await Users.find({});
      return { users };
    } catch (error) {}
  }
}

module.exports = UserModel;
