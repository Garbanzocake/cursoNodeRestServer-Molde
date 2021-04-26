const {
    Schema,
    model
} = require('mongoose');


const ProductoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId, // ObjectId otro objeto que se tendra en mongo
        ref: 'Usuario',
        required: true
    },
    precio: {
        type: Number,
        default: 0,

    },
    categoria: {
        type: Schema.Types.ObjectId, // ObjectId otro objeto que se tendra en mongo
        ref: 'Categoria',
        required: true
    },
    descripcion: {
        type: String
    },
    disponible: {
        type: Boolean,
        default: true
    },
    img: {
            type: String
        }


});


// desestructurando para enviar solo las propiedades del usuario en un nuevo objeto y se retorna 
ProductoSchema.methods.toJSON = function () {

    const {
        __v,
        estado,
        ...data
    } = this.toObject();

    return data;
}


module.exports = model('Producto', ProductoSchema);