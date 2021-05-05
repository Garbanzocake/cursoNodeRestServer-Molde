const {
    response,
    request
} = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT} = require('../helpers/generarJwt');


const usuariosGet = async (req = request, res = response) => {

    const {
        limite = 5, desde = 0
    } = req.query;
    const query = {
        estado: true
    };

    // const usuarios = await Usuario.find(query).skip(Number(desde)).limit(Number(limite)); 
    // const total = await Usuario.countDocuments(query);

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query).skip(Number(desde)).limit(Number(limite))

    ]);


    res.json({
        total,
        usuarios
    })
}

const obtenerUsuario = async (req, res = response) => {


    const {
        id
    } = req.params;

    // Obtener el usuario
    const usuario = await Usuario.findById(id);



    res.json({
        usuario
    })
}


const usuariosPut = async (req, res = response) => {
    const {
        id
    } = req.params;

    const {
        password,
        google,
        correo,
        ...resto
    } = req.body;



    if (password) {

        // encriptar la contra,por defecto el genSaltSync hace 10 vueltas de encriptacion
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);

    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        ok: true,
        msg: 'put API - Controlador',
        id,
        usuario

    })
}


const usuariosPost = async (req, res = response) => {


    const {
        nombre,
        correo,
        password,
        rol
    } = req.body;
    const usuario = new Usuario({
        nombre,
        correo,
        password,
        rol
    });


    // encriptar la contra,por defecto el genSaltSync hace 10 vueltas de encriptacion
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    // guardar en base de datos
    await usuario.save();

    // generar el JWT
    const token = await generarJWT(usuario._id);

    res.json({
        ok: true,
        msg: 'post API - Controlador',
        usuario,
        token
    })
}



const usuariosDelete = async (req, res = response) => {


    const {
        id
    } = req.params;

    // Fisicamente lo borramos
    // const usuario= await Usuario.findByIdAndDelete( id );

    // Desactivar el usuario pero no borrarlo
    const usuario = await Usuario.findByIdAndUpdate(id, {
        estado: false
    });


    res.json(usuario)
}

const usuariosPatch = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'patch API - Controlador'
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
    obtenerUsuario
}