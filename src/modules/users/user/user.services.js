const UserModel = require("../../../models/users/user/user.model");

class UserService {
  constructor() {
    this.userModel = new UserModel();
  }

  signUp = async (userData) => {
    console.log("user services signUp");
    console.log(this.userModel);

    try {
      const { email } = userData;
      console.log(email);

      const { userExist } = await this.userModel.findBy(email, "email");

      console.log(userExist);

      if (userExist) {
        throw new Error(`User Already Exists`);
      }

      const { user } = await this.userModel.create(userData);

      // Email verification dependency

      return { user };
    } catch (error) {}
  };

  signIn = async (userData) => {
    const { email, password } = userData;
    try {
      const { user } = await this.userModel.findBy(email, "email");
      const validPassword = await this.userModel.matchPassword(password);

      if (user && validPassword) {
        return { user };
      } else {
        throw new Error(`Invalid credentials`);
      }
    } catch (error) {}
  };

  updateData = async (userData) => {
    try {
      const { email, password, ...rest } = userData;
      if (password) {
        throw new Error(`Password cannot be updated`);
      }

      const { user } = await this.userModel.findBy(email, "email");

      if (!user) {
        throw new Error(`User does not exist`);
      }

      const { updatedUser } = await this.userModel.update(email, { ...rest });

      return { updatedUser };
    } catch (error) {}
  };

  updatePassword = async (userData) => {
    const { email, password, newPassword } = userData;
    try {
      const { user } = await this.userModel.findBy(email, "email");

      if (!user) {
        throw new Error(`User does not exist`);
      }

      const validPassword = await this.userModel.matchPassword(password);

      if (!validPassword) {
        throw new Error(`Invalid credentials`);
      }

      const { updatedUser } = await this.userModel.update(email, {
        password: newPassword,
      });

      return { updatedUser };
    } catch (error) {}
  };

  fetchAllUser = async () => {
    const { users } = await this.userModel.getAll();
    return { users };
  };
}

module.exports = UserService;
