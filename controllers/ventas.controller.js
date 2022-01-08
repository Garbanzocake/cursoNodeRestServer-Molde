const { response } = require("express");
const { Venta } = require("../models");

// Obtener Ventas- paginado total - populate

const obtenerVentas = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = {
    estado: true,
  };

  const [total, ventas] = await Promise.all([
    Venta.countDocuments(query),
    Venta.find(query)
      .populate("usuario" )
      .populate("categoria", "nombre")
      .skip(Number(desde))
      .limit(Number(limite)),
  ]);

  res.json({
    total,
    ventas,
  });
};

const obtenerVentasCompletadas = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = {
    estado:true,
    completada: true,
  };

  const [total, ventas] = await Promise.all([
    Venta.countDocuments(query),
    Venta.find(query)
      .populate("usuario" )
      .populate("categoria", "nombre")
      .skip(Number(desde))
      .limit(Number(limite)),
  ]);

  res.json({
    total,
    ventas,
  });
};

const obtenerVentasSinCompletar = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = {
    estado:true,
    completada: false,
  };

  const [total, ventas] = await Promise.all([
    Venta.countDocuments(query),
    Venta.find(query)
      .populate("usuario" )
      .populate("categoria", "nombre")
      .skip(Number(desde))
      .limit(Number(limite)),
  ]);

  res.json({
    total,
    ventas,
  });
};


// Obtener Ventas - populate {}

const obtenerVenta = async (req, res = response) => {
  const { id } = req.params;

  // Desactivar el usuario pero no borrarlo
  const venta = await Venta.findById(id)
    .populate("usuario")
    .populate("categoria", "nombre");

  res.json({
    venta,
  });
};


// Crear Pedido

const crearVenta = async (req, res = response) => {
  const { estado, usuario, ...body } = req.body;

  // Generar la data a guardar

  const data = {
    usuario: req.usuario._id,
    ...body,
  };

  const venta = new Venta(data);

  // Guaradar en DB
  await venta.save();

  res.status(201).json(venta);
};


// Actualizar Venta
const actualizarVenta = async (req, res = response) => {
  const { id } = req.params;

  const { estado, usuario, ...data } = req.body;

  if (data.nombre) {
    // capitalizando el nombre
    data.nombre = data.nombre.toUpperCase();
  }

  // asignando el usuario ultimo por el que hace la actualizacion
  data.usuario = req.usuario._id;

  const venta = await Venta.findByIdAndUpdate(id, data, {
    new: true,
  });

  res.json(venta);
};

// Borrar Venta

const borrarVenta = async (req, res = response) => {
  const { id } = req.params;

  const ventaBorrada = await Venta.findByIdAndUpdate(
    id,
    {
      estado: false,
    },
    {
      new: true,
    }
  );
  // {new : true} es para que se vean los cambios reflejados en la respuesta json

  res.json(ventaBorrada);
};

module.exports = {
  crearVenta,
  obtenerVentas,
  obtenerVenta,
  obtenerVentasCompletadas,
  obtenerVentasSinCompletar,
  actualizarVenta,
  borrarVenta,
};
