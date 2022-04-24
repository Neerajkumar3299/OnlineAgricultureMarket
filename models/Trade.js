const mongoose = require("mongoose")
const { UserSchema } = require('./User')

const { CropSchema } = require('./Crop')

const TradeSchema = new mongoose.Schema({
    quantity: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    trader: {
        type: UserSchema,
        required: true
    },
    crop: {
        type: CropSchema,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Trade = mongoose.model("trades", TradeSchema)
Trade.createIndexes()
module.exports = { Trade, TradeSchema }

