const { Categoria, Producto } = require('../models');
const Role = require('../models/role');
const Usuario = require('../models/usuario');


const esRoleValido = async(rol = '') =>{
    const existeRol = await Role.findOne({ rol});
    if (!existeRol) {
        throw new Error(`El Rol ${rol} no esta registrado en la BD`);
    }
}


const emailExiste = async(correo='')=>{

    // Verificar si el correo existe
    
    const existeEmail = await Usuario.findOne({correo});
    if ( existeEmail) {
        throw new Error(`El Correo: ${correo} ya ha sido usado en la BD`);
    }


}


const existeUsuarioPorId = async(id)=>{

    // Verificar si el correo existe
    
    const existeId = await Usuario.findById(id);
    if ( !existeId) {
        throw new Error(`El id: ${id} no existe en la BD`);
    }


}

// Validadores de categoria
const existeCategoriaPorId = async(id)=>{

    // Verificar si la categoria existe
    
    const existeCategoria = await Categoria.findById(id);
    if ( !existeCategoria) {
        throw new Error(`El id: ${id} no existe en la BD`);
    }


}
// Validadores de producto
const existeProductoPorId = async(id)=>{

    // Verificar si la categoria existe
    
    const existeProducto = await Producto.findById(id);
    if ( !existeProducto) {
        throw new Error(`El id: ${id} no existe en la BD`);
    }


}
// Validar colecciones permitidas
const coleccionesPermitidas = (coleccion='',colecciones=[])=>{

    const incluida =  colecciones.includes(coleccion);
    
    if (!incluida) {
        throw new Error(`La coleccion ${coleccion} no es permitida, ${colecciones}`);   
    }


    return true;



}



module.exports= { 
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId,
    coleccionesPermitidas
}