const router = require("express").Router();
const auth = require("../Middleware/auth.mw");
const Shortener = require("../Controllers/Shortener.controller");
//create
router.post("/new", auth, Shortener.newUrl);
router.get('/all', auth, Shortener.getAll); 
router.delete('/:id', auth, Shortener.deleteById)

module.exports = router
