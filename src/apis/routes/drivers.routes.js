const Router = require("express").Router();
const DriverController = require("../../modules/users/driver/driver.controller");

const driverController = new DriverController();

// Router.post("/login", driverController.login);
Router.create("/create", driverController.createDriver);
Router.patch("/update/:id", driverController.updateData);
Router.delete("/delete/:driverId/:userId", driverController.deleteDriver);
Router.get("/", driverController.fetchAllDrivers);

module.exports = Router;
