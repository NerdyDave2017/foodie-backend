const Router = require("express").Router();
const UserController = require("../../modules/users/user/user.controller");
const UserService = require("../../modules/users/user/user.services");
const userController = new UserController();

Router.post("/create", userController.create);
Router.post("/signin", userController.signIn);
Router.put("/update", userController.updateData);
Router.put("/updatePassword", userController.updatePassword);
Router.get("/", userController.fetchAllUsers);

module.exports = Router;
