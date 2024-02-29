const UserModel = require("../models/userModel.js");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
class AuthController {
  //Signup

  static userSignUp = async (req, res) => {
    // get the data from client
    const { name, email, password } = req.body;

    if (name && email && password) {
      const existingUser = await UserModel.findOne({ email: email });
      if (existingUser) {
        return res
          .status(400)
          .json({ msg: "User with same email already exist" });
      } else {
        const genSalt = await bcrypt.genSalt(12);
        const hashPashword = await bcrypt.hash(password, genSalt);
        let userDoc = new UserModel({
          name: name,
          email: email,
          password: hashPashword,
        });
        userDoc = await userDoc.save();

        // return res.status(200).json({ msg: "Sign Up Successfully!" });
        res.json(userDoc);
      }
    } else {
      return res.json({ msg: "Required All field" });
    }
    // post  that data in database
    // return that data to the user
    // res.json({ msg: "req.body" });
  };

  //Sign In Route

  //Exercise

  static userSignIn = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (email && password) {
        const user = await UserModel.findOne({ email });
        if (!user) {
          return res
            .status(400)
            .json({ msg: "User with this email does not exits!" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ msg: "Incorrect Password!" });
        }

        const token = jwt.sign({ id: user._id }, "passwordKey", {
          expiresIn: "15d",
        });
        res.json({ ...user._doc, token });
      } else {
        return res.status(400).json({ msg: "All Field Required!" });
      }
    } catch (error) {
      res.status(500).json({ d: error.message });
    }
  };
}

module.exports = AuthController;
