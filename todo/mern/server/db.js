//set up db
const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config()

const connectDB = process.env.DB

mongoose.connect(connectDB, {
    useUnifiedTopology:true,
    useNewUrlParser:true
}, (err) => {
    if(err) return console.error(err)
    console.log("Db connected successfully")
})