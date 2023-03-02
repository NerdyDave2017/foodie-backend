const UserModel = require("../../../models/users/user/user.model");
const UserService = require("./user.services");
const UserNotFound = require("../../../exceptions/UserNotFound");
const InvalidCredentials = require("../../../exceptions/InvalidCredentials");
const HttpException = require("../../../exceptions/HttpExceptions");
const matchPassword = require("../../../utils/matchPassword");
const generateToken = require("../../../utils/generateToken");

class UserController {
  constructor() {
    this.userService = new UserService();
  }

  register = async (req, res, next) => {
    const { email } = req.body;
    try {
      const user = await this.userService.findUserByEmail(email);

      if (user) {
        throw next(new HttpException(401, "User already exists"));
      }

      const newUser = await this.userService.create(req.body);

      console.log(newUser);

      const authToken = generateToken(newUser._id);

      console.log(authToken);

      const data = {
        id: newUser._id,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
        profileImageURL: newUser.profileImageURL,
        settings: newUser.settings,
        shippingAddress: newUser.shippingAddress,
        walletAmount: newUser.walletAmount,
        bankDetails: newUser.bankDetails,
        fcmToken: newUser.fcmToken,
        active: newUser.active,
        appIdentifier: newUser.appIdentifier,
        stripeCustomer: newUser.stripeCustomer,
        lastOnlineTimestamp: newUser.lastOnlineTimestamp,
        favourites: newUser.favourites,
        restaurants: newUser.restaurants,
        driver: newUser.driver,
      };

      console.log(data);

      return res.status(201).json({
        status: "success",
        messsage: "User Created",
        data,
        authToken,
      });
    } catch (error) {
      next(error);
    }
  };

  login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
      const user = await this.userService.findUserByEmail(email);

      if (!user) {
        throw next(new UserNotFound());
      }

      const validPassword = await matchPassword(password, user.password);

      // (validPassword);

      if (!validPassword) {
        throw next(new InvalidCredentials());
      }

      const authToken = generateToken(user._id);

      const data = {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        profileImageURL: user.profileImageURL,
        settings: { ...user.settings },
        shippingAddress: { ...user.shippingAddress },
        walletAmount: user.walletAmount,
        bankDetails: { ...user.bankDetails },
        fcmToken: user.fcmToken,
        active: user.active,
        appIdentifier: user.appIdentifier,
        stripeCustomer: user.stripeCustomer,
        lastOnlineTimestamp: user.lastOnlineTimestamp,
        favourites: user.favourites,
        restaurants: user.restaurants,
        driver: user.driver,
      };

      return res.status(200).json({
        status: "success",
        message: "User login successful",
        data,
        authToken,
      });
    } catch (error) {
      next(error);
    }
  };

  updateData = async (req, res, next) => {
    const { id } = req.params;
    const userData = req.body;
    try {
      const user = await this.userService.findUserById(id);
      if (!user) {
        throw next(new UserNotFound());
      }

      const updatedUser = await this.userService.updateData(id, userData);

      const data = {
        id: user._id,
        firstname: updatedUser.firstname,
        lastname: updatedUser.lastname,
        email: updatedUser.email,
        phoneNumber: updatedUser.phoneNumber,
        profileImageURL: updatedUser.profileImageURL,
        settings: updatedUser.settings,
        shippingAddress: updatedUser.shippingAddress,
        walletAmount: updatedUser.walletAmount,
        bankDetails: updatedUser.bankDetails,
        fcmToken: updatedUser.fcmToken,
        active: updatedUser.active,
        appIdentifier: updatedUser.appIdentifier,
        stripeCustomer: updatedUser.stripeCustomer,
        lastOnlineTimestamp: updatedUser.lastOnlineTimestamp,
        favourites: updatedUser.favourites,
        restaurants: updatedUser.restaurants,
        driver: updatedUser.driver,
      };

      return res
        .status(200)
        .json({ status: "success", message: "User updated", data });
    } catch (error) {
      error;
      next(error);
    }
  };

  updatePassword = async (req, res, next) => {
    const { id } = req.params;
    const { password, newPassword } = req.body;
    try {
      const user = await this.userService.findUserById(id);
      if (!user) {
        throw next(new UserNotFound());
      }
      const validPassword = await matchPassword(password, user.password);

      if (!validPassword) {
        throw next(new InvalidCredentials());
      }
      const updatedUser = await this.userService.updateData(id, {
        password: newPassword,
      });

      const data = {
        id: user._id,
        firstname: updatedUser.firstname,
        lastname: updatedUser.lastname,
        email: updatedUser.email,
        phoneNumber: updatedUser.phoneNumber,
        profileImageURL: updatedUser.profileImageURL,
        settings: updatedUser.settings,
        shippingAddress: updatedUser.shippingAddress,
        walletAmount: updatedUser.walletAmount,
        bankDetails: updatedUser.bankDetails,
        fcmToken: updatedUser.fcmToken,
        active: updatedUser.active,
        appIdentifier: updatedUser.appIdentifier,
        stripeCustomer: updatedUser.stripeCustomer,
        lastOnlineTimestamp: updatedUser.lastOnlineTimestamp,
        favourites: updatedUser.favourites,
        restaurants: updatedUser.restaurants,
        driver: updatedUser.driver,
      };

      return res
        .status(200)
        .json({ status: "success", message: "Password updated", data });
    } catch (error) {
      next(error);
    }
  };

  /**
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   * @dev This method is not finished yet
   * @todo Fix this method
   */

  forgotPassword = async (req, res, next) => {
    const { id } = req.body;
    try {
      const user = await this.userService.findUserById(id);
      if (!user) {
        throw next(new UserNotFound());
      }
      /**
       * @todo generate new password for user
       */
      return res
        .status(200)
        .json({ status: "success", message: "Password updated", updatedUser });
    } catch (error) {
      next(error);
    }
  };

  fetchAllUsers = async (req, res, next) => {
    try {
      const users = await this.userService.fetchAllUser();

      const datas = users.map((user) => {
        return {
          id: user._id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          phoneNumber: user.phoneNumber,
          profileImageURL: user.profileImageURL,
          settings: user.settings,
          shippingAddress: user.shippingAddress,
          walletAmount: user.walletAmount,
          bankDetails: user.bankDetails,
          fcmToken: user.fcmToken,
          active: user.active,
          appIdentifier: user.appIdentifier,
          stripeCustomer: user.stripeCustomer,
          lastOnlineTimestamp: user.lastOnlineTimestamp,
          favourites: user.favourites,
          restaurants: user.restaurants,
          driver: user.driver,
        };
      });

      return res
        .status(200)
        .json({ status: "success", message: "All users", datas });
    } catch (error) {
      next(error);
    }
  };

  updateBankDetails = async (req, res, next) => {
    const { userId } = req.params;
    const bankData = req.body;
    try {
      const user = await this.userService.findUserById(userId);
      if (!user) {
        throw next(new UserNotFound());
      }
      const updatedUser = await this.userService.updateData(userId, bankData);

      const bankDetails = updatedUser.bankDetails;

      return res.status(200).json({
        status: "success",
        message: "Bank details updated",
        bankDetails,
      });
    } catch (error) {
      next(error);
    }
  };

  getBankDetails = async (req, res, next) => {
    const { userId } = req.params;
    try {
      const user = await this.userService.findUserById(userId);
      if (!user) {
        throw next(new UserNotFound());
      }

      const bankDetails = user.bankDetails;

      return res.status(200).json({
        status: "success",
        message: "Bank details added",
        bankDetails,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteUser = async (req, res, next) => {
    const { id } = req.params;
    try {
      const user = await this.userService.findUserById(id);
      if (!user) {
        throw next(new UserNotFound());
      }

      // const validPassword = await matchPassword(password, user.password);

      // if (!validPassword) {
      //   throw next(new InvalidCredentials());
      // }

      await this.userService.deleteUser(id);
      return res
        .status(200)
        .json({ status: "success", message: "User deleted" });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = UserController;
