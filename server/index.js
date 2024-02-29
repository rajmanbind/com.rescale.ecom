//IMPORT FROM PACKAGES
const express = require("express");
const cors = require("cors");
// import "package:express.express.dart"
const authRoute = require("./routes/authRoute.js");
const connectDb = require("./connectDB/connectDB.js");

const PORT = 3000;
const DATABASE_URL = "mongodb://localhost:27017";
const server = express();
// CORS POLICY
// server.use(cors());

// JSON
server.use(express.json());
// import "./features/auth/screens/auth_screen.dart"
//GET,PUT,POST,DELETE,UPDATE->CRUD

server.use("/api", authRoute);

connectDb(DATABASE_URL)
  .then(() => {
    server.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });
