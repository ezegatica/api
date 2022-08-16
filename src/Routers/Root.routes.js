//Dependencias
const { Router } = require('express');
const rutas = Router();
const path = require('path');
const Link = require("../Models/Link.model")
var {readline} = require('readline');

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

rutas.post("/refresh", async (req, res) => {
    console.log(req.headers["signature"])
    console.log("repl.deploy" + JSON.stringify(req.body) + req.headers["signature"])
    let result;

    var readline = require('readline');
    var rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false
    });
    
    rl.on('line', async function(line){
       result = JSON.parse(line)
    })

    await res.setStatus(result.status).end(result.body)
    console.log("repl.deploy-success")
})

module.exports = rutas;