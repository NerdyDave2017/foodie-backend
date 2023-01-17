const Users = require("../../../models/users/user/user.model");

class UserService {
  users;
  constructor() {
    this.users = Users;
  }

  create = async (userData) => {
    try {
      const newUser = await this.users.create({
        ...userData,
      });
      return { user: newUser };
    } catch (error) {
      console.log(error);
    }
  };

  findUserById = async (id) => {
    try {
      const user = await this.users
        .findById(id, { password: 0 })
        .populate(["Drivers", "Restaurants"]);

      return user;
    } catch (error) {}
  };

  findUserByEmail = async (email) => {
    try {
      const user = await this.users.findOne({ email: email });
      // .populate(["Drivers", "Restaurants"]);

      return user;
    } catch (error) {}
  };

  updateData = async (email, userData) => {
    try {
      const updatedUser = await this.users
        .findOneAndUpdate(
          { email: email },
          {
            ...userData,
          },
          { password: 0 }, //Don't return password
          {
            new: true,
          }
        )
        .populate(["Drivers", "Restaurants"]);
      return updatedUser;
    } catch (error) {}
  };

  updateRestaurants = async (userId, restaurantId) => {
    try {
      const updatedUser = await this.users.findOneAndUpdate(
        { _id: userId },
        {
          $push: { restaurants: restaurantId },
        }
      );

      return updatedUser;
    } catch (error) {}
  };
  updateDriver = async (userId, driverId) => {
    try {
      const updatedUser = await this.users.findOneAndUpdate(
        { _id: userId },
        {
          $push: { driver: driverId },
        }
      );

      return updatedUser;
    } catch (error) {}
  };

  updateRole = async (id, role) => {
    try {
      const updatedUser = await this.users.findOneAndUpdate(
        { _id: id },
        { $push: { roles: role } },
        { password: 0 }, //Don't return password
        {
          new: true,
        }
      );

      return updatedUser;
    } catch (error) {}
  };

  matchPassword = async (password) => {
    try {
      // const validPassword = await this.users.matchPassword(password);
      console.log(await this.users.matchPassword(password), "log pass");
      const validPassword = await this.users.schema.methods.matchPassword(
        password
      );

      console.log(validPassword);

      return validPassword;
    } catch (error) {
      console.log(error);
    }
  };

  fetchAllUser = async () => {
    try {
      const users = await this.users
        .find({}, { password: 0 })
        .populate(["Drivers", "Restaurants"]);
      return users;
    } catch (error) {}
  };

  deleteUser = async (email) => {
    try {
      const deleteUser = await this.users.deleteOne({ email: email });
      return deleteUser;
    } catch (error) {}
  };
}

module.exports = UserService;
