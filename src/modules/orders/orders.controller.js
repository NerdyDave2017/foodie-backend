const OrderService = require("./orders.services");

class OrderController {
  constructor() {
    this.orderService = new OrderService();
  }

  async createOrder(req, res) {
    const order = req.body;
    const newOrder = await this.orderService.createOrder(order);
    res.send(newOrder);
  }

  async getOrders(req, res) {
    const orders = await this.orderService.getOrders();
    res.send(orders);
  }

  async getOrderById(req, res) {
    const id = req.params.id;
    const order = await this.orderService.getOrderById(id);
    res.send(order);
  }

  async updateOrderById(req, res) {
    const id = req.params.id;
    const order = req.body;
    const updatedOrder = await this.orderService.updateOrderById(id, order);
    res.send(updatedOrder);
  }

  async deleteOrderById(req, res) {
    const id = req.params.id;
    const deletedOrder = await this.orderService.deleteOrderById(id);
    res.send(deletedOrder);
  }
}

module.exports = OrderController;
