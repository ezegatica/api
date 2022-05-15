const router = require("express").Router();
const auth = require("../Middleware/auth.mw");
const Ventas = require("../Controllers/Ventas.controller");

router.post("/new", auth, Ventas.newItem);
router.get("/all", auth, Ventas.getAll);
router.delete("/:id", auth, Ventas.deleteByID);
router.put("/vendido/:id", auth, Ventas.marcarComoVendido)
router.put("/novendido/:id", auth, Ventas.marcarComoNoVendido)
router.put("/edit/:id", auth, Ventas.editarByID)
module.exports = router
