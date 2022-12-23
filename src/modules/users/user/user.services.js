const UserModel = require("../../../models/users/user");

class UserService {
  async signUp(userData) {
    try {
      const emailExists = await UserModel.findBy(userData.email);

      if (emailExists) {
        throw new Error(`User Already Exists`);
      }

      const { user } = await UserModel.create(userData);

      return { user };
    } catch (error) {}
  }

  async signIn() {}
}

module.exports = UserService;
