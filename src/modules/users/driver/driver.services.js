const Drivers = require("../../../models/users/driver/driver.model");

class DriverService {
  drivers;
  constructor() {
    this.drivers = Drivers;
  }

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
    const drivers = await this.drivers.find({});
    return drivers;
  };
}

module.exports = DriverService;
