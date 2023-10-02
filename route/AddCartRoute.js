const router = require("express").Router();
const AddCart = require("../model/AddCart_model");
const verifyToken = require("./verifyToken");

//get all the food
router.get("/", async (req, res) => {
  // const post = await Poem.findOne({user:req.user.id});
  try {
    const addCart = await AddCart.find();
    res.status(200).json(addCart);
  } catch (error) {
    res.status(500).json(error);
  }
});



router.post("/add-cart",verifyToken, async (req, res) => {
  const { id,quantity,location, tel, price } = req.body;
    const addNewCart = new AddCart({ ...req.body,
        user: req.user._id,});
    try {
      console.log(addNewCart);
      const saveCart = addNewCart.save();
      res.status(200).json(saveCart);
    } catch (error) {
      res.status(500).json(error);
    }
});


// //get poems as per user:PRIVATE
// router.get("/userfood", verifyToken, async (req, res) => {
//   try {
//     let food = await Food.find({ user: req.user._id }).sort({ date: -1 });
//     res.json(food);
//   } catch (error) {
//     res.status(500).send("Server Error", error);
//   }
// });

// //update the poem
// router.put("/:id", verifyToken, async (req, res) => {
//   try {
//     const updateFood = await Food.findByIdAndUpdate(
//       req.params.id,
//       { $set: req.body },
//       { new: true }
//     );
//     res.status(200).json(updateFood);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });
// //Delete the poem
// router.delete("/:id", verifyToken, async (req, res) => {
//   try {
//     console.log(req.params.id);
//     const deleteFood = await Food.findByIdAndDelete(req.params.id);
//     console.log(deleteFood, "kjjk");
//     res
//       .status(200)
//       .json({ message: "Poem has been deleted successfully", deleteFood });
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

module.exports = router;
