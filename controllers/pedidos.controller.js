const { response } = require("express");
const { Pedido } = require("../models");

// Obtener Pedidos- paginado total - populate

const obtenerPedidos = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = {
    estado: true,
  };

  const [total, pedidos] = await Promise.all([
    Pedido.countDocuments(query),
    Pedido.find(query)
      .populate("usuario","correo")
      .populate("producto")
      .skip(Number(desde))
      .limit(Number(limite)),
  ]);

  res.json({
    total,
    pedidos
  });
};

const obtenerPedidosSinDespachar = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = {
    despachado: false,
  };

  const [total, pedidos] = await Promise.all([
    Pedido.countDocuments(query),
    Pedido.find(query)
      .populate("usuario","correo")
      .populate("producto")
      .skip(Number(desde))
      .limit(Number(limite)),
  ]);

  res.json({
    total,
    pedidos
  });
};

// Obtener Pedido - populate {}

const obtenerPedido = async (req, res = response) => {
  const { id } = req.params;

  // Desactivar el usuario pero no borrarlo
  const pedido = await Pedido.findById(id)
    .populate("usuario","correo")
    .populate("producto" )
    .populate("sticker");

  res.json({
    pedido,
  });
};

// Crear Pedido

const crearPedido = async (req, res = response) => {
  const { estado, usuario, ...body } = req.body;

  // Generar la data a guardar

  const data = {
    usuario: req.usuario._id,
    ...body,
  };

  const pedido = new Pedido(data);

  // Guaradar en DB
  await pedido.save();

  res.status(201).json(pedido);
};

// Actualizar Pedido
const actualizarPedido = async (req, res = response) => {
  const { id } = req.params;

  const { estado, usuario, ...data } = req.body;

  if (data.nombre) {
    // capitalizando el nombre
    data.nombre = data.nombre.toUpperCase();
  }

  // asignando el usuario ultimo por el que hace la actualizacion
  data.usuario = req.usuario._id;

  const pedido = await Pedido.findByIdAndUpdate(id, data, {
    new: true,
  });

  res.json(pedido);
};

// Borrar Pedido

const borrarPedido = async (req, res = response) => {
  const { id } = req.params;

  const pedidoBorrado = await Pedido.findByIdAndDelete(id );
  // { new: true, }
  // {new : true} es para que se vean los cambios reflejados en la respuesta json

  res.json(pedidoBorrado);
};

module.exports = {
  crearPedido,
  obtenerPedidos,
  obtenerPedido,
  obtenerPedidosSinDespachar,
  actualizarPedido,
  borrarPedido,
};
