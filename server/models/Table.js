const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TableSchema = new Schema({
    table_type: {
        type: String,
        required: true
    },
    table_number: {
        type: String,
        required: true
    },
    state: {
        type: String,
        enum: ['true', 'false']
    },
    price: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('tables', TableSchema)