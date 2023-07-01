const router = require("express").Router();
const Users = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { registerValidation, loginValidation } = require("../validation");

// router.get("/signup", () => {});
router.post("/signup", async (req, res) => {
  console.log("entered");
  //LETS VALIDATE THE DATA BEFORE WE A USER
  try {
    const { error } = registerValidation(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
    }

    //Checking if the user is already in the database
    const emailExist = await Users.findOne({ email: req.body.email });
    if (emailExist) {
      return res.status(400).send("Email already exists");
    }

    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //   const { name, email, password } = req.body;
    const user = new Users({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: hashedPassword,
    });
    const savedUser = await user.save();
    res.status(200).json(savedUser);
    console.log(user, "jskljkl");
    res.send("new signup");
  } catch (err) {
    console.log(err, "error here");
    res.status(400).send("error, user not created");
  }
});
// router.get("/lo`gin", () => {});

//LOGIN

router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  }

  //Checking if the email is already in the database
  const user = await Users.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("Email is not found");
  }

  //PASSWORD IS CORRECT
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) {
    return res.status(400).send("Invalid Password");
  }

  //Create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).json({ token, user });
});

module.exports = router;
