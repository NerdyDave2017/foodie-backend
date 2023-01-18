const Orders = require("../../models/orders/orders.model");

class OrderService {
  orders;
  constructor() {
    this.orders = Orders;
  }

  async createOrder(order) {
    const newOrder = await this.orders.create(order);
    return newOrder;
  }

  async getOrders() {
    const orders = await this.orders.find();
    return orders;
  }

  async getOrderById(id) {
    const order = await this.orders.findById(id);
    return order;
  }

  async updateOrderById(id, order) {
    const updatedOrder = await this.orders.findByIdAndUpdate(id, order, {
      new: true,
    });
    return updatedOrder;
  }

  async deleteOrderById(id) {
    const deletedOrder = await this.orders.findByIdAndDelete(id);
    return deletedOrder;
  }

  async getOrderByUserId(userId) {
    const order = await this.orders.find({ userId: userId });
    return order;
  }
}

module.exports = OrderService;
