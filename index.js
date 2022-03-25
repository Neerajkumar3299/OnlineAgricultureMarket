const { json } = require("body-parser")
var express=require("express")
var app=express()
var port=3000

//Middleware..
app.use(json())

app.get("/",(req,res)=>{
    console.log("Neeraj kumar")
    res.send("Neeraj kumar")
})
app.listen(port,(req,res)=>{
    console.log(`Listening at ${port}`)
})