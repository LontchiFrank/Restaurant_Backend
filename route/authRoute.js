const router = require("express").Router();
const dotenv = require("dotenv");
const User = require("../model/User");

dotenv.config();

// router.get("/signup", () => {});
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const user = new User(req.body);

  try {
    const savedUser = await user.save();
    res.status(200).json(savedUser);
  } catch (err) {
    console.log(err);
    res.status(400).send("error, user not created");
  }

  res.send("new signup");
});
// router.get("/login", () => {});
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  res.send("login success");
});

module.exports = router;
