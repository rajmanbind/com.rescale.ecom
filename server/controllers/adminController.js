const Product = require("../models/productModle.js");

class AdminController {
  // add the product
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
  // get all product
  static getAllProduct = async (req, res) => {
    try {
      const products = await Product.find({});
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: e.message });
    }
  };

  // delete the product
  static deleteProduct = async (req, res) => {
    try {
      const { id } = req.body;
      await Product.findByIdAndDelete(id);
      res.send("All went well!");
    } catch (error) {
      res.status(500).json({ error: e.message });
    }
  };
}

module.exports = AdminController;
