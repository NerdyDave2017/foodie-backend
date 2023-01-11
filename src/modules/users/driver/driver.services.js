const Drivers = require("../../../models/users/driver/driver.model");

class DriverService {
  drivers;
  constructor() {
    this.drivers = Drivers;
  }

  findDriverById = async (id) => {
    try {
      const restaurant = await this.drivers.findById(id);
      return restaurant;
    } catch (error) {}
  };

  findOneAndUpdate = async (id, driverData) => {
    try {
      const restaurant = await this.drivers.findByIdAndUpdate(id, {
        driverData,
      });
      return restaurant;
    } catch (error) {}
  };

  fetchAllDrivers = async () => {
    const { restaurants } = await this.drivers.find({});
    return restaurants;
  };
}

module.exports = DriverService;
