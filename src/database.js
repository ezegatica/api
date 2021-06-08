const mongoose = require("mongoose")
const config = require("./config")

const uri = config.DATABASE_URL;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Base de datos conectada!");
})