const {
    response,
    request
} = require("express");
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const esAdminRole = (req = request, res = response, next) => {

    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se quiere verificar rol sin validar token'
        })
    }

    const {
        rol,
        nombre
    } = req.usuario;

    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${ nombre } no es Administrador `
        })
    }

    next();
}

const tieneRole = (...roles) => {

    return (req, res = response, next) => {

        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se quiere verificar rol sin validar token'
            })
        }

        if (!roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                msg: `El servicio require uno de estos roles ${ roles } `
            })
        }



        next();
    }


}



module.exports = {
    esAdminRole,
    tieneRole
}