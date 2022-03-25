const jwt=require("jsonwebtoken")
const JWT_SECRET_KEY="Thisisneerajkumar@1234@$/12yadav";

const getuserid=(req,res,next)=>{
    try{
        const token=req.header("token")
        if(!token){
            res.send({error:"Invalid Token"})
        }
        else{

            // Verify token with JWT_SECRET_KEY
            let data=jwt.verify(token,JWT_SECRET_KEY)
            req.user=data.user
        }
        next()
    }
    catch(error){
        res.status(401).send({error:"No data found"})
    }
}
module.exports=getuserid