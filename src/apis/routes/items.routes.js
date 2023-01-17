const Router = require("express").Router();
const ItemController = require("../../modules/items/item.controller");

const itemController = new ItemController();

Router.post("/create", itemController.createItem);
Router.delete("/delete", itemController.deleteItem);
Router.get("/restaurant/:restaurantId", itemController.getRestaurantItems);
Router.get("/:id", itemController.getItemById);
Router.get("/", itemController.getAllItems);

module.exports = Router;
