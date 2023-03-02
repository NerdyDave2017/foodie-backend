const DriverService = require("./driver.services");
const UserService = require("../user/user.services");
const UserNotFound = require("../../../exceptions/UserNotFound");
const InvalidCredentials = require("../../../exceptions/InvalidCredentials");
const HttpException = require("../../../exceptions/HttpExceptions");

class UserController {
  constructor() {
    this.driverService = new DriverService();
    this.userService = new UserService();
  }

  // login = async (req, res, next) => {
  //   const { userEmail, password } = req.body;
  //   try {
  //     const user = await this.userService.findUserByEmail(userEmail);
  //     if (!user) {
  //       throw next(new UserNotFound());
  //     }

  //     const isPasswordValid = await this.userService.comparePassword(password);
  //     if (!isPasswordValid) {
  //       throw next(new InvalidCredentials());
  //     }

  //     if (!user.driver) {
  //       const driver = await this.driverService.createDriver({
  //         owner: user._id,
  //       });
  //       /* Updating the role of the user to driver. */
  //       await this.userService.updateRole(user._id, "driver");
  //       /* Updating the user data with the driver id. */
  //       const user = await this.userService.updateData({
  //         driver: driver._id,
  //       });
  //       return res
  //         .status(200)
  //         .json({ status: "success", message: "New driver created", user });
  //     }

  //     return res
  //       .status(200)
  //       .json({ status: "success", message: "Driver login", user });
  //   } catch (error) {
  //     return res.status(400).json({ error });
  //   }
  // };

  createDriver = async (req, res, next) => {
    try {
      const driverData = req.body;
      const driver = await this.driverService.createDriver(driverData);
      /* Updating the role of the user to driver. */
      await this.userService.updateRole(driverData.userId, "driver");
      /* Updating the user data with the driver id. */
      await this.userService.updateData({
        driver: driver._id,
      });

      const data = {
        id: driver._id,
        userId: driver.userId,
        firstname: driver.firstname,
        lastname: driver.lastname,
        gender: driver.gender,
        dob: driver.dob,
        email: driver.email,
        phone: driver.phone,
        vehicleName: driver.vehicleName,
        vehicleModel: driver.vehicleModel,
        vehiclePlateNo: driver.vehiclePlateNo,
        vehicleColor: driver.vehicleColor,
        isActive: driver.isActive,
        location: driver.location,
      };

      return res
        .status(200)
        .json({ status: "success", message: "New driver created", data });
    } catch (err) {
      next(err);
    }
  };

  updateData = async (req, res, next) => {
    const { id } = req.params;
    try {
      const driver = await this.driverService.findDriverById(id);

      if (!driver) {
        throw next(new HttpException(404, "Driver not found"));
      }

      const updatedDriver = await this.driverService.findOneAndUpdate(req.body);

      const data = {
        id: updatedDriver._id,
        userId: updatedDriver.userId,
        firstname: updatedDriver.firstname,
        lastname: updatedDriver.lastname,
        gender: updatedDriver.gender,
        dob: updatedDriver.dob,
        email: updatedDriver.email,
        phone: updatedDriver.phone,
        vehicleName: updatedDriver.vehicleName,
        vehicleModel: updatedDriver.vehicleModel,
        vehiclePlateNo: updatedDriver.vehiclePlateNo,
        vehicleColor: updatedDriver.vehicleColor,
        isActive: updatedDriver.isActive,
        location: updatedDriver.location,
      };

      return res.status(200).json({
        status: "success",
        message: "Driver updated",
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  fetchDriverById = async (req, res, next) => {
    try {
      const { driverId } = req.params;

      const driverExist = this.driverService.findDriverById(driverId);

      if (!driverExist) {
        throw next(new HttpException(404, "Driver not found"));
      }

      const driver = this.driverService.findDriverById(driverId);

      const data = {
        id: driver._id,
        userId: driver.userId,
        firstname: driver.firstname,
        lastname: driver.lastname,
        gender: driver.gender,
        dob: driver.dob,
        email: driver.email,
        phone: driver.phone,
        vehicleName: driver.vehicleName,
        vehicleModel: driver.vehicleModel,
        vehiclePlateNo: driver.vehiclePlateNo,
        vehicleColor: driver.vehicleColor,
        isActive: driver.isActive,
        location: driver.location,
      };

      return res.status(200).json({
        status: "success",
        message: "Driver found",
        data,
      });
    } catch (err) {
      next(err);
    }
  };

  fetchAllDrivers = async (req, res, next) => {
    try {
      const drivers = await this.driverService.fetchAllRestaurants();

      const datas = drivers.map((driver) => {
        return {
          id: driver._id,
          userId: driver.userId,
          firstname: driver.firstname,
          lastname: driver.lastname,
          gender: driver.gender,
          dob: driver.dob,
          email: driver.email,
          phone: driver.phone,
          vehicleName: driver.vehicleName,
          vehicleModel: driver.vehicleModel,
          vehiclePlateNo: driver.vehiclePlateNo,
          vehicleColor: driver.vehicleColor,
          isActive: driver.isActive,
          location: driver.location,
        };
      });

      return res
        .status(200)
        .json({ status: "success", message: "All Drivers", datas });
    } catch (error) {
      next(error);
    }
  };

  deleteDriver = async (req, res, next) => {
    try {
      const { userId, driverId } = req.params;

      const userExists = this.userService.findUserById(userId);

      if (!userExists) {
        throw next(new UserNotFound());
      }

      const driverExist = this.driverService.findDriverById(driverId);

      if (!driverExist) {
        throw next(new HttpException(404, "Driver not found"));
      }

      await this.driverService.deleteDriverById(driverId);

      return res
        .status(200)
        .json({ status: "success", message: "Driver deleted" });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = UserController;
