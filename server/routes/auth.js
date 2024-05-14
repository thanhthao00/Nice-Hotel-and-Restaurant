const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

//==============================================REGISTER================================================================

// @route POST api/auth/register_guest
// @desc Register user (Guest)
// @access Public
router.post("/register_guest", async (req, res) => {
  const {
    email,
    password,
    full_name,
    phone_number,
    address,
    birthday,
    user_id
  } = req.body;
  // Simple validation
  if (!email || !password)
    return res
      .status(400)
      .json({ success: false, message: "Missing email and/or password" });
  try {
    // Check for existing user
    const user = await User.findOne({ email: email });

    if (user)
      return res
        .status(400)
        .json({ success: false, message: "email already taken" });

    // All good
    const hashedPassword = await argon2.hash(password);
    const newUser = new User({
      email,
      password: hashedPassword,
      role: "Guest",
	    full_name,
	    phone_number,
	    address,
	    birthday,
	    user_id,
	    money: 0
    });
    await newUser.save();

    // Return token
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    return res.json({
      success: true,
      message: "User created successfully",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// @route POST api/auth/register_staff
// @desc Register user (Staff)
// @access Public
router.post("/register_staff", async (req, res) => {
  const {
    email,
    password,
    full_name,
    phone_number,
    address,
    birthday,
    user_id, 
    money
  } = req.body;
  // Simple validation
  if (!email || !password)
    return res
      .status(400)
      .json({ success: false, message: "Missing email and/or password" });
  try {
    // Check for existing user
    const user = await User.findOne({ email: email });

    if (user)
      return res
        .status(400)
        .json({ success: false, message: "email already taken" });

    // All good
    const hashedPassword = await argon2.hash(password);
    const newUser = new User({
      email,
      password: hashedPassword,
      role: "Staff",
      full_name,
	    phone_number,
	    address,
	    birthday,
	    user_id,
	    money
    });
    await newUser.save();

    // Return token
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    return res.json({
      success: true,
      message: "User created successfully",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// @route POST api/auth/register_Business_Admin
// @desc Register user (Business_admin)
// @access Public
router.post("/register_Business_Admin", async (req, res) => {
  const {
    email,
    password,
    full_name,
    phone_number,
    address,
    birthday,
    user_id
  } = req.body;
  // Simple validation
  if (!email || !password)
    return res
      .status(400)
      .json({ success: false, message: "Missing email and/or password" });
  try {
    // Check for existing user
    const user = await User.findOne({ email: email });

    if (user)
      return res
        .status(400)
        .json({ success: false, message: "email already taken" });

    // All good
    const hashedPassword = await argon2.hash(password);
    const newUser = new User({
      email,
      password: hashedPassword,
      role: "Business_Admin",
      full_name,
	    phone_number,
	    address,
	    birthday,
	    user_id,
	    money: 0
    });
    await newUser.save();

    // Return token
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    return res.json({
      success: true,
      message: "User created successfully",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// @route POST api/auth/register_System_Admin
// @desc Register user (System_admin)
// @access Public
router.post("/register_System_Admin", async (req, res) => {
  const {
    email,
    password,
    full_name,
    phone_number,
    address,
    birthday,
    user_id
  } = req.body;
  // Simple validation
  if (!email || !password)
    return res
      .status(400)
      .json({ success: false, message: "Missing email and/or password" });
  try {
    // Check for existing user
    const user = await User.findOne({ email: email });

    if (user)
      return res
        .status(400)
        .json({ success: false, message: "email already taken" });

    // All good
    const hashedPassword = await argon2.hash(password);
    const newUser = new User({
      email,
      password: hashedPassword,
      role: "System_Admin",
      full_name,
	    phone_number,
	    address,
	    birthday,
	    user_id,
	    money: 0
    });
    await newUser.save();

    // Return token
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    return res.json({
      success: true,
      message: "User created successfully",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

//======================================================================================================================

//==============================================LOGIN================================================================
// @route POST api/auth/login
// @desc Login user
// @access Public
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Missing email and/or password!" });
  }

  try {
    //Check for existing user
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect email or password!" });
    //email found
    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect email or password!" });
    //All good
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    return res.json({
      success: true,
      message: "User logged in successfully",
      email: user.email,
      full_name: user.full_name,
      phone_number: user.phone_number,
      address: user.address,
      birthday: user.birthday,
      user_id: user.user_id,
      role: user.role,
      money: user.money,
      createAt: user.createAt,
      accessToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});
//======================================================================================================================

module.exports = router;
