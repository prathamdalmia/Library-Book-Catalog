//Import depencies
require('dotenv').config(); 
const express = require("express");
const cors = require("cors");
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes')
const libRoutes = require('./routes/libRoutes')

//create express app
const app = express();
connectDB();

//middleware 
app.use(cors());
app.use(express.json())



// routing 
app.use("/api/user",userRoutes)
app.use("/api/lib",libRoutes)

//start server
const port  =  process.env.PORT||5000;
app.listen( port , () => console.log(`Listening to port ${port}`));

