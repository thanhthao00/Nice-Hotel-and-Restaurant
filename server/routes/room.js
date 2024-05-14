const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");

const User = require("../models/User");
const Room = require("../models/Room");

// @route POST api/room/add_room
// @desc add a room type with specific room
// @access Private (only for system admin)
router.post("/add_room", verifyToken, async (req, res) => {
  try {
    console.log('123')
    const sys_ad = await User.findOne({ _id: req.userId });
    if (!sys_ad)
      return res.status(200).json({
        success: false,
        message: "System admin not found!",
      });
    console.log('124')
    if (sys_ad.role != "System_Admin")
      return res.status(200).json({
        success: false,
        message: "Access denied!",
      });
    console.log('125')
    const { room_type, room_number, description, state, capacity, price, discount } =
      req.body;
    if (!room_type || !room_number || !state || !price || !discount || !capacity) {
      console.log(room_type)
      console.log(room_number)
      console.log(state)
      console.log(price)
      console.log(discount)
      console.log(capacity)
      console.log('125.1')
      return res.status(200).json({
        success: false,
        message: "Missing information!",
      });
    }
    console.log('126')
    let room = await Room.findOne({
      room_number: room_number,
    });
    console.log(room)
    if (room)
      return res.status(200).json({
        success: false,
        message: "Room number has already taken!",
      });
      console.log('127')
    const newRoom = new Room({
      room_type,
      room_number,
      description,
      state,
      capacity,
      price,
      discount,
    });
    await newRoom.save();
    console.log('128')
    return res.json({
      success: true,
      message: "New room created successfully",
      newRoom,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// @route PUT api/room/update_room
// @desc Update a room type with specific room
// @access Private (only for system admin)
router.put("/update_room", verifyToken, async (req, res) => {
  try {
    const sys_ad = await User.findOne({ _id: req.userId });
    if (!sys_ad)
      return res.status(200).json({
        success: false,
        message: "System admin not found!",
      });
    if (sys_ad.role != "System_Admin")
      return res.status(200).json({
        success: false,
        message: "Access denied!",
      });

    const { room_type, room_number, description, state, capacity, price, discount } =
      req.body;

    if (!room_type || !room_number || !state || !price || !discount || !capacity) {
      res.status(200).json({
        success: false,
        message: "Missing information!",
      });
    }

    let updatedRoom = {
      room_type,
      room_number,
      description,
      state,
      capacity,
      price,
      discount,
    };

    const roomUpdateCondition = {
      room_number: room_number,
    };

    isUpdatedRoom = await Room.findOneAndUpdate(
      roomUpdateCondition,
      updatedRoom,
      { new: true }
    );

    if (!isUpdatedRoom)
      return res.status(200).json({
        success: false,
        message: "Room number not found!",
      });

    return res.json({
      success: true,
      message: "Room updated successfully",
      updatedRoom,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// @route DEL api/room/update_room
// @desc Delete a specific room
// @access Private (only for system admin)
router.delete("/:room_number", verifyToken, async (req, res) => {
  try {
    const sys_ad = await User.findOne({ _id: req.userId });
    if (!sys_ad)
      return res.status(200).json({
        success: false,
        message: "System admin not found!",
      });
    if (sys_ad.role != "System_Admin")
      return res.status(200).json({
        success: false,
        message: "Access denied!",
      });

    const deleteRoom = await Room.findOneAndDelete({
      room_number: req.params.room_number,
    });
    if (!deleteRoom)
      return res
        .status(200)
        .json({ success: false, message: "Room number not found!" });

    return res.json({
      success: true,
      message: "Room deleted successfully",
      deleteRoom,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// @route GET api/room/info
// @desc Get room infomation
// @access Private
router.get("/info/:room_number", verifyToken, async (req, res) => {
  try {
    const room = await Room.findOne({ room_number: req.params.room_number });
    if (!room) {
      return res.status(200).json({
        success: false,
        message: "Room not found",
      });
    }
    return res.json({
      success: true,
      room_type: room.room_type,
      room_number: room.room_number,
      description: room.description,
      state: room.state,
      capacity: room.capacity,
      price: room.price,
      discount: room.discount,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});


// @route GET api/room/available_rooms
// @desc Get available rooms (state = True)
// @access Private
router.get("/available_rooms", verifyToken, async (req, res) => {
  try {
    const sys_ad = await User.findOne({ _id: req.userId });
    if (!sys_ad)
      return res.status(200).json({
        success: false,
        message: "System admin not found!",
      });
    // if (sys_ad.role != "Guest")
    //   return res.status(200).json({
    //     success: false,
    //     message: "Access denied!",
    //   });

    const rooms = await Room.find({ state: 'true' });
    if (rooms.length === 0) {
      return res.json({ success: true, message: "There is no available room" });
    }
    const availableRooms = rooms.map(room => ({
      room_type: room.room_type,
      room_number: room.room_number,
      description: room.description,
      state: room.state,
      capacity: room.capacity,
      price: room.price,
      discount: room.discount,
    }));

    return res.json({ success: true, rooms: availableRooms });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// @route GET api/room/all_rooms
// @desc Get all rooms
// @access Private
router.get("/all_rooms", verifyToken, async (req, res) => {
  try {
    const sys_ad = await User.findOne({ _id: req.userId });
    if (!sys_ad)
      return res.status(200).json({
        success: false,
        message: "System admin not found!",
      });
    // if (sys_ad.role != "Guest")
    //   return res.status(200).json({
    //     success: false,
    //     message: "Access denied!",
    //   });

    const rooms = await Room.find();
    if (rooms.length === 0) {
      return res.json({ success: true, message: "There are no rooms in room list" });
    }
    const allRooms = rooms.map(room => ({
      room_type: room.room_type,
      room_number: room.room_number,
      description: room.description,
      state: room.state,
      capacity: room.capacity,
      price: room.price,
      discount: room.discount,
    }));

    return res.json({ success: true, rooms: allRooms });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// @route GET api/room/all_rooms_public
// @desc Get all rooms
// @access public
router.get("/all_rooms_public", async (req, res) => {
  try {
    const rooms = await Room.find();
    if (rooms.length === 0) {
      return res.json({ success: true, message: "There are no rooms in room list" });
    }
    const allRooms = rooms.map(room => ({
      room_type: room.room_type,
      room_number: room.room_number,
      description: room.description,
      state: room.state,
      capacity: room.capacity,
      price: room.price,
      discount: room.discount,
    }));

    return res.json({ success: true, rooms: allRooms });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      success: false,
      message: "Internal server error",
    });
  }
});


module.exports = router;
