const { Schema, model } = require("mongoose");

const PedidoSchema = Schema({
  
  producto: {
    type: Schema.Types.ObjectId, // ObjectId otro objeto que se tendra en mongo
    ref: "Producto",
    required: true,
  },
  unidades: {
    type: Number,
    default: 0,
  },
  usuario: {
    type: Schema.Types.ObjectId, // ObjectId otro objeto que se tendra en mongo
    ref: "Usuario",
    required: true,
  },
  stickers: {
    type: [Schema.Types.ObjectId], // ObjectId otro objeto que se tendra en mongo
    ref: "Sticker",
  },
  subtotal: {
    type: Number,
    default: 0,
    required:true
  },
  instrucciones: {
    type: [String],
    required: true,
  },
  talla: {
    type: String,
    required: true,
  },
  estado:{
    type: Boolean,
    default:true
  },
  despachado:{
    type:Boolean,
    default:false
  }
});

// desestructurando para enviar solo las propiedades del usuario en un nuevo objeto y se retorna
PedidoSchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();

  return data;
};

module.exports = model("Pedido", PedidoSchema);
