const Drivers = require("../../../models/users/driver/driver.model");

class DriverService {
  drivers;
  constructor() {
    this.drivers = Drivers;
  }

  createDriver = async (driverData) => {
    try {
      const newDriver = await this.drivers.create(driverData);
      return newDriver;
    } catch (error) {
      console.log(error);
    }
  };

  findDriverById = async (id) => {
    try {
      const driver = await this.drivers.findById(id);
      return driver;
    } catch (error) {}
  };

  findDriverByUser = async (userId) => {
    try {
      const driver = await this.drivers.findOne({ user: userId });
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

  deleteDriverById = async (id) => {
    try {
      const driver = await this.drivers.findByIdAndDelete(id);

      return driver;
    } catch (err) {}
  };
}

module.exports = DriverService;
