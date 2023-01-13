const UserModel = require("../../../models/users/user/user.model");
const UserService = require("./user.services");
const UserNotFound = require("../../../exceptions/UserNotFound");
const InvalidCredentials = require("../../../exceptions/InvalidCredentials");
const HttpException = require("../../../exceptions/HttpExceptions");

class UserController {
  constructor() {
    this.userService = new UserService();
  }

  register = async (req, res, next) => {
    const { email } = req.body;
    try {
      const user = this.userService.findUserByEmail(email);

      if (!user) {
        throw next(new UserNotFound());
      }

      return res
        .status(201)
        .json({ status: "success", messsage: "User Created", user });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error });
    }
  };

  login = async (req, res, next) => {
    const { email } = req.body;
    try {
      const user = await this.userService.findUserByEmail(email);
      if (!user) {
        throw next(new UserNotFound());
      }

      const validPassword = await this.userService.matchPassword({
        password,
        newPassword,
      });

      if (!validPassword) {
        throw next(new InvalidCredentials());
      }

      return res
        .status(200)
        .json({ status: "success", message: "User signin", user });
    } catch (error) {
      return res.status(400).json({ error });
    }
  };

  updateData = async (req, res, next) => {
    const { email, ...rest } = req.body;
    try {
      const { user } = await this.userService.findUserByEmail(email);
      if (!user) {
        throw next(new UserNotFound());
      }
      const updatedUser = await this.userService.updateData(email, ...rest);
      return res
        .status(200)
        .json({ status: "success", message: "User updated", updatedUser });
    } catch (error) {
      return res.status(400).json({ error });
    }
  };

  updatePassword = async (req, res, next) => {
    const { email, password, newPassword } = req.user;
    try {
      const { user } = await this.userService.findUserByEmail(email);
      if (!user) {
        throw next(new UserNotFound());
      }
      const validPassword = await this.userService.matchPassword({
        password,
        newPassword,
      });

      if (!validPassword) {
        throw next(new InvalidCredentials());
      }
      const updatedUser = await this.userService.updatePassword(email, {
        password,
        newPassword,
      });
      return res
        .status(200)
        .json({ status: "success", message: "Password updated", updatedUser });
    } catch (error) {
      return res.status(400).json({ error });
    }
  };

  fetchAllUsers = async (req, res, next) => {
    try {
      const { users } = await this.userService.fetchAllUser();
      return res
        .status(200)
        .json({ status: "success", message: "All users", users });
    } catch (error) {
      return res.status(400).json({ error });
    }
  };

  deleteUser = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const { user } = await this.userService.findUserByEmail(email);
      if (!user) {
        throw next(new UserNotFound());
      }

      const validPassword = await this.userService.matchPassword(password);

      if (!validPassword) {
        throw next(new InvalidCredentials());
      }

      const deleteUser = await this.userService.deleteUser(email);
      return res
        .status(200)
        .json({ status: "success", message: "User deleted", deleteUser });
    } catch (error) {}
  };
}

module.exports = UserController;
