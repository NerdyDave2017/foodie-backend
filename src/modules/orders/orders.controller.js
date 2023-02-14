const OrderService = require("./orders.services");
const userService = require("../users/user/user.services");
const HttpException = require("../../exceptions/HttpExceptions");

class OrderController {
  constructor() {
    this.orderService = new OrderService();
    this.userService = new userService();
  }

  createOrder = async (req, res, next) => {
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
  };

  getOrders = async (req, res, next) => {
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
  };

  getOrderById = async (req, res, next) => {
    try {
      const id = req.params.id;

      const orderExist = await this.orderService.getOrderById(id);

      if (!orderExist) {
        throw next(new HttpException(404, "Order does not exist"));
      }

      const order = await this.orderService.getOrderById(id);
      res.status(200).json({
        status: "success",
        message: "Order found",
        order,
      });
    } catch (error) {
      next(error);
    }
  };

  updateOrderById = async (req, res, next) => {
    try {
      //Check if user exist
      //Check if order exist
      // Check if user is the one trying to update order

      const id = req.params.id;
      const userId = req.params.userId;
      const order = req.body;

      const user = await this.userService.findUserById(userId);

      if (!user) {
        throw next(new HttpException(404, "User does not exist"));
      }

      const orderExist = await this.orderService.getOrderById(id);

      if (!orderExist) {
        throw next(new HttpException(404, "Order does not exist"));
      }

      if (orderExist.userId !== userId) {
        throw next(new HttpException(401, "Unauthorized"));
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
  };

  getOrderByUserId = async (req, res, next) => {
    try {
      const { userId } = req.body;

      const user = await this.userService.find;

      if (user) {
        throw next(new HttpException(401, "User already exists"));
      }

      const order = await this.orderService.getOrderByUserId(userId);

      res.status(200).json({
        status: "success",
        message: "Order found",
        order,
      });
    } catch (error) {
      next(error);
    }
  };

  acceptOrder = async (req, res, next) => {
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
  };

  rejectOrder = async (req, res, next) => {
    try {
      const { orderId: id } = req.params.id;

      const orderExist = await this.orderService.getOrderById(id);

      if (!orderExist) {
        throw next(new HttpException(404, "Order does not exist"));
      }
    } catch (error) {
      next(error);
    }
  };

  deleteOrderById = async (req, res, next) => {
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
  };
}

module.exports = OrderController;
