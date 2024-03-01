const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {

    const token = req.header("x-auth-token");
    // console.log("Token",req.headers["x-auth-token"])
    // console.log("Token2",token)
    if (!token)
      return res.status(401).json({ msg: "No auth token, access denied" });
    const verified = jwt.verify(token, "passwordKey");
    if (!verified)
      return res
        .status(401)
        .json({ msg: "Token verification failed, authorization denied." });

    req.user = verified.id;
    req.token = token;
    // console.log("token verified");
    next();
  } catch (error) {
    //   console.log("token not verified")
    res.status(500).json({ error: error.message });
  }
};

module.exports = auth;
