const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const User = require("../models/User")
const Booking = require("../models/Booking");
const Room = require("../models/Room");
const Table = require("../models/Table");
const BookingRoom = require("../models/BookingRoom");
const BookingTable = require("../models/BookingTable");
const { differenceInDays } = require("date-fns");

// @route GET api/bookings/
// @desc Get all booking information and calculate total amount
// @access Private
router.get("/", verifyToken, async (req, res) => {
  try {
    const userId = req.userId;

    // Get all booking rooms and tables for the user with populated room_type and table_type
    const bookingRooms = await BookingRoom.find({ user: userId, state: 'false' }).populate('room_type');
    const bookingTables = await BookingTable.find({ user: userId, state: 'false' }).populate('table_type');

    // Calculate the sum of prices for all rooms
    const totalRoomPrice = bookingRooms.reduce((sum, booking) => {
      // Calculate the number of days between start and end dates
      const numberOfDays = differenceInDays(new Date(booking.end_room_date), new Date(booking.start_room_date));
      // Calculate the price for one day of the room
      const roomPricePerDay = booking.room_type.price * numberOfDays;

      // Add the calculated price to the sum
      return sum + roomPricePerDay;
    }, 0);

    // Calculate the sum of prices for all tables
    // const totalTablePrice = bookingTables.reduce((sum, bookingTable) => {
    //   return sum + (bookingTable.table_type ? bookingTable.table_type.price : 0);
    // }, 0);

    const totalTablePrice = bookingTables.reduce((sum, bookingTable) => {
      return sum + bookingTable.table_type.price;
    }, 0);

    // Create a detailed list of rooms with prices and booking date
    const detailedRooms = bookingRooms.map((booking) => ({
      roomType: booking.room_type.room_type,
      roomNumber: booking.room_type.room_number,
      description: booking.room_type.description,
      price: booking.room_type.price,
      bookingDate: booking.start_room_date,
    }));

    // Create a detailed list of tables with prices and booking date
    const detailedTables = bookingTables.map((bookingTable) => ({
      tableType: bookingTable.table_type.table_type,
      tableNumber: bookingTable.table_type.table_number,
      price: bookingTable.table_type.price,
      bookingDate: bookingTable.table_date,
    }));

    // Calculate the sum of prices for all tables
    const totalAmount = totalRoomPrice + totalTablePrice;

    res.json({
      success: true,
      user: userId,
      detailedRooms,
      detailedTables,
      totalRoomPrice,
      totalTablePrice,
      totalAmount,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// @route PUT api/bookings/payment/
// @desc Process payment and update booking statuses
// @access Private
router.put("/payment", verifyToken, async (req, res) => {
  try {
    const userId = req.userId;

    // Update state of all booking rooms to 'true'
    await BookingRoom.updateMany({ user: userId, state: 'false' }, { $set: { state: 'true' } });

    // Update state of all booking tables to 'true'
    await BookingTable.updateMany({ user: userId, state: 'false' }, { $set: { state: 'true' } });

    // Update state of the main booking to 'true'
    await Booking.updateOne({ user: userId, state: 'false' }, { $set: { state: 'true' } });

    res.json({
      success: true,
      message: "Payment successful",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});


// @route POST api/book_room
// @desc Book available room
// @access Public

router.post("/book_room", verifyToken, async (req, res) => {
  const {
    room_number,
    start_room_date,
    end_room_date,
    number_adults,
    number_child
  } = req.body;
  try {
    const guest = await User.findOne({ _id: req.userId });
    if (!guest)
      return res.status(200).json({
        success: false,
        message: "Guest not found!",
      });
    if (guest.role != "Guest")
      return res.status(200).json({
        success: false,
        message: "Access denied!",
      });
    const room = await Room.findOne({ room_number: room_number });
    if (!room) {
      return res.status(200).json({
        success: false,
        message: "Room is not found",
      });
    }
    // const startRoomDate = new Date(start_room_date);
    // const endRoomDate = new Date(end_room_date);
    if (start_room_date < new Date()) {
      return res.status(200).json({
        success: false,
        message: "Invalid start date. Start date should be in the future.",
      });
    }
    if (end_room_date <= start_room_date) {
      return res.status(200).json({
        success: false,
        message: "Invalid date range. End date should be greater than or equal to start date.",
      });
    }
    const existingBookingRooms = await BookingRoom.find({
      room_type: room._id,
      $or: [
        {
          $and: [
            { start_room_date: { $gte: start_room_date } },
            { start_room_date: { $lte: end_room_date } },
          ],
        },
        {
          $and: [
            { end_room_date: { $gte: start_room_date } },
            { end_room_date: { $lte: end_room_date } },
          ],
        },
        {
          $and: [
            { start_room_date: { $lte: start_room_date } },
            { end_room_date: { $gte: end_room_date } },
          ],
        },
      ],
    });
    if (existingBookingRooms.length !== 0) {
      return res.status(200).json({
        success: false,
        message: "Room is booked in these dates",
      });
    }
    const newBookingRoom = new BookingRoom({
      user: guest._id,
      room_type: room._id,
      start_room_date : start_room_date,
      end_room_date : end_room_date,
      number_adults: number_adults,
      number_child: number_child,
      state: 'false',
    });
    await newBookingRoom.save();
    return res.status(200).json({
      success: true,
      message: "Room is booked successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
})

// @route POST api/booking/book_table
// @desc Book available table
// @access Public

router.post("/book_table", verifyToken, async (req, res) => {
  const {
    table_number,
    full_name,
    phone_number,
    table_date,
  } = req.body;
  try {
    const guest = await User.findOne({ _id: req.userId });
    if (!guest)
      return res.status(200).json({
        success: false,
        message: "Guest not found!",
      });
    if (guest.role != "Guest")
      return res.status(200).json({
        success: false,
        message: "Access denied!",
      });
    const table = await Table.findOne({ table_number: table_number });
    if (!table) {
      return res.status(200).json({
        success: false,
        message: "Table is not found",
      });
    }
    // const tableDate = new Date(table_date);
    if (table_date < new Date()) {
      return res.status(200).json({
        success: false,
        message: "Invalid start date. Start date should be in the future.",
      });
    }
    const existingBookingTables = await BookingTable.find({
      table_type: table._id,
      table_date: table_date,
    });
    if (existingBookingTables.length !== 0)
      return res.status(200).json({
        success: false,
        message: "Table is not available in these date!",
      });
    const newBookingTable = new BookingTable({
      user: guest._id,
      table_type: table,
      table_date: table_date,
      state: 'false',
    });
    await newBookingTable.save();
    return res.status(200).json({
      success: true,
      message: "Table is booked successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
})
module.exports = router;
