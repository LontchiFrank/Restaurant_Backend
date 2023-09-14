const router = require("express").Router();
const Category = require("../model/Category_model");
const verifyToken = require("./verifyToken");

//get all the categories
router.get("/categories", async (req, res) => {
  // const post = await Poem.findOne({user:req.user.id});
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
});
//post category
router.post("/add-category", async (req, res) => {
  //   const { name } = req.body;
  const newCategory = new Category({ name: req.body.name });
  try {
    console.log(newCategory);
    const saveCategory = newCategory.save();
    res.status(200).json(saveCategory);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
