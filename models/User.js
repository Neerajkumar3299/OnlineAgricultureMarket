const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    mobile: {
        type: Number
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: String,
    },
    address: {
        type: {
            street_address: {
                type: String,
                required: true
            },
            district: {
                type: String,
                required: true
            },
            state: {
                type: String,
                required: true
            },
            country: {
                type: String,
                required: true
            },
            pincode: {
                type: Number,
                required: true
            }
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model("users", UserSchema)
User.createIndexes()
module.exports = { User, UserSchema }