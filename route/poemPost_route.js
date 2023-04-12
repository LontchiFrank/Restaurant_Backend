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
