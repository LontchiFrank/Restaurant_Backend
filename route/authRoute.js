const router = require("express").Router();
const User = require("../model/User");

//VALIDATION
const Joi = require("@hapi/joi");

const schema = Joi.object({
  name: Joi.string().min(6).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});

// router.get("/signup", () => {});
router.post("/signup", async (req, res) => {
  //LETS VALIDATE THE DATA BEFORE WE A USER
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  }

  const { name, email, password } = req.body;
  //   const user = new User(req.body);

  //   try {
  //     const savedUser = await user.save();
  //     res.status(200).json(savedUser);
  //   } catch (err) {
  //     console.log(err);
  //     res.status(400).send("error, user not created");
  //   }

  //   res.send("new signup");
});
// router.get("/login", () => {});
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  res.send("login success");
});

module.exports = router;
