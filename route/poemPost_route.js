const router = require("express").Router();
const Poem = require("../model/poemPost_model");
const verifyToken = require("./verifyToken");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "drillayqx",
  api_key: "843213215477195",
  api_secret: "k8uPFILp9oWzyNXSomqccUf8uzs",
  secure: true,
});

//get all the poems
router.get("/", async (req, res) => {
  // const post = await Poem.findOne({user:req.user.id});
  try {
    const post = await Poem.find();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

// create new poem

router.post("/new-poem", verifyToken, async (req, res) => {
  //   const newPoem = new Poem(req.body);
  const { title, desc, category } = req.body;
  const file = req.files.image;
  cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
    const newPoem = new Poem({
      ...req.body,
      image: result.url,
      user: req.user._id,
    });
    try {
      console.log(newPoem);
      const savePoem = newPoem.save();
      res.status(200).json(savePoem);
    } catch (error) {
      res.status(500).json(error);
    }
  });
});

//get poems as per user:PRIVATE
router.get("/userpoem", verifyToken, async (req, res) => {
  try {
    let poem = await Poem.find({ user: req.user._id }).sort({ date: -1 });
    res.json(poem);
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//update the poem
router.put("/:id", verifyToken, async (req, res) => {
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
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    console.log(req.params.id);
    const deletePost = await Poem.findByIdAndDelete(req.params.id);
    console.log(deletePost, "kjjk");
    res
      .status(200)
      .json({ message: "Poem has been deleted successfully", deletePost });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
