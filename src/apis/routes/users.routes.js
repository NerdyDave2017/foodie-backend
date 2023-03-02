const Router = require("express").Router();
const UserController = require("../../modules/users/user/user.controller");

const userController = new UserController();

Router.post("/register", userController.register);
Router.post("/login", userController.login);
Router.patch("/update/:id", userController.updateData);
Router.patch("/updatePassword/:id", userController.updatePassword);
Router.patch("/bankDetails/:userId", userController.updateBankDetails);
Router.get("/bankDetails/:userId", userController.getBankDetails);
Router.get("/", userController.fetchAllUsers);
Router.delete("/delete/:id", userController.deleteUser);

module.exports = Router;
