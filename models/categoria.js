
const {Schema,model} = require('mongoose');


const CategoriaSchema= Schema({
    nombre: {
        type: String,
        required: [true,'El nombre es obligatorio'],
        unique:true
    },
    
    estado: {
        type: Boolean,
        default: true,
        required:true
    },
    usuario:{
        type: Schema.Types.ObjectId, // ObjectId otro objeto que se tendra en mongo
        ref: 'Usuario',
        required: true
    }
});


// desestructurando para enviar solo las propiedades del usuario en un nuevo objeto y se retorna 
CategoriaSchema.methods.toJSON = function () {

    const { __v,estado,...data } = this.toObject();
    
    return data;
}


module.exports = model('Categoria',CategoriaSchema);