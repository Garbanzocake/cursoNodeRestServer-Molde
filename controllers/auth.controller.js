const { response } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");

const { generarJWT, expiredJWT } = require("../helpers/generarJwt");
const { googleVerify } = require("../helpers/google-verifiy");

const login = async (req, res = response) => {
  const { correo, password } = req.body;

  try {
    // Verificar si el email existe
    const usuario = await Usuario.findOne({
      correo,
    });
    if (!usuario) {
      return res.status(400).json({
        msg: "Usuario/password  no son correctos - correo  ",
      });
    }

    // revisar si el usuario esta activo

    if (!usuario.estado) {
      return res.status(400).json({
        msg: "Usuario no esta activo - estado:false",
      });
    }

    // verificar la contra
    const validPassword = bcryptjs.compareSync(password, usuario.password);

    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuario/password  no son correctos - password ",
      });
    }

    // generar el JWT
    const token = await generarJWT(usuario.id);

    res.json({
      msg: "Login Ok! ",
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Hable con el admin",
    });
  }
};

const googleSignin = async (req, res = response) => {
  const { id_token } = req.body;

  try {
    const { correo, nombre, img } = await googleVerify(id_token);
    let usuario = await Usuario.findOne({ correo }); //aca no encuentra usuario

    if (!usuario) {
      // Tengo que crearlo
      const data = {
        nombre,
        correo,
        password: ":P",
        img,
        google: true,
      };

      usuario = new Usuario(data);
      await usuario.save();
    }

    // Si el usuario en DB
    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Hable con el administrador, usuario bloqueado",
      });
    }

    // Generar el JWT
    const token = await generarJWT(usuario.id);

    res.json({
      token,
      usuario,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Token de Google no es válido",
    });
  }
};

const revalidarToken = async (req, res = response) => {
  const usuario = req.usuario;

  // leer la base de datos
  // const dbUser= await Usuario.findById(_id);

  // Generar el JWT
  const token = await generarJWT(usuario._id, usuario.nombre);

  return res.json({
    ok: true,
    _id: usuario._id,
    nombre: usuario.nombre,
    correo: usuario.correo,
    rol: usuario.rol,
    telefono:usuario.telefono,
    token,
  });
};

const expiradoToken = async (req, res = response) => {
  const token = req.header("x-token");

  const expirado = await expiredJWT(token);
  if (expirado) {
    

    res.json({
      ok: true,
      msg: "El token ha expirado :c",
    });
  } else {
    res.json({
      ok: false,
      msg: "Dale Papu aun te queda tiempo en el token B-)",
    });
  }
};

module.exports = {
  login,
  googleSignin,
  revalidarToken,
  expiradoToken,
};
