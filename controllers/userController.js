const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken")
const argon2 = require("argon2")

const users = require("../model/users");


const userLogin = asyncHandler(async (req,res)=>{
    const username = req.body.username
    const password = req.body.password
    if(!username || !password){
        res.status(400).json({error : 'Give both username and password'})
        return 
    }
    try{

    const user = await users.findOne({username})
    if(!user){
        res.status(400).json({error : 'User Does Not Exist. Please Signup'})
        return 
    }
    if(await argon2.verify(user.password , password)){
        jwt.sign(
            {
                user : {
                    firstName : user.firstName,
                    lastName : user.lastName,
                    username : user.username
                }
            },
            process.env.TOKEN_ACCESS,
            {expiresIn : "24h"},
            (error , token) => {
                if(error){
                    res.status(500).json({error : 'Something Went Wrong'})
                    return
                }
                res.status(200).json({
                    user : {
                        firstName : user.firstName,
                        lastName : user.lastName,
                        username : user.username
                    },
                    token : token,
                    error : null
                })
            }
        )

    }
    else{
        res.status(400).json({error : 'Enter Correct Password'})
        return
    }
}
catch(err){
    res.status(500).json({error : err || 'Something Went Wrong'})
}


})



const userSignup = asyncHandler(async (req,res) => {
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const username = req.body.username
    const password = req.body.password
    if(!username || !password || !firstName || !lastName){
        res.status(400).json({error : 'Enter All Credentials!'})
        return 
    }
    const user = await users.findOne({username})
    if(user){
        res.status(400).json({error : 'User Already Exists. Please Login'})
        return 
    }
    try{
        const newUser = await users.create({
            firstName,
            lastName,
            username,
            password : await argon2.hash(password)
        })
        await newUser.save()
        jwt.sign(
            {
                user : {
                    firstName : newUser.firstName,
                    lastName : newUser.lastName,
                    username : newUser.username
                }
            },
            process.env.TOKEN_ACCESS,
            {expiresIn : "24h"},
            (error , token) => {
                if(error){
                    res.status(500).json({error : 'Something Went Wrong'})
                    return
                }
                res.status(200).json({
                    user : {
                        firstName : newUser.firstName,
                        lastName : newUser.lastName,
                        username : newUser.username
                    },
                    token : token,
                    error : null
                })
            }
        )

    }catch(err){
        res.status(500).json({error : err.message || 'Something Went Wrong'})
    }



})




module.exports = {userLogin,userSignup}
