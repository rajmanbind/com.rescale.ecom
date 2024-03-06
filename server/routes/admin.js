const express = require("express");
const admin = require("../middlewares/admin.js");
const adminRoute = express.Router();
const Product = require("../models/product.js");

// Creating an Admin Middleware
adminRoute.post("/admin/add-product", admin, async (req, res) => {
  try {
    const { name, description, images, quantity, price, category } = req.body;

    let product = new Product({
      name,
      description,
      images,
      price,
      quantity,
      category,
    });

    product = await product.save();
    res.json(product);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
adminRoute.get("/admin/get-products", admin, async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: e.message });
  }
});
adminRoute.post("/admin/delete-product", admin, async (req, res) => {
  try {
    const { id } = req.body;
    const product = await Product.findByIdAndDelete(id);
    // console.log(product);
    res.send("All went well!");
  } catch (error) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = adminRoute;
