const Router = require("express").Router();
const ItemController = require("../../modules/items/item.controller");

const itemController = new ItemController();

Router.post("/create", itemController.createItem);
Router.get("/", itemController.getAllItems);
Router.get("/:id", itemController.getItemById);
Router.get("/restaurant/:id", itemController.getRestaurantItems);

module.exports = Router;
