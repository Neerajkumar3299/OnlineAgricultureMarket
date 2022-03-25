const mongoose=require("mongoose")

const UserSchema=new mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true
    },
    mobile:{
        type:Number
    },
    password:{
        type:String,
        required:true
    },
    userType:{
        type:String,
    },
    date:{
        type:Date,
        default:Date.now
    }
})

const User=mongoose.model("users",UserSchema)
User.createIndexes()
module.exports=User
