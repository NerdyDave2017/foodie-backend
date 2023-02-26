const Router = require("express").Router();
const OrderController = require("../../modules/orders/orders.controller");

const orderController = new OrderController();

Router.get("/", orderController.getOrders);
Router.post("/create", orderController.createOrder);
Router.get("/user/:userId", orderController.getOrderByUserId);
Router.get("/tracking/:trackingId", orderController.getOrderByTrackingId);
Router.patch("/update/:id/:userId", orderController.updateOrderById);
Router.patch(
  "/restaurant/accept/:orderId/:restaurantId",
  orderController.restaurantAcceptOrder
);
Router.patch(
  "/restaurant/reject/:orderId/:restaurantId",
  orderController.restaurantRejectOrder
);
Router.delete("/delete/:id", orderController.deleteOrderById);
Router.get("/:id", orderController.getOrderById);

module.exports = Router;
