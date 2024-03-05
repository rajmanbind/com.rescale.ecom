//IMPORT FROM PACKAGES
const express = require("express");
const cors = require("cors");
// import "package:express.express.dart"
const authRoute = require("./routes/authRoute.js");
const connectDb = require("./connectDB/connectDB.js");
const mongoose = require("mongoose");
const adminRoute = require("./routes/adminRoute.js");
const PORT = 3000;
// const DATABASE_URL = "mongodb://localhost:27017";
const DATABASE_URL =
  "mongodb+srv://rajmanbind3535:FuCAVzw1GxtDWSUE@cluster0.g0b73gw.mongodb.net/myDataBase?retryWrites=true&w=majority";
const server = express();
// CORS POLICY
server.use(cors());

// JSON
server.use(express.json());
// import "./features/auth/screens/auth_screen.dart"
//GET,PUT,POST,DELETE,UPDATE->CRUD

server.use("/api", authRoute);
server.use("/admin", adminRoute);

// connectDb(DATABASE_URL)
//   .then(() => {
//     server.listen(PORT, "0.0.0.0", () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   })
//   .catch((e) => {
//     console.log(e);
//   });

mongoose
  .connect(DATABASE_URL)
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((e) => {
    console.log(e);
  });

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
