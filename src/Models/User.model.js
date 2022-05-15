const mongoose = require("mongoose");

const mongooseConn = require("../database");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true
    }
})

const User = mongooseConn.model("user", userSchema)

module.exports = User;