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
            line: {
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
module.exports = User

const CropSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    rate: {
        type: mongoose.Types.Decimal128,
        required: true
    },
    farmer: {
        type: UserSchema,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Crop = mongoose.model("crops", CropSchema)
Crop.createIndexes()

module.exports = Crop
module.exports = CropSchema

const TradeSchema = new mongoose.Schema({
    quantity: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    farmer: {
        type: UserSchema,
        required: true
    },
    trader: {
        type: UserSchema,
        required: true
    },
    crop: {
        type: CropSchema,
        required: true
    }
})

const Trade = mongoose.model("trades", TradeSchema)
Trade.createIndexes()
module.exports = TradeSchema
module.exports = Trade
