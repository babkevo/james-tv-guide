const router = require("express").Router();
const userRoutes = require("./userRoutes");
const todoRoutes = require("./todoRoutes");
const tvlistRoutes = require("./tvlistRoutes");
const channelRoutes = require("./channelRoutes");
const bbcRoutes = require("./bbcRoutes");

router.use("/users", userRoutes);
router.use("/todos", todoRoutes);
router.use("/tvlist", tvlistRoutes);
router.use("/channels", channelRoutes)
router.use("/bbc", bbcRoutes)



module.exports = router;
