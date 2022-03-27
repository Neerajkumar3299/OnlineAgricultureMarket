const express=require("express")
const router=express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { findOne } = require("../models/User");
const getuserid=require("../middleware/getuserid")

const userModel=require("../models/User")
const cropModel=require("../models/Crop")
const tradeModel=require("../models/Trade")

//initialize salt to add in password
const saltRounds=10;

// initialize JWT secret key (JWT secret key should be stored at a place where no-one can see like env file) -------------------------------
const JWT_SECRET_KEY="Thisisneerajkumar@1234@$/12yadav";

// ROUTE-1: end point for creating new user "/api/auth/createuser"  (Login not required)
router.post("/createuser",

// Perform validation
[

    //check length of name
    body('fname',"First Name should not be less than 3").isLength({min:3}),
    body('lname',"Last Name should not be less than 3").isLength({min:3}),

    // check email
    body('email',"Invalid Email").isEmail(),

    // password must be at least 5 chars long
    body('password',"Passord Length should be greater than 5").isLength({ min: 5 }),

    // check mobile no
    body("mobile","Invalid mobile no").isNumeric(),

    // check mobile no length
    body("mobile","mobile no must be of 10 digits").isLength({min:10})
],

(req,res)=>{

    // Check errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // user bcrypt to hash the password to store in encoded formate
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {

        // Get password in hashed Formate
        const hashedPassword=hash;

        // Store data in database
        const data=new userModel({
            fname:req.body.fname,
            lname:req.body.lname,
            email:req.body.email,
            mobile:req.body.mobile,
            userType:req.body.userType,
            address:req.body.address,
            password:hashedPassword
        })
        data.save().then(()=>{
            
            // Give response of success if data has been successfully stored
            res.json({"status":true
        })
        }).catch(err=>{
            res.send(err)
        })
    })
    
})

// ROUTE-2: create end-point for login purpose "/api/auth/login/" (Login not required)  --------------------------------------------------
router.post("/login",

// Perform validation
[
    // check email
    body('email',"Invalid Email").isEmail(),

    // password must be at least 5 chars long
    body('password',"Passord Length should be greater than 5").isLength({ min: 5 })
],
async (req,res)=>{
    // Check errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
        const data=await userModel.findOne({email:req.body.email})
        // res.send(data)
        if(!data){
            res.json({error:"Please login with valid account"})
        }
        else{

            // Check whether password is correct or not
            let status=await bcrypt.compare(req.body.password, data.password)
            if(status){
                const jwt_sign_data={
                    user:{
                        id:data._id
                    }

                }

                // Get token using data id
                var token = jwt.sign(jwt_sign_data, JWT_SECRET_KEY);

                // Send token as response
                res.send({token:token})
            }
            else{
                res.json({error:"Please login with valid account"})
            }
        }
    }catch(error){
        res.status(400).json({error:"Please enter valid credentials"})
    }
})


// Router 3: End point for getting data from data if we have token "/api/auth/getuser/" (Login required) --------------------------------
//getuserid is a middleware that decodes the token sent in header and returns fetch data with the help of which token was created
router.post("/getuser",getuserid,async (req,res)=>{
    try{
        console.log(req.user)

        // Get user id
        const id=req.user.id

        // Fetch data of user from database using id
        const data=await userModel.findById(_id=id)
        if(!data){
            res.send({error:"No data found"})
        }
        else{
            res.send(data)
        }
    }catch(err){
        res.send(err)
    }
})

router.post("/createcrop", (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const data=new cropModel({
        type:req.body.type,
        name:req.body.name,
        quantity:req.body.quantity,
        rate:req.body.rate,
        farmer:req.body.farmer
    })

    data.save().then(() => {
        res.json({"status":true})
    }).catch(err => {res.send(err)})
})

router.post("/getcrop",async (req,res)=>{
    try{

        // Get crop id
        const id=req.body.id

        // Fetch data of crop from database using id
        const data=await cropModel.findById(_id=id)
        if(!data){
            res.send({error:"No data found"})
        }
        else{
            res.send(data)
        }
    }catch(err){
        res.send(err)
    }
})


router.post("/trade", (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const data=new tradeModel({
        quantity:req.body.quantity,
        amount:req.body.amount,
        trader:req.body.trader,
        crop:req.body.crop
    })

    data.save().then(() => {
        res.json({"status":true})
    }).catch(err => {res.send(err)})
})

router.post("/gettrade",async (req,res)=>{
    try{

        // Get trade id
        const id=req.body.id

        // Fetch data of trade from database using id
        const data=await tradeModel.findById(_id=id)
        if(!data){
            res.send({error:"No data found"})
        }
        else{
            res.send(data)
        }
    }catch(err){
        res.send(err)
    }
})


module.exports=router