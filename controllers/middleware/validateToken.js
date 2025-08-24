require('dotenv').config();
const asyncHandler= require('express-async-handler')
const jwt = require('jsonwebtoken')

const validateToken = asyncHandler(async (req,res,next)=>{
    authHeader = req.headers.authorization || req.headers.Authorization
    if(!authHeader){
        res.status(400).json({error : "No token Provided"})
    }
    // console.log(authHeader);
    const token = authHeader
    // console.log("The token going for verification is ", token);
    try{
        // console.log("The token just before verify is ", token);
        // console.log("The access token from .env file is ", process.env.TOKEN_ACCESS);
        const decoded = jwt.verify(token,process.env.TOKEN_ACCESS)
        // console.log("The token going in is " , decoded);
        req.user=decoded.user
        console.log(`user is ${req.user.username}`)
        next()
    }catch(err){
        res.status(400).json({error : 'Invalid or expired token'})

    }
})


const describeToken = asyncHandler(async (req,res)=>{
    authHeader = req.headers.authorization || rew.headers.authorization
    if(!authHeader){
        res.status(400).json({error : "No token Provided"})
    }
    const token = authHeader.split(" ")[1]
    try{
        const decoded = jwt.verify(token,process.env.TOKEN_ACCESS)
        
        res.json({decoded})
    }catch(err){
        res.status(400).json({error : 'Invalid or expired token'})

    }
})

module.exports={
    validateToken,
    describeToken
}