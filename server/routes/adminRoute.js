const express = require("express");
const AdminController = require("../controllers/adminController");
const admin = require("../middlewares/admin");
const adminRoute = express.Router();
// Creating an Admin Middleware
adminRoute.post("/add-product", admin, AdminController.addProduct);
adminRoute.get("/get-products", admin, AdminController.getAllProduct);
adminRoute.post("/delete-product", admin, AdminController.deleteProduct);

module.exports = adminRoute;
