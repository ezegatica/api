const Ventas = [];
const Item = require("../Models/Item.model");

Ventas.newItem = async (req, res) => {
    const { nombre, descripcion, short_descripcion, precio, imagen } = req.body;
    const item = new Item({
        nombre,
        descripcion,
        short_descripcion,
        precio,
        imagen: imagen.split("\n").filter(e => e !== "")
    });
    const newItem = await item.save();
    res.status(200).json({
        message: "ok",
        item: newItem
    })
}

Ventas.getAll = async (req, res) => {
    const items = await Item.find({});
    res.json(items);
}

Ventas.deleteByID = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await Item.findById(id);
        if (!item) {
            res.status(404).json({
                message: "Item not found"
            })
        }
        await item.remove();
        return res.json(item);
    }
    catch (error) {
        return res.status(500).json({
            message: "Error al eliminar el item",
        });
    }
}

Ventas.marcarComoVendido = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await Item.findById(id);
        if (!item) {
            res.status(404).json({
                message: "Item not found"
            })
        }
        item.vendido = true;
        if (!item.short_descripcion){
            item.short_descripcion = " ";
        }
        await item.save();
        return res.json(item);
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Error al editar el item",
        });
    }
}
Ventas.marcarComoNoVendido = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await Item.findById(id);
        if (!item) {
            res.status(404).json({
                message: "Item not found"
            })
        }
        item.vendido = false;
        if (!item.short_descripcion){
            item.short_descripcion = " ";
        }
        await item.save();
        return res.json(item);
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Error al editar el item",
        });
    }
}

Ventas.editarByID = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await Item.findById(id);
        if (!item) {
            res.status(404).json({
                message: "Item not found"
            })
        }
        const imagen = req.body.imagen.split("\n").filter(e => e !== "") || item.imagen;
        const { nombre, descripcion, short_descripcion, precio, vendido } = req.body;
        const newItem = await Item.findByIdAndUpdate(id, {
            nombre: nombre || item.nombre,
            descripcion: descripcion || item.descripcion,
            short_descripcion: short_descripcion || item.short_descripcion,
            precio: parseInt(precio, 10) || item.precio,
            vendido: vendido !== undefined ? vendido : item.vendido,
            imagen
        }, {new: true});
        return res.json(newItem);
    }
    catch (error) {
        return res.status(500).json({
            message: "Error al editar el item",
        });
    }
}

module.exports = Ventas;