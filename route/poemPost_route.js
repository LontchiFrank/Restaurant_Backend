const router = require("express").Router();
const Poem = require("../model/poemPost_model");

//get all the poems
router.get("/", async (req, res) => {
  try {
    const post = await Poemfind();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
