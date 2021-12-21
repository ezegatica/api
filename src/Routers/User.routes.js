const router = require("express").Router();

const Auth = require("../Controllers/Auth.controller");

//register
router.post("/register", Auth.register)

router.post("/login", Auth.login)

router.get("/logout", Auth.logout)

router.get("/check", Auth.check)
router.post("/check", Auth.check)

module.exports = router