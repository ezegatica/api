const router = require("express").Router();
const Link = require("./models/Link.model")

//create
router.get("", async (req, res) => {
    try {
        const tag = req.params.tag
        res.json({tag: tag})

    } catch (err) {
        console.error(err)
        res.status(500).send();
    }
})



module.exports = router