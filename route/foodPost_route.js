const router = require("express").Router();
const Food = require("../model/foodPost_model");
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
    const food = await Food.find();
    res.status(200).json(food);
  } catch (error) {
    res.status(500).json(error);
  }
});

// create new food item

router.post("/new-food", verifyToken, async (req, res) => {
  //   const newPoem = new Poems(req.body);
  const { name, desc, price, category } = req.body;
  const file = req.files.image;
  cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
    const newFood = new Food({
      ...req.body,
      image: result.url,
      user: req.user._id,
    });
    try {
      console.log(newFood);
      const saveFood = newFood.save();
      res.status(200).json(saveFood);
    } catch (error) {
      res.status(500).json(error);
    }
  });
});

//get poems as per user:PRIVATE
router.get("/userfood", verifyToken, async (req, res) => {
  try {
    let food = await Food.find({ user: req.user._id }).sort({ date: -1 });
    res.json(food);
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//update the poem
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updateFood = await Food.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateFood);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Delete the poem
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    console.log(req.params.id);
    const deleteFood = await Food.findByIdAndDelete(req.params.id);
    console.log(deleteFood, "kjjk");
    res
      .status(200)
      .json({ message: "Poem has been deleted successfully", deleteFood });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
