//Connecting to MongoDB
const mongoose = require('mongoose')
const dotenv = require('dotenv').config;

const connectMongoose = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGOURI)
        console.log("DB Connected")
    }
    catch (error){
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectMongoose
