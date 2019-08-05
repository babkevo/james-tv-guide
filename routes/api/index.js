const router = require("express").Router();
const userRoutes = require("./userRoutes");
const todoRoutes = require("./todoRoutes");
const tvlistRoutes = require("./tvlistRoutes");

router.use("/users", userRoutes);
router.use("/todos", todoRoutes);
router.use("/tvlist", tvlistRoutes);


module.exports = router;
