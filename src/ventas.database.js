const mongoose = require("mongoose")
const config = require("./config")

const uri = config.DATABASE_VENTAS_URL;
const conn = mongoose.createConnection(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

conn.once('open', () => {
    console.log("Base de datos '2' conectada!");
})

module.exports = conn;