const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");

const Post = require("../models/Post");

// @route GET api/feedback
// @desc Get post
// @access Private
router.get("/", verifyToken, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.userId }).populate("user", [
      "email",
      "full_name",
      "phone_number",
      "address",
      "birthday",
      "user_id",
      "role",
    ]);
    res.json({ success: true, posts });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// @route GET api/feedback/all
// @desc Get all post of all user 
// @access Public
router.get("/all", async (req, res) => {
  try {
    const posts = await Post.find({}).populate("user", [
      "email",
      "full_name",
      "phone_number",
      "address",
      "birthday",
      "user_id",
      "role",
    ]);
    res.json({ success: true, posts });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// @route POST api/feedback
// @desc Create post
// @access Private
router.post("/", verifyToken, async (req, res) => {
  const { description, rate } = req.body;

  //Simple validation
  if (!description)
    return res
      .status(400)
      .json({ success: false, message: "Description is required!" });
  try {
    const newPost = new Post({
      description,
      rate,
      user: req.userId,
    });

    await newPost.save();

    return res.json({
      success: true,
      message: "Create post successfully!",
      post: newPost,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// @route DELETE api/feedback
// @desc Delete post
// @access Private
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const postDeleteCondition = {
      _id: req.params.id,
      user: req.userId,
    };
    const deletePost = await Post.findOneAndDelete(postDeleteCondition);

    //user not authorized to update post
    if (!deletePost)
      return res.status(200).json({
        success: false,
        message: "Post not found or user not authorize!",
      });
    res.json({
      success: true,
      post: deletePost,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// @route PUT api/posts
// @desc Update post
// @access Private
router.put("/:id", verifyToken, async (req, res) => {
  const { description, rate } = req.body;
  //Simple validation
  if (!description)
    return res
      .status(200)
      .json({ success: false, message: "Description is required!" });
  try {
    let updatedPost = {
      description: description || "",
      rate,
      date: Date.now(),
    };
    const postUpdateCondition = { _id: req.params.id, user: req.userId };
    updatedPost = await Post.findOneAndUpdate(
      postUpdateCondition,
      updatedPost,
      { new: true }
    );

    //user not authorized to update post
    if (!updatedPost)
      return res.status(200).json({
        success: false,
        message: "Post not found or user not authorize!",
      });
    res.json({
      success: true,
      message: "Excellent progress!",
      post: updatedPost,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

module.exports = router;
