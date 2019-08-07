const router = require("express").Router();
const userRoutes = require("./userRoutes");
const tvlistRoutes = require("./tvlistRoutes");

router.use("/users", userRoutes);
router.use("/tvlist", tvlistRoutes);



module.exports = router;
