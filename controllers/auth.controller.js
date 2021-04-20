const { response } = require("express");
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/generarJwt");


const login =async (req,res=response)=>{

    const { correo,password,estado}= req.body;

    try {
        // Verificar si el email existe
        const usuario = await Usuario.findOne({correo});
        if ( !usuario) {
            return res.status(400).json({
                msg: 'Usuario/password  no son correctos - correo  '
            })
        }

        // revisar si el usuario esta activo
 
        if ( !usuario.estado ) {
            return res.status(400).json({
                msg: 'Usuario no esta activo - estado:false'
            })
        }

        // verificar la contra
        const validPassword = bcryptjs.compareSync(password,usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario/password  no son correctos - password '
            })
        }

        // generar el JWT
        const token = await generarJWT( usuario.id );



        res.json({
            msg: 'Login Ok! ',
            usuario,
            token
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Hable con el admin'
        })
    }


}

module.exports = { 
    login
}