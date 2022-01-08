const {
  Usuario,
  Categoria,
  Producto,
  Sticker,
  Pedido,
  Venta,
  Role
} = require("../models");


const esRoleValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El Rol ${rol} no esta registrado en la BD`);
  }
};

const emailExiste = async (correo = "") => {
  // Verificar si el correo existe

  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error(`El Correo: ${correo} ya ha sido usado en la BD`);
  }
};

const existeUsuarioPorId = async (id) => {
  // Verificar si el correo existe

  const existeId = await Usuario.findById(id);
  if (!existeId) {
    throw new Error(`El id: ${id} no existe en la BD`);
  }
};

// Validadores de categoria
const existeCategoriaPorId = async (id) => {
  // Verificar si la categoria existe

  const existeCategoria = await Categoria.findById(id);
  if (!existeCategoria) {
    throw new Error(`El id: ${id} no existe en la BD`);
  }
};
// Validadores de producto
const existeProductoPorId = async (id) => {
  // Verificar si la categoria existe

  const existeProducto = await Producto.findById(id);
  if (!existeProducto) {
    throw new Error(`El id: ${id} no existe en la BD`);
  }
};

// Validadores de categoria
const existeStickerPorId = async (id) => {
  // Verificar si la categoria existe

  const existeSticker = await Sticker.findById(id);
  if (!existeSticker) {
    throw new Error(`El id: ${id} no existe en la BD`);
  }
};

// Validadores de producto
const existePedidoPorId = async (id) => {
  // Verificar si la categoria existe

  const existePedido = await Pedido.findById(id);
  if (!existePedido) {
    throw new Error(`El id: ${id} no existe en la BD`);
  }
};

// Validadores de ventas
const existeVentaPorId = async (id) => {
  // Verificar si la categoria existe

  const existeVenta = await Venta.findById(id);
  if (!existeVenta) {
    throw new Error(`El id: ${id} no existe en la BD`);
  }
};

// Validar colecciones permitidas
const coleccionesPermitidas = (coleccion = "", colecciones = []) => {
  const incluida = colecciones.includes(coleccion);

  if (!incluida) {
    throw new Error(
      `La coleccion ${coleccion} no es permitida, ${colecciones}`
    );
  }

  return true;
};

module.exports = {
  esRoleValido,
  emailExiste,
  coleccionesPermitidas,
  existeUsuarioPorId,
  existeCategoriaPorId,
  existeProductoPorId,
  existeStickerPorId,
  existeVentaPorId,
  existePedidoPorId
};
