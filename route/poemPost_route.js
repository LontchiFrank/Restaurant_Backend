const router = require("express").Router();
const Poem = require("../model/poemPost_model");

//get all the poems
router.get("/", async (req, res) => {
  try {
    const post = await Poem.find();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

// create new poem

router.post("/new-poem", async (req, res) => {
  const newPoem = new Poem(req.body);
  try {
    const savePoem = await newPoem.save();
    res.status(200).json(savePoem);
  } catch (error) {
    res.status(500).json(error);
  }
});

//update the poem
router.put("/:id", async (req, res) => {
  try {
    const updatePoem = await Poem.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatePoem);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Delete the poem
router.delete("/:id", async (req, res) => {
  try {
    const deletePost = await Post.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ message: "Post has been deleted successfully", deletePost });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
