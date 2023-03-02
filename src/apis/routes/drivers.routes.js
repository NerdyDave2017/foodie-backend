const Router = require("express").Router();
const DriverController = require("../../modules/users/driver/driver.controller");

const driverController = new DriverController();

// Router.post("/login", driverController.login);
Router.post("/create", driverController.createDriver);
Router.patch("/update/:id", driverController.updateData);
Router.delete("/delete/:driverId/:userId", driverController.deleteDriver);
Router.get("/", driverController.fetchAllDrivers);
Router.get("/:driverId", driverController.fetchDriverById);

module.exports = Router;
