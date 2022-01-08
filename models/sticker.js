const { Schema, model } = require("mongoose");

const StickerSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre de sticker es obligatorio"],
    unique: true,
  },
  estado: {
    type: Boolean,
    default: true,
    required: true,
  },
  disponible: {
    type: Boolean,
    default: true,
  },
  artista: {
    type: String,
    required: true,
  },
  usuario: {
    type: Schema.Types.ObjectId, // ObjectId otro objeto que se tendra en mongo
    ref: "Usuario",
    required: true,
  },
  precio: {
    type: Number,
    default: 0,
  },
  img: {
    type: String,
    default: ''
  },
  imgs: {
    type: [String],
  },
});

// desestructurando para enviar solo las propiedades del usuario en un nuevo objeto y se retorna
StickerSchema.methods.toJSON = function () {
  const { __v, estado, ...data } = this.toObject();

  return data;
};

module.exports = model("Sticker", StickerSchema);
