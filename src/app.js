// Dependencias
const express = require("express");
const cookieParser = require("cookie-parser")
const cors = require("cors")
const path = require('path');
const config = require('./config')

//Import Rutas
const rutasTools = require('./routers/Herramientas.routes')
const rutasRoot = require('./routers/Root.routes')
const rutasUsuario = require("./routers/user.router")
const rutasURL = require("./routers/link.router")
// start
const app = express();

// setup
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: [config.FRONT_ADDRESS],
    credentials: true,
}));



// routes
app.use("/", rutasRoot)
app.use("/auth", rutasUsuario)
app.use("/url", rutasURL)
app.use('/herramientas', rutasTools);


module.exports = app;