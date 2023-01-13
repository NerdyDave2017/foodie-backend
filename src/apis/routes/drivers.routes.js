const DriverController = require("../../modules/users/driver/driver.controller");

const driverController = new DriverController();

const userRoutes = (app) => {
  app.post("/login", driverController.login);
  app.patch("/update", driverController.updateData);
  app.get("/", driverController.fetchAllDrivers);
};

module.exports = userRoutes;
