const express=require("express")
const app=express()

//import db file
const db=require("./db")

//initialize port no
const port=5000

// middleware for parsing data through body
app.use(express.json())

// landing page
app.get("/",(req,res)=>{
    res.send("Hello Neeraj!!")
})

//create routes for farmer
app.use("/api/auth/",require("./routes/auth"))

// create route for 


// check whether app is working or not
app.listen(port,(req,res)=>{
    console.log(`listening at http://localhost:${port}`)
})