const { Schema, model } = require("mongoose");

const VentaSchema = Schema({
  estado: {
    type: Boolean,
    default: true,
    required: true,
  },
  completada: {
    type: Boolean,
    default: false,
    required: true,
  },
  pedidos: {
    type: [Schema.Types.ObjectId], // ObjectId otro objeto que se tendra en mongo
    ref: "Pedido",
    required: true,
  },
  total: {
    type: Number,
    default: 0,
    required: true,
  },
  subtotal: {
    type: Number,
    default: 0,
    required: true,
  },
  envio: {
    type: Number,
    default: 0,
    required: true,
  },
  fecha: {
    type: Date,
    default: Date.now,
    required: true,
  },
  fechaEntrega: {
    type: Date,
    default: undefined,
  },
  usuario: {
    type: Schema.Types.ObjectId, // ObjectId otro objeto que se tendra en mongo
    ref: "Usuario",
    required: true,
  },
  direccion: {
    type: String,
    default: "",
    required: true,
  },
  detalleDireccion: {
    type: String,
    default: "",
    required: true,
  },
});

// desestructurando para enviar solo las propiedades del usuario en un nuevo objeto y se retorna
VentaSchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();

  return data;
};

module.exports = model("Venta", VentaSchema);
