const UserController = require("../../modules/users/user/user.controller");

const userController = new UserController();

const userRoutes = (app) => {
  app.post("/create", userController.create);
  app.post("/signin", userController.signIn);
  app.put("/update", userController.updateData);
  app.put("/password", userController.updatePassword);
  app.get("/", userController.fetcAllUsers);
};

module.exports = userRoutes;
