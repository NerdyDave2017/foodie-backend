const UserModel = require("../../../models/users/user");

class UserService {
  async signUp(userData) {
    try {
      const { userExist } = await UserModel.findBy(userData.email);

      if (userExist) {
        throw new Error(`User Already Exists`);
      }

      const { user } = await UserModel.create(userData);

      return { user };
    } catch (error) {}
  }

  async signIn(userData) {
    try {
      const { user } = await UserModel.findBy(userData.email);
      const validPassword = await UserModel.matchPassword(
        userData.matchPassword
      );

      if (user && validPassword) {
        return { user };
      } else {
        throw new Error(`Invalid credentials`);
      }
    } catch (error) {}
  }
}

module.exports = UserService;
