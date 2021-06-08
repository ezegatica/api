// config
const express = require("express");
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const path = require('path');

dotenv.config();

const Link = require("./models/Link.model")

//Rutas
const rutasTools = require('./routers/Herramientas.routes')
const rutasRoot = require('./routers/Root.routes')


// start
const app = express();
const PORT = process.env.PORT || 5000;

// setup
app.listen(PORT, () => console.log(`Server iniciado en el puerto: ${PORT}`))
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: [process.env.FRONT_ADDRESS],
    credentials: true,
}));

const uri = process.env.DB_URL;
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

// routes

app.use("/auth", require("./routers/user.router"))
app.use("/url", require("./routers/link.router"))

app.use("/admin", async (req, res) => {
    res.redirect('https://admin.eze.wtf')
})
app.use("/panel", async (req, res) => {
    res.redirect('https://admin.eze.wtf')
})
app.get('/ping', (req, res) => {
    res.json('Pong!')
});
app.use('/herramientas', rutasTools);
app.use("/", rutasRoot)


app.get("/fonts/FontAwesome.woff2", (req, res) => {res.sendFile(path.join(__dirname+'/assets/fonts/FontAwesome.woff2'));})
app.get("/fonts/clock.woff", (req, res) => {res.sendFile(path.join(__dirname+'/assets/fonts/clock.woff'));})
app.get("/image/favicon.ico", (req, res) => {res.sendFile(path.join(__dirname+'/assets/images/favicon.ico'));})
app.get("/robots.txt", (req, res) => {res.sendFile(path.join(__dirname+'/assets/common/robots.txt'));})

app.use("/:tag", async (req, res) => {
    try {
        const tag = req.params.tag
        let existingTag = await Link.findOne({ tag: tag })
        const data = existingTag;
        if (existingTag) {
            await Link.updateOne({ _id: data._id }, { $inc: { conteo: 1 } })
            res.redirect(existingTag.destino)
        } else {
            res.sendFile(path.join(__dirname+'/404.html'));
            // res.redirect('https://eze.wtf')

        }
    } catch (err) {
        console.error(err)
        res.status(500).send();
    }

})
app.use("/", async (req, res) => {
    // res.redirect(process.env.FRONT_ADDRESS)
    res.sendFile(path.join(__dirname+'/index.html'));
})
