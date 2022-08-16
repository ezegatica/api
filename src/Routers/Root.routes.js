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
    res.json({
        message: "Hola! Bienvenido a mi api, no tengo nada que decir. Si descubriste esto por tu cuenta, porfi no rompas nada c:",
        website: "https://ezegatica.com"
    })
})

rutas.get("/:username/status/:id", Herramientas.twitter)

module.exports = rutas;