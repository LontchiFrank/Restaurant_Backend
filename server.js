require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const foodRoute = require("./route/foodPost_route");
const authRoute = require("./route/authRoute");
const categoryRoute = require("./route/Category_route");
const adminAuthRoute = require("./route/adminAuthRoute");
const addCartRoute = require('./route/AddCartRoute')
const bodyParser = require("body-parser");
var cors = require("cors");
const dotenv = require("dotenv");
const app = express();

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("database is connected");
  })
  .catch((err) => {
    console.log(err);
  });

//middleware
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    limits: { fileSize: 50 * 2024 * 1024 },
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/food", foodRoute);
app.use("/api/user", authRoute);
app.use("/api/admin", adminAuthRoute);
app.use("/api/category", categoryRoute);
app.use("/api/addCart", addCartRoute)
// app.use((req, res) => {
//   res.send("Hello Guys");
// });
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
