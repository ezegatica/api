const mongoose = require("mongoose");

const mongooseConn = require("../database");

const linkSchema = new mongoose.Schema({
    destino:{
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    conteo:{
        type: Number
    }
    // ,
    // owner: {
    //     type: String,
    //     required: true
    // }
})

const Link = mongooseConn.model("link", linkSchema)

module.exports = Link;