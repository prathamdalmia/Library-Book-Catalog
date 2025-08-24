const mongoose = require("mongoose");


const bookSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        trim : true
    },
    genre : {
        type: String,
        required : true,
        trim : true
    },
    publicationYear : {
        type: Number, 
        required : true,
        min: 1000, 
        max: 9999

    },
    author : {
        type : String ,
        required : true,
        trim : true
    },
    availability : {
        type : Boolean,
        default : true
    },
    username : {
        type : String,
        required : true,
        trim : true
    }
});

module.exports = mongoose.model('Book',bookSchema);