const Router = require("express").Router();
const ItemController = require("../../modules/items/item.controller");

const itemController = new ItemController();

Router.get("/", itemController.getAllItems);
Router.post("/create", itemController.createItem);
Router.delete("/delete", itemController.deleteItem);
Router.patch("/update", itemController.updateItem);
Router.get("/restaurant/:restaurantId", itemController.getRestaurantItems);
Router.get("/:id", itemController.getItemById);

module.exports = Router;
