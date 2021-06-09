// Dependencias
const express = require("express");
const cookieParser = require("cookie-parser")
const cors = require("cors")
const config = require('./config')
//Import Rutas
const rutasTools = require('./Routers/Herramientas.routes');
const rutasRoot = require('./Routers/Root.routes');
const rutasUsuario = require("./Routers/User.routes");
const rutasURL = require("./Routers/Link.routes");
const handle404 = require("./Middleware/redirect.mw")
// start
const app = express();

// setup
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: [config.FRONT_ADDRESS],
    credentials: true,
}));
app.use(express.static('./assets'))

// routes
app.use("/", rutasRoot)
app.use("/auth", rutasUsuario)
app.use("/url", rutasURL)
app.use('/herramientas', rutasTools);
app.use(handle404)


module.exports = app;