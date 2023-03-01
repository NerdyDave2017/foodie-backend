const Router = require("express").Router();
const OrderController = require("../../modules/orders/orders.controller");

const orderController = new OrderController();

Router.get("/", orderController.getOrders);
Router.post("/create", orderController.createOrder);
Router.get("/user/:userId", orderController.getOrderByUserId);
Router.get("/restaurant/:restaurantId", orderController.getOrderByRestaurantId);
Router.get("/tracking/:trackingId", orderController.getOrderByTrackingId);
Router.patch("/update/:orderId/:userId", orderController.updateOrderById);
Router.patch(
  "/restaurant/accept/:orderId/:restaurantId",
  orderController.restaurantAcceptOrder
);
Router.patch(
  "/restaurant/reject/:orderId/:restaurantId",
  orderController.restaurantRejectOrder
);
Router.delete("/delete/:orderId/:userId", orderController.deleteOrderById);
Router.get("/:orderId", orderController.getOrderById);

module.exports = Router;
