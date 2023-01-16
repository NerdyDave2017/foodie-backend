const Router = require("express").Router();
const DriverController = require("../../modules/users/driver/driver.controller");

const driverController = new DriverController();

Router.post("/login", driverController.login);
Router.patch("/update", driverController.updateData);
Router.get("/", driverController.fetchAllDrivers);

module.exports = Router;
