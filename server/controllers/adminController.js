const Product = require("../models/productModle.js");

class AdminController {
  static addProduct = async (req, res) => {
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
  };

  static getAllProduct = async (req, res) => {
    try {
      const products = await Product.find({});
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: e.message });
    }
  };
  static deleteProduct = async (req, res) => {
    try {
      const { id } = req.body;
      let product = await Product.findByIdAndDelete(id);
      // product = await product.save();
      res.send("All went well!");
    } catch (error) {
      res.status(500).json({ error: e.message });
    }
  };
}

module.exports = AdminController;
