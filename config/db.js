const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URL);
        console.log(`DB connected ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error : ${error.message}`);
        process.exit(1);
    }

};

module.exports = connectDb;