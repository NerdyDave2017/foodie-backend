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

      const authToken = generateToken(newUser._id);

      data = {
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
        profileProfileURL: { type: String },
        role: [{ type: String, require: true, default: "customer" }], // one or more of "driver", "user", "merchant", "admin"
        settings: {
          newArrivals: { type: Boolean, default: false },
          orderUpdates: { type: Boolean, default: false },
          promotions: { type: Boolean, default: false },
          pushNewMessages: { type: Boolean, default: false },
        },
        shippingAddress: {
          address: { type: String },
          city: { type: String },
          apartmentSuite: { type: String },
          state: { type: String },
          country: { type: String },
          postalCode: { type: Number },
          location: {
            latitude: { type: Number },
            longitude: { type: Number },
          },
          line1: { type: Number },
          line2: { type: Number },
          email: { type: String },
        },
        walletAmount: { type: Number, default: 0 },
        bankDetails: {
          accountName: { type: String },
          accountNumber: { type: Number },
          bankName: { type: String },
          branchName: { type: String },
          otherInformation: { type: String },
        },
        fcmToken: { type: String },
        active: { type: Boolean, default: true },
        appIdentifier: { type: String },
        stripeCustomer: { type: String },
        lastOnlineTimestamp: { type: Date },
        favourites: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Restaurants",
            // references the _id field in the items collection
          },
        ],

        restaurants: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Restaurants",
            // references the _id field in the restaurant collection
          },
        ],
        driver: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Drivers",
        },
      };

      return res.status(201).json({
        status: "success",
        messsage: "User Created",
        newUser,
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

      // console.log(validPassword);

      if (!validPassword) {
        throw next(new InvalidCredentials());
      }

      const authToken = generateToken(user._id);

      return res
        .status(200)
        .json({ status: "success", message: "User signin", user, authToken });
    } catch (error) {
      next(error);
    }
  };

  updateData = async (req, res, next) => {
    const { id, ...rest } = req.body;
    try {
      const user = await this.userService.findUserById(id);
      if (!user) {
        throw next(new UserNotFound());
      }

      const updatedUser = await this.userService.updateData(id, { ...rest });
      return res
        .status(200)
        .json({ status: "success", message: "User updated", updatedUser });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  updatePassword = async (req, res, next) => {
    const { email, id, password, newPassword } = req.body;
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
      return res
        .status(200)
        .json({ status: "success", message: "Password updated", updatedUser });
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
      return res
        .status(200)
        .json({ status: "success", message: "All users", users });
    } catch (error) {
      next(error);
    }
  };

  updateBankDetails = async (req, res, next) => {
    const { id } = req.params;
    const bankDetails = req.body;
    try {
      const user = await this.userService.findUserById(id);
      if (!user) {
        throw next(new UserNotFound());
      }
      const updatedUser = await this.userService.updateData(id, {
        ...rest,
      });

      const bankDetails = ({
        accountName,
        accountNumber,
        bankName,
        branchName,
        otherInformation,
      } = updatedUser.bankDetails);

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
    const { id } = req.params;
    try {
      const user = await this.userService.findUserById(id);
      if (!user) {
        throw next(new UserNotFound());
      }
      const {
        accountName,
        accountNumber,
        bankName,
        branchName,
        otherInformation,
      } = user.bankDetails;

      const bankDetails = {
        accountName,
        accountNumber,
        bankName,
        branchName,
        otherInformation,
      };

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
    const { email, password } = req.body;
    try {
      const user = await this.userService.findUserById(id);
      if (!user) {
        throw next(new UserNotFound());
      }

      const validPassword = await matchPassword(password, user.password);

      if (!validPassword) {
        throw next(new InvalidCredentials());
      }

      const deleteUser = await this.userService.deleteUser(email);
      return res
        .status(200)
        .json({ status: "success", message: "User deleted", deleteUser });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = UserController;
