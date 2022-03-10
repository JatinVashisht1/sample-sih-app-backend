const mongoose = require("mongoose")

const addressSchema = new mongoose.Schema({
    houseNumber: {
        type: Number,
        required: false
    },
    street: {
        type: String,
        required: false,
    },
    village: {
        type: String,
        required: true
    },
})

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
        min: 18,
        max: 70,
    },
    address: {
        type: addressSchema,
        required: true
    },
    mid: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', userSchema)