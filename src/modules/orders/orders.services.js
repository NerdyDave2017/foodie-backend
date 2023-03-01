const Orders = require("../../models/orders/orders.model");

class OrderService {
  orders;
  constructor() {
    this.orders = Orders;
  }

  createOrder = async (order) => {
    try {
      const newOrder = await this.orders.create(order);
      return newOrder;
    } catch (error) {
      console.log(error);
    }
  };

  getOrders = async () => {
    try {
      const orders = await this.orders.find();
      return orders;
    } catch (error) {}
  };

  getOrderById = async (id) => {
    try {
      const order = await this.orders.findById(id);
      return order;
    } catch (error) {}
  };

  updateOrderById = async (id, order) => {
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
  };

  deleteOrderById = async (id) => {
    try {
      const deletedOrder = await this.orders.findByIdAndDelete(id);
      return deletedOrder;
    } catch (error) {}
  };

  getOrderByUserId = async (userId) => {
    try {
      const order = await this.orders.find({ userId: userId });
      return order;
    } catch (error) {}
  };

  getOrderbyRestaurantId = async (restaurantId) => {
    try {
      const order = await this.orders.find({ restaurantId: restaurantId });
      return order;
    } catch (error) {}
  };

  getOrderByTrackingId = async (trackingId) => {
    try {
      const order = await this.orders.findOne({
        trackingId: trackingId,
      });

      return order;
    } catch (err) {}
  };
}

module.exports = OrderService;
