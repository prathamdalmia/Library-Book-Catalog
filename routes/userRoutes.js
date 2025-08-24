const express = require("express")
const router = express.Router()
const userController = require('../controllers/userController')

// import all user controller 

const {userLogin,userSignup} = userController


//import validate Token middleware 
// const {validateToken,describeToken} = require('../controllers/middleware/validateToken')



router.post('/login',userLogin)
router.post('/signup',userSignup)

module.exports = router



