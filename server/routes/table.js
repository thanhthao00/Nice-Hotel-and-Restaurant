const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");

const User = require("../models/User");
const Table = require("../models/Table");

// @route POST api/table/add_table
// @desc add a table type with specific table
// @access Private (only for system admin)
router.post("/add_table", verifyToken, async (req, res) => {
  try {
    // console.log(req.body)
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
    const { table_type, table_number, state, price } = req.body;
    if (!table_type || !table_number || !state || !price) {
      res.status(200).json({
        success: false,
        message: "Missing information!",
      });
    }
    let table = await Table.findOne({
      table_number: table_number,
    });

    if (table)
      return res.status(200).json({
        success: false,
        message: "Table number has already taken!",
      });

    const newTable = new Table({
      table_type,
      table_number,
      state,
      price,
    });
    await newTable.save();

    res.json({
      success: true,
      message: "New table created successfully",
      newTable,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// @route PUT api/table/update_table
// @desc Update a table type with specific table
// @access Private (only for system admin)
router.put("/update_table", verifyToken, async (req, res) => {
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

    const { table_type, table_number, state, price } = req.body;
    if (!table_type || !table_number || !state || !price) {
      res.status(200).json({
        success: false,
        message: "Missing information!",
      });
    }

    let updatedTable = {
      table_type,
      table_number,
      state,
      price,
    };

    const tableUpdateCondition = {
      table_number: table_number,
    };

    isUpdatedTable = await Table.findOneAndUpdate(
      tableUpdateCondition,
      updatedTable,
      { new: true }
    );

    if (!isUpdatedTable)
      return res.status(200).json({
        success: false,
        message: "Table number not found!",
      });

    res.json({
      success: true,
      message: "Table updated successfully",
      updatedTable,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// @route DEL api/table/update_table
// @desc Delete a specific table
// @access Private (only for system admin)
router.delete("/:table_number", verifyToken, async (req, res) => {
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

    const deleteTable = await Table.findOneAndDelete({
      table_number: req.params.table_number,
    });
    if (!deleteTable)
      return res
        .status(200)
        .json({ success: false, message: "Table number not found!" });

    return res.json({
      success: true,
      message: "Room deleted successfully",
      deleteTable,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// @route GET api/table/available_tables
// @desc Get available tables (state = True)
// @access Private
router.get("/available_tables", verifyToken, async (req, res) => {
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

    const tables = await Table.find({ state: 'true' });
    if (tables.length === 0) {
      return res.json({ success: true, message: "There is no available table" });
    }
    const availableTables = tables.map(table => ({
      table_type: table.table_type,
      table_number: table.table_number,
      state: table.state,
      price: table.price,
    }));

    res.json({ success: true, tables: availableTables });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// @route GET api/table/update_table
// @desc Get a specific table infomation
// @access Private (only for system admin)
router.get("/info/:table_number", verifyToken, async (req, res) => {
  try {
    const sys_ad = await User.findOne({ _id: req.userId });
    if (!sys_ad)
      return res.status(200).json({
        success: false,
        message: "System admin not found!",
      });
    if (sys_ad.role != "Guest")
      return res.status(200).json({
        success: false,
        message: "Access denied!",
      });

    const tableFind = await Table.findOne({ table_number: req.params.table_number, })

    if (!tableFind)
      return res
        .status(200)
        .json({ success: false, message: "Table number not found!" });

    return res.json({
      success: true,
      message: "Get table information successfully!",
      tableFind,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// @route GET api/table/all_tables
// @desc Get all tables
// @access Private
router.get("/all_tables", verifyToken, async (req, res) => {
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

    const tables = await Table.find();
    if (tables.length === 0) {
      return res.json({ success: true, message: "There are no tables in the list!" });
    }
    const allTables = tables.map(table => ({
      table_type: table.table_type,
      table_number: table.table_number,
      state: table.state,
      price: table.price,
    }));

    res.json({ success: true, tables: allTables });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      success: false,
      message: "Internal server error",
    });
  }
});



module.exports = router;
