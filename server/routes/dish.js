const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");

const User = require("../models/User");
const Dish = require("../models/Dish");

// @route POST api/dish/add_dish
// @desc add a dish 
// @access Private (only for system admin)
router.post("/add_dish", verifyToken, async (req, res) => {
  try {
    const sys_ad = await User.findOne({ _id: req.userId });
    if (!sys_ad || sys_ad.role != "System_Admin")
      return res.status(200).json({
        success: false,
        message: "Access denied!",
      });
    const { dish_name, dish_type, description, state} =
      req.body;
    if (!dish_name || !dish_type || !description) {
      res.status(200).json({
        success: false,
        message: "Missing information!",
      });
    }
    let dish = await Dish.findOne({
      dish_name: dish_name,
    });

    if (dish)
      return res.status(200).json({
        success: false,
        message: "Dish has already existed!",
      });

    const newDish = new Dish({
      dish_name,
      dish_type,
      description,
      state
    });
    await newDish.save();

    res.json({
      success: true,
      message: "New dish created successfully",
      newDish,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// @route PUT api/dish/update_dish
// @desc Update a dish price with specific price
// @access Private (only for system admin)
router.put("/update_dish", verifyToken, async (req, res) => {
  try {
    const sys_ad = await User.findById(req.userId);

    if (!sys_ad || sys_ad.role !== "System_Admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied!",
      });
    }

    const { dish_name, dish_type, description, state } = req.body;
    if (!dish_name || !dish_type || !description || (state !== 'true' && state !== 'false')) {
      return res.status(200).json({
        success: false,
        message: "Invalid or missing information!",
      });
    }

    const updatedDish = {
      dish_name,
      dish_type,
      description,
      state,
    };

    const dishUpdatePrice = { dish_name };
    const isUpdatedDish = await Dish.findOneAndUpdate(
      dishUpdatePrice,
      updatedDish,
      { new: true }
    );

    if (!isUpdatedDish) {
      return res.status(200).json({
        success: false,
        message: "Dish not found!",
      });
    }

    res.json({
      success: true,
      message: "Dish updated successfully",
      updatedDish,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// @route GET api/dish/get_all_available_dish
// @desc Get all dish 
// @access Private
router.get("/get_all_available_dish", verifyToken, async (req, res) => {
  try {
    const sys_ad = await User.findById(req.userId);

    if (!sys_ad || sys_ad.role !== "System_Admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied!",
      });
    }

    const dishes = await Dish.find({ state: 'true' });

    if (dishes.length === 0) {
      return res.json({
        success: true,
        message: "There is no available dish",
      });
    }

    const availableDishes = dishes.map(dish => ({
      dish_name: dish.dish_name,
      dish_type: dish.dish_type,
      description: dish.description,
      state: dish.state
    }));

    res.json({
      success: true,
      dishes: availableDishes,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// @route GET api/dish/get_all_dish
// @desc Get all dish 
// @access Private
router.get("/get_all_dish", verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.userId });

    if (!user) {
      return res.status(200).json({
        success: false,
        message: "User not found!",
      });
    }

    const dishes = await Dish.find();

    if (dishes.length === 0) {
      return res.json({
        success: true,
        message: "There is no available dish",
      });
    }

    const allDishes = dishes.map(dish => ({
      dish_name: dish.dish_name,
      dish_type: dish.dish_type,
      description: dish.description,
      state: dish.state
    }));

    res.json({
      success: true,
      dishes: allDishes,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// @route DEL api/dish/:dish_name
// @desc Delete a specific dish
// @access Private (only for system admin)
router.delete("/:dish_name", verifyToken, async (req, res) => {
  try {
    const sys_ad = await User.findById(req.userId);

    if (!sys_ad || sys_ad.role !== "System_Admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied!",
      });
    }

    const deleteDish = await Dish.findOneAndDelete({
      dish_name: req.params.dish_name,
    });

    if (!deleteDish) {
      return res.status(200).json({
        success: false,
        message: "Dish not found!",
      });
    }

    return res.json({
      success: true,
      message: "Dish deleted successfully",
      deleteDish,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// @route GET api/dish/get_all_dish_public
// @desc Get all dish 
// @access Public
router.get("/get_all_dish_public", async (req, res) => {
  try {
    const dishes = await Dish.find();

    if (dishes.length === 0) {
      return res.json({
        success: true,
        message: "There is no available dish",
      });
    }

    const allDishes = dishes.map(dish => ({
      dish_name: dish.dish_name,
      dish_type: dish.dish_type,
      description: dish.description,
      state: dish.state
    }));

    res.json({
      success: true,
      dishes: allDishes,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});


module.exports = router;