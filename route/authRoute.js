const router = require("express").Router();
const User = require("../model/User");

// router.get("/signup", () => {});
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.create(req.body);
    res.status(200).json(user);
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
