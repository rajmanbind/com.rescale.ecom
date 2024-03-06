const express = require("express");
const auth = require("../middlewares/auth.js");
const admin = require("../middlewares/admin.js");
const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authRouter = express.Router();

// Route level Middileware - To Protect Route

authRouter.use("/api/getuser", auth);
authRouter.use("/api/getuser", admin);
// public route
authRouter.post("/api/signup", async (req, res) => {
  // get the data from client
  const { name, email, password, type, address } = req.body;

  if (name && email && password) {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "User with same email already exist" });
    } else {
      const genSalt = await bcrypt.genSalt(12);
      const hashPashword = await bcrypt.hash(password, genSalt);
      let userDoc = new User({
        name,
        email,
        password: hashPashword,
        type,
        address,
      });
      userDoc = await userDoc.save();

      res.json(userDoc);
    }
  } else {
    return res.json({ msg: "Required All field" });
  }
});
authRouter.post("/api/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ msg: "User with this email does not exits!" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Incorrect Password!" });
      }

      const token = jwt.sign({ id: user._id }, "passwordKey");
      res.json({ ...user._doc, token });
    } else {
      return res.status(400).json({ msg: "All Field Required!" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
authRouter.post("/api/tokenisvalid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, "passwordKey");

    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    res.json(true);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

authRouter.get("/api/getuser", async (req, res) => {
  // console.log(req)
  const user = await User.findById(req.user);
  // console.log(user)
  res.json({ ...user._doc, token: req.token });
});
module.exports = authRouter;
