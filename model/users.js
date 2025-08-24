const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName :{
        type : String,
        trim : true,
        required : true
    },
    lastName :{
        type : String,
        trim : true,
        required : true
    },
    username : {
        type : String,
        trim : true,
        unique : true,
        required : true
    },
    password : {
        type : String,
        trim : true,
        required : true
    }
})

module.exports = mongoose.model("users" , userSchema)