const mongoose = require("mongoose")

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

const Link = mongoose.model("link", linkSchema)

module.exports = Link;