const router = require("express").Router();

router.use("/users", require("./users.routes"));
router.use("/restaurants", require("./restaurants.routes"));
router.use("/drivers", require("./drivers.routes"));
router.use("/items", require("./items.routes"));
router.use("/orders", require("./orders.routes"));

module.exports = router;
