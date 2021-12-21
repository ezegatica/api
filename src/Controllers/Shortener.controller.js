const Shortener = [];
const Link = require("../Models/Link.model");

Shortener.newUrl = async (req, res) => {
  console.log(req.body)
    try {
        const { destino, tag } = req.body;
        if (!destino)
            return res.status(400).json({ errorType: "no-destino" })

        let createdTag = tag || await generarId(5)

        let existingTag = await Link.findOne({ tag: createdTag })

        while (existingTag) {
            createdTag = await generarId(6)
            existingTag = await Link.findOne({ tag: createdTag })
        }

        const newLink = new Link({
            destino: destino,
            tag: createdTag,
            conteo: 0
        })
        const savedLink = await newLink.save();

        res.json(savedLink)

    } catch (err) {
        //console.error(err)
        res.status(500).send();
    }
}

Shortener.getAll = async (req, res) => {
    try {
        const URLs = await Link.find()
        res.json(URLs)

    } catch (err) {
        console.error(err)
        res.status(500).send();
    }
}

Shortener.deleteById = async (req, res) => {
    try{
        const id = req.params.id
        if (id === null)
            return res.status(400).json({ errorType: "no-id" })
        let existingTag = await Link.findById(id)
        if(existingTag){
            await Link.findByIdAndDelete(id)
            res.status(200).json("hecho")
        }else{
            res.status(400).json("NO HAY")
        }
    }catch(err){
        res.status(400).json("NO HAY")
    }
}

module.exports = Shortener;

function generarId(idLength) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = parseInt(idLength, 10);
    for (var i = 0; i < charactersLength; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}