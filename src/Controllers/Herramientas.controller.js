const Herramientas = [];
const Crypto = require('crypto');
const ytdl = require("ytdl-core")

Herramientas.salt = async (req, res) => {
    try {
        const input = parseInt(req.params.id, 10);
        const regex = /^\d+$/;
        const valid = regex.test(input);
        if (!valid) { return res.status(400).json({ message: 'Solo se pueden ingresar numeros' }) }
        if (input <= 0 || input > 8192) return res.status(400).json({ message: "El numero de bytes no puede ser menor a 1, o mayor a 8192" })
        const salt = Crypto.randomBytes(input).toString('hex')
        res.json({ resultado: salt })
    } catch (error) {
        res.status(500).json({ message: "Error de servidor interno", error: error.message })
    }
}

Herramientas.youtube = async (req, res) => {
    var URL = req.query.URL || req.query.v;
    res.header('Content-Disposition', 'attachment; filename="video.mp4"');
    try {
        ytdl(URL, {
            format: 'mp4'
        }).pipe(res)
    } catch (e) {
        res.json({
            error: 'No se pudo encontrar un video con esa ID'
        })
    }
}


module.exports = Herramientas;