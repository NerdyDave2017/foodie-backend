const UserModel = require("../../../models/users/user/user.model");
const UserService = require("./user.services");

class UserController {
  constructor() {
    this.userService = new UserService(UserModel);
  }

  async create(req, res) {
    try {
      const { user } = await this.userService.create(req.body);
      return res.status(201).json({ user });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  async signIn(req, res) {
    try {
      const { user } = await this.userService.signIn(req.body);
      return res.status(200).json({ user });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  async updateData(req, res) {
    try {
      const { updatedUser } = await this.userService.updateData(req.body);
      return res.status(200).json({ updatedUser });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  async updatePassword(req, res) {
    try {
      const { updatedUser } = await this.userService.updatePassword(req.body);
      return res.status(200).json({ updatedUser });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  async fetchAllUsers(req, res) {
    try {
      const { users } = await this.userService.fetchAllUser();
      return res.status(200).json({ users });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
}

module.exports = UserController;
