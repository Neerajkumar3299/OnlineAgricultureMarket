const mongoose = require("mongoose")
const { UserSchema } = require('./User')

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
    // farmer: {
    //     type: string,
    //     required: true
    // },
    date: {
        type: Date,
        default: Date.now
    }
})

const Crop = mongoose.model("crops", CropSchema)
Crop.createIndexes()
module.exports = { Crop, CropSchema }