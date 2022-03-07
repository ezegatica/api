//Dependencias
const { Router } = require('express');
const rutas = Router();
const path = require('path');
const Link = require("../Models/Link.model")

//Controller
const Herramientas = require('../Controllers/Herramientas.controller');
const Actions = require('../Controllers/Actions.controller');

//Rutas:
rutas.get('/watch', Herramientas.youtube);
rutas.get('/admin', Actions.goToPanel);
rutas.get('/panel', Actions.goToPanel);
rutas.get("/ping", Actions.pong)

 
//Archivos
rutas.get("/", async (req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, '../Pages') });
})
rutas.get("/eth", async (req, res) => {
    res.send("0xcc5142fe409BE2232428595fD48D6c4a514c4cF0");
})
rutas.get("/fonts/:font", (req, res) => {
    res.sendFile(req.params.font, { root: path.join(__dirname, '../assets/Fonts') });
})
rutas.get("/image/favicon.ico", (req, res) => {
    res.sendFile("favicon.ico", { root: path.join(__dirname, '../assets/Images') });
})
rutas.get("/robots.txt", (req, res) => {
    res.sendFile("robots.txt", { root: path.join(__dirname, '../assets/Common') });
})
rutas.get("/:username/status/:id", Herramientas.twitter)

//URL-Shortener
rutas.get("/:tag", async (req, res) => {
    try {
        const tag = req.params.tag
        let existingTag = await Link.findOne({ tag: tag })
        const data = existingTag;
        if (existingTag) {
            await Link.updateOne({ _id: data._id }, { $inc: { conteo: 1 } })
            res.redirect(existingTag.destino)
        } else {
            res.sendFile('404page-test.html', { root: path.join(__dirname, '../Pages'), name:'hola' });
        }
    } catch (err) {
        console.error(err)
        res.status(500).send();
    }

})
module.exports = rutas;