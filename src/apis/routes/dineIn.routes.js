const Router = require("express").Router();
const DineInController = require("../../modules/dineIn/dineIn.controller");

const dineInController = new DineInController();

Router.get("/", dineInController.getAllDineIn);
Router.post("/create", dineInController.createDineIn);
Router.delete("/delete/:dineInId/:userId", dineInController.deleteDineIn);
Router.get("/restaurant/:restaurantId", dineInController.getRestaurantDineIn);
Router.get("/user/:userId", dineInController.getUserDineIn);
Router.get("/:id", dineInController.getDineInById);

module.exports = Router;
