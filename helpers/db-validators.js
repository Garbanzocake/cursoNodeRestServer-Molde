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


module.exports= { 
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}