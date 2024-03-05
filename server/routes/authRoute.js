const express = require("express");
const AuthController = require("../controllers/authController.js");
const auth = require("../middlewares/auth.js");
const admin = require("../middlewares/admin.js");

const authRouter = express.Router();

// Route level Middileware - To Protect Route

authRouter.use("/getuser", auth);
authRouter.use("/getuser", admin);
// public route
authRouter.post("/signup", AuthController.userSignUp);
authRouter.post("/signin", AuthController.userSignIn);
authRouter.post("/tokenisvalid", AuthController.tokenValidation);

authRouter.get("/getuser", AuthController.getUser);
module.exports = authRouter;
