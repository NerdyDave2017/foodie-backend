const OrderService = require("./orders.services");

class OrderController {
  constructor() {
    this.orderService = new OrderService();
  }

  async createOrder(req, res, next) {
    const order = req.body;
    const newOrder = await this.orderService.createOrder(order);
    res.status(201).json({
      status: "success",
      message: "Order Created",
      newOrder,
    });
  }

  async getOrders(req, res, next) {
    const orders = await this.orderService.getOrders();
    res.status(200).json({
      status: "success",
      message: "All orders",
      orders,
    });
  }

  async getOrderById(req, res, next) {
    const id = req.params.id;
    const order = await this.orderService.getOrderById(id);
    res.status(200).json({
      status: "success",
      message: "Order found",
      order,
    });
  }

  async updateOrderById(req, res, next) {
    const id = req.params.id;
    const order = req.body;
    const updatedOrder = await this.orderService.updateOrderById(id, order);
    res.status(200).json({
      status: "success",
      message: "Order updated",
      updatedOrder,
    });
  }

  async getOrderByUserId(req, res, next) {
    const { userId } = req.body;
    const order = await this.orderService.getOrderByUserId(userId);

    res.status(200).json({
      status: "success",
      message: "Order found",
      order,
    });
  }

  async deleteOrderById(req, res, next) {
    const id = req.params.id;
    const deletedOrder = await this.orderService.deleteOrderById(id);
    res.status(200).json({
      status: "success",
      message: "Order deleted",
      deletedOrder,
    });
  }
}

module.exports = OrderController;
