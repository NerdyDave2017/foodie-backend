class UserService {
  constructor(UserModel) {
    this.UserModel = UserModel;
  }

  async signUp(userData) {
    try {
      const { email } = userData;
      const { userExist } = await UserModel.findBy(email, "email");

      if (userExist) {
        throw new Error(`User Already Exists`);
      }

      const { user } = await UserModel.create(userData);

      // Email verification dependency

      return { user };
    } catch (error) {}
  }

  async signIn(userData) {
    const { email, password } = userData;
    try {
      const { user } = await UserModel.findBy(email, "email");
      const validPassword = await UserModel.matchPassword(password);

      if (user && validPassword) {
        return { user };
      } else {
        throw new Error(`Invalid credentials`);
      }
    } catch (error) {}
  }

  async updateData(userData) {
    try {
      const { email, password, ...rest } = userData;
      if (password) {
        throw new Error(`Password cannot be updated`);
      }

      const { user } = await UserModel.findBy(email, "email");

      if (!user) {
        throw new Error(`User does not exist`);
      }

      const { updatedUser } = await UserModel.update(email, { ...rest });

      return { updatedUser };
    } catch (error) {}
  }

  async updatePassword(userData) {
    const { email, password, newPassword } = userData;
    try {
      const { user } = await UserModel.findBy(email, "email");

      if (!user) {
        throw new Error(`User does not exist`);
      }

      const validPassword = await UserModel.matchPassword(password);

      if (!validPassword) {
        throw new Error(`Invalid credentials`);
      }

      const { updatedUser } = await UserModel.update(email, {
        password: newPassword,
      });

      return { updatedUser };
    } catch (error) {}
  }

  async fetchAllUser() {
    const { users } = await this.UserModel.getAll();
    return { users };
  }
}

module.exports = UserService;
