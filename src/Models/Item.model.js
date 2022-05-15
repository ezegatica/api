const mongoose = require("mongoose")

const mongooseCoon = require("../ventas.database");

const ItemSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'Proporcione un nombre para este objeto'],
  },
  short_descripcion: {
    type: String,
    required: [true, 'Proporcione una descripcion para este objeto'],
  },
  descripcion: {
    type: String,
    required: [true, 'Proporcione una descripcion para este objeto'],
  },
  imagen: {
    type: Array,
    default:
      [
        'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'
      ]
  },
  precio: {
    type: Number,
    required: [true, 'Proporcione un precio para este objeto']
  },
  vendido: {
    type: Boolean,
    default: false,
  }
}, {
  versionKey: false,
  timestamps: false
});

module.exports = mongooseCoon.model('Item', ItemSchema);
