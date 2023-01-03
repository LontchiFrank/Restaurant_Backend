require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const poemRoute = require("./route/poemPost_route");
const app = express();

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
app.use("/api/post", poemRoute);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
