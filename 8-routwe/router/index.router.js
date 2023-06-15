const { Router } = require("express");
const userRouter = require("./user.router");
const blogRouter = require("./blog.router");

const router = Router();
router.use("/user", userRouter);
router.use("/blog", blogRouter);
module.exports = router;
