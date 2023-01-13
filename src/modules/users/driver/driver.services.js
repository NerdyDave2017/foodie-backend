const Drivers = require("../../../models/users/driver/driver.model");

class DriverService {
  drivers;
  constructor() {
    this.drivers = Drivers;
  }

  createDriver = async (driverData) => {
    try {
      const newDriver = new this.drivers.create({
        ...driverData,
      });
      return newDriver;
    } catch (error) {}
  };

  findDriverById = async (id) => {
    try {
      const driver = await this.drivers.findById(id);
      return driver;
    } catch (error) {}
  };

  findOneAndUpdate = async (id, driverData) => {
    try {
      const driver = await this.drivers.findByIdAndUpdate(id, {
        driverData,
      });
      return driver;
    } catch (error) {}
  };

  fetchAllDrivers = async () => {
    try {
      const drivers = await this.drivers.find({});
      return drivers;
    } catch (error) {}
  };
}

module.exports = DriverService;
