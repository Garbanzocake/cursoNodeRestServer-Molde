const { response,request } = require("express");
const { Sticker } = require("../models");

// Obtener Stickers- paginado total - populate

const getStickers = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = {
    estado: true,
  };

  const [total, stickers] = await Promise.all([
    Sticker.countDocuments(query),
    Sticker.find(query)
      .populate("usuario", "nombre")
      .skip(Number(desde))
      .limit(Number(limite)),
  ]);

  res.json({
    total,
    stickers,
  });
};

// Obtener Sticker - populate {}

const obtenerSticker = async (req=request, res = response) => {
  
  const { id } = req.params;
  
  // Desactivar el usuario pero no borrarlo
  const sticker = await Sticker.findById(id).populate("usuario", "nombre");
 

  res.json({
    ok:true,
    sticker
    });
};

// Crear Sticker

const crearSticker = async (req, res = response) => {
  const nombre = req.body.nombre.toUpperCase();
  const artista = req.body.artista.toUpperCase();
const precio= req.body.precio;
  //   Verificar si ya existe o no
  const stickerDB = await Sticker.findOne({
    nombre,
  });

  if (stickerDB) {
    return res.status(400).json({
      msg: `El Sticker ${stickerDB.nombre},ya existe`,
    });
  }

  // Generar la data a guardar

  const data = {
    nombre,
    artista,
    precio,
    usuario: req.usuario._id,
  };

  const sticker = new Sticker(data);

  // Guaradar en DB
  await sticker.save();

  res.status(201).json(sticker);
};

// Actualizar Categoria
const actualizarSticker = async (req, res = response) => {
  const { id } = req.params;

  const { estado, usuario, ...data } = req.body;

  // capitalizando el nombre
  data.nombre = data.nombre.toUpperCase();
  // asignando el usuario ultimo por el que hace la actualizacion
  data.usuario = req.usuario._id;

  const sticker = await Sticker.findByIdAndUpdate(id, data, {
    new: true,
  });

  res.json(sticker);
};

// Borrar Sticker

const borrarSticker = async (req, res = response) => {
  const { id } = req.params;

  const sticker = await Sticker.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );
  // {new : true} es para que se vean los cambios reflejados en la respuesta json

  res.json(sticker);
};

module.exports = {
  crearSticker,
  getStickers,
  actualizarSticker,
  borrarSticker,
  obtenerSticker,
};
