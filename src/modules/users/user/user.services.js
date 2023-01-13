const Users = require("../../../models/users/user/user.model");

class UserService {
  users;
  constructor() {
    this.users = Users;
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

  findUserById = async (id) => {
    try {
      const user = await this.user
        .findById(id, { password: 0 })
        .populate(["Drivers", "Restaurants"]);

      return user;
    } catch (error) {}
  };

  findUserByEmail = async (email) => {
    try {
      const user = await this.users
        .findOne({ email: email }, { password: 0 })
        .populate(["Drivers", "Restaurants"]);

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

  updateRole = async (id, role) => {
    try {
      const updatedUser = await this.users
        .findOneAndUpdate(
          { _id: id },
          { $push: { roles: role } },
          { password: 0 }, //Don't return password
          {
            new: true,
          }
        )
        .populate(["Drivers", "Restaurants"]);
      return updatedUser;
    } catch (error) {}
  };

  matchPassword = async (password) => {
    try {
      const validPassword = await this.users.matchPassword(password);

      return validPassword;
    } catch (error) {}
  };

  fetchAllUser = async () => {
    try {
      const users = await this.users.find({}, { password: 0 });
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
