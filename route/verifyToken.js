const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Acess Denied");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log(verified, "i am verified");
    req.user = verified;
    next();
  } catch (err) {
    console.log(err, "ee");
    res.status(400).send("Invalid Token");
  }
};
