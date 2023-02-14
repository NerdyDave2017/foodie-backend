const Router = require("express").Router();
const OrderController = require("../../modules/orders/orders.controller");

const orderController = new OrderController();

Router.get("/", orderController.getOrders);
Router.post("/create", orderController.createOrder);
Router.get("/user/:userId", orderController.getOrderByUserId);
Router.delete("/delete/:id", orderController.deleteOrderById);
Router.get("/:id", orderController.getOrderById);
Router.patch("/:id", orderController.updateOrderById);

module.exports = Router;
