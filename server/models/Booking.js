const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const BookingSchema = new Schema({
//   user: {
//     type: Schema.Types.ObjectId,
//     ref: "users",
//   },
//   table_type: {
//     type: Schema.Types.ObjectId,
//     ref: "tables",
//   },
//   table_date: {
//     type: Date,
//   },
//   room_type: {
//     type: Schema.Types.ObjectId,
//     ref: "rooms",
//   },
//   room_date: {
//     start_room_date: {
//       type: Date,
//     },
//     end_room_date: {
//       type: Date,
//     },
//   },
//   pay: {
//     type: Number,
//     required: true
//   },
//   state: {
//     type: String,
//     enum: ['true', 'false'],
//     default: 'false',
//     required: true
//   }
// });

const BookingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  table_bookings: [{
    type: Schema.Types.ObjectId,
    ref: "bookingtable",
  }],
  room_bookings: [{
    type: Schema.Types.ObjectId,
    ref: "bookingroom",
  }],
  pay: {
    type: Number,
    required: true
  },
  state: {
    type: String,
    enum: ['true', 'false'],
    default: 'false',
    required: true
  }
});

module.exports = mongoose.model("bookings", BookingSchema);
