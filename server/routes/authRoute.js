const express = require("express");
const AuthController = require("../controllers/authController.js");

const authRouter = express.Router();

// public route
authRouter.post("/signup", AuthController.userSignUp);
authRouter.post("/signin", AuthController.userSignIn);
module.exports = authRouter;
