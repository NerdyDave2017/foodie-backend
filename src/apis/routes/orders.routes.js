const Router = require("express").Router();
const OrderController = require("../../modules/orders/orders.controller");

const orderController = new OrderController();

Router.get("/", orderController.getOrders);
Router.post("/create", orderController.createOrder);
Router.get("/user/:userId", orderController.getOrderByUserId);
Router.patch("/update/:id/:userId", orderController.updateOrderById);
Router.patch("/restaurant/accept/:orderId/:restaurantId");
Router.patch("/restaurant/reject/:orderId/:restaurantId");
Router.delete("/delete/:id", orderController.deleteOrderById);
Router.get("/:id", orderController.getOrderById);

module.exports = Router;
