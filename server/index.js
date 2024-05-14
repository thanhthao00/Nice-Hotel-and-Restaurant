const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
const userRoom = require("./routes/room");
const dishRouter = require("./routes/dish")
const userTable = require("./routes/table");
const feedbackRouter = require("./routes/feedback")
const bookingRouter = require("./routes/booking")

require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_PASSWORD}:${process.env.DB_PASSWORD}@cluster0.ofucss0.mongodb.net/?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log(`connected to db successfully`);
  } catch (error) {
    console.log(error);
    console.log(`cannot connect to db`);
  }
};

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/room", userRoom);
app.use("/api/table", userTable);
app.use("/api/dish", dishRouter);
app.use("/api/feedback", feedbackRouter);
app.use("/api/booking", bookingRouter);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
