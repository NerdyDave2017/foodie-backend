const Orders = require("../../models/orders/orders.model");

class OrderService {
  orders;
  constructor() {
    this.orders = Orders;
  }

  async createOrder(order) {
    try {
      const newOrder = await this.orders.create(order);
      return newOrder;
    } catch (error) {
      console.log(error);
    }
  }

  async getOrders() {
    try {
      const orders = await this.orders.find();
      return orders;
    } catch (error) {}
  }

  async getOrderById(id) {
    try {
      const order = await this.orders.findById(id);
      return order;
    } catch (error) {}
  }

  async updateOrderById(id, order) {
    try {
      const updatedOrder = await this.orders.findByIdAndUpdate(
        id,
        { ...order },
        {
          new: true,
        }
      );
      return updatedOrder;
    } catch (error) {}
  }

  async deleteOrderById(id) {
    try {
      const deletedOrder = await this.orders.findByIdAndDelete(id);
      return deletedOrder;
    } catch (error) {}
  }

  async getOrderByUserId(userId) {
    try {
      const order = await this.orders.findOne({ userId: userId });
      return order;
    } catch (error) {}
  }

  async getOrderByTrackingId(trackingId) {
    try {
      const order = await this.orders.find({
        trackingId: trackingId,
      });

      console.log(order);

      return order;
    } catch (err) {}
  }
}

module.exports = OrderService;
