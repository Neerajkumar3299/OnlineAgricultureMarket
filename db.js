const mongoose=require("mongoose")

const url="mongodb://localhost:27017/onlineAgriculture"
 mongoose.connect(url).then(()=>{
     console.log("connected to database..")
 }).catch(err=>{
     console.log("something went wrong..")
 })
