const UserModel = require("../../../models/users/user/user.model");
const UserService = require("./user.services");
const UserNotFound = require("../../../exceptions/UserNotFound");

class UserController {
  constructor() {
    this.userService = new UserService();
  }

  register = async (req, res) => {
    const { email } = req.body;
    try {
      const user = this.userService.findUserByEmail(email);

      if (!user) {
        throw new UserNotFound();
      }

      return res
        .status(201)
        .json({ status: "success", messsage: "User Created", user });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error });
    }
  };

  signIn = async (req, res) => {
    const { email } = req.body;
    try {
      const { user } = await this.userService.findUserByEmail(email);
      if (!user) {
        throw new UserNotFound();
      }
      return res
        .status(200)
        .json({ status: "success", message: "User signin", user });
    } catch (error) {
      return res.status(400).json({ error });
    }
  };

  updateData = async (req, res) => {
    try {
      const { updatedUser } = await this.userService.updateData(req.body);
      return res.status(200).json({ updatedUser });
    } catch (error) {
      return res.status(400).json({ error });
    }
  };

  updatePassword = async (req, res) => {
    try {
      const { updatedUser } = await this.userService.updatePassword(req.body);
      return res.status(200).json({ updatedUser });
    } catch (error) {
      return res.status(400).json({ error });
    }
  };

  fetchAllUsers = async (req, res) => {
    try {
      console.log("controller fetch");
      const { users } = await this.userService.fetchAllUser();
      return res.status(200).json({ users });
    } catch (error) {
      return res.status(400).json({ error });
    }
  };
}

module.exports = UserController;
