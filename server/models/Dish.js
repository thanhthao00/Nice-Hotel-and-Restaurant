const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DishSchema = new Schema({
    dish_name: {
        type: String,
        required: true
    },
    dish_type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    state: {
        type: String,
        enum: ['true', 'false']
    }
})

module.exports = mongoose.model('dishes', DishSchema)