const OrderService = require("./orders.services");
const HttpException = require("../../exceptions/HttpExceptions");

class OrderController {
  constructor() {
    this.orderService = new OrderService();
  }

  async createOrder(req, res, next) {
    try {
      const order = req.body;
      const newOrder = await this.orderService
        .createOrder(order)
        .then(async (order) => {
          await this.orderService.updateOrderById(order._id, {
            status: "pending",
          });
        });

      res.status(201).json({
        status: "success",
        message: "Order Created",
        newOrder,
      });
    } catch (error) {
      next(error);
    }
  }

  async getOrders(req, res, next) {
    try {
      const orders = await this.orderService.getOrders();
      res.status(200).json({
        status: "success",
        message: "All orders",
        orders,
      });
    } catch (error) {
      next(error);
    }
  }

  async getOrderById(req, res, next) {
    try {
      const id = req.params.id;
      const order = await this.orderService.getOrderById(id);
      res.status(200).json({
        status: "success",
        message: "Order found",
        order,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateOrderById(req, res, next) {
    try {
      const id = req.params.id;
      const order = req.body;

      const orderExist = await this.orderService.getOrderById(id);

      if (!orderExist) {
        throw next(new HttpException(404, "Order does not exist"));
      }

      const updatedOrder = await this.orderService.updateOrderById(id, order);
      res.status(200).json({
        status: "success",
        message: "Order updated",
        updatedOrder,
      });
    } catch (error) {
      next(error);
    }
  }

  async getOrderByUserId(req, res, next) {
    try {
      const { userId } = req.body;
      const order = await this.orderService.getOrderByUserId(userId);

      res.status(200).json({
        status: "success",
        message: "Order found",
        order,
      });
    } catch (error) {
      next(error);
    }
  }

  async acceptOrder(req, res, next) {
    try {
      const { orderId: id } = req.params.id;

      const orderExist = await this.orderService.getOrderById(id);

      if (!orderExist) {
        throw next(new HttpException(404, "Order does not exist"));
      }

      const updatedOrder = await this.orderService.updateOrderById(id, {
        status: "accepted",
      });
      res.status(200).json({
        status: "success",
        message: "Order updated",
        updatedOrder,
      });
    } catch (error) {
      next(error);
    }
  }

  async rejectOrder(req, res, next) {
    try {
      const { orderId: id } = req.params.id;

      const orderExist = await this.orderService.getOrderById(id);

      if (!orderExist) {
        throw next(new HttpException(404, "Order does not exist"));
      }
    } catch (error) {
      next(error);
    }
  }

  async deleteOrderById(req, res, next) {
    try {
      const id = req.params.id;

      const orderExist = await this.orderService.getOrderById(id);

      if (!orderExist) {
        throw next(new HttpException(404, "Order does not exist"));
      }

      const deletedOrder = await this.orderService.deleteOrderById(id);
      res.status(200).json({
        status: "success",
        message: "Order deleted",
        deletedOrder,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = OrderController;
