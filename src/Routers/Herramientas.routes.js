//Dependencias
const { Router } = require('express');
const rutas = Router();
//Controller
const Herramientas = require('../Controllers/Herramientas.controller');

rutas.get('/salt/:id', Herramientas.salt);
rutas.get('/youtube', Herramientas.youtube);
rutas.get('/twitter', Herramientas.twitter);
rutas.get('/reddit', Herramientas.reddit);
rutas.get('/yt', Herramientas.youtube);

 
module.exports = rutas;