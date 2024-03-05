const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel.js");
const admin = async (req, res, next) => {
  try {
    const token = req.header("x-auth-token");

    // console.log(token)
    if (!token)
      return res.status(401).json({ msg: "No auth token, access denied" });
    const verified = jwt.verify(token, "passwordKey");
    const user = await UserModel.findById(verified.id);
    if (user.type == "user" || user.tpe == "seller") {
      return res.status(401).json({ msg: "You are not admin !" });
    }
    // console.log(user);
    if (!verified)
      return res
        .status(401)
        .json({ msg: "Token verification failed, authorization denied." });

    req.user = verified.id;
    req.token = token;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = admin;
