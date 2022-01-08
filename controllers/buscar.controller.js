const { response } = require("express");
const {
  Usuario,
  Categoria,
  Producto,
  Sticker,
  Pedido,
  Venta,
} = require("../models");

const { ObjectId } = require("mongoose").Types;

const coleccionesPermitidas = [
  "usuarios",
  "categorias",
  "productos",
  "productosCategorias",
  "stickers",
  "roles",
  "pedidosUsuarios",
  "pedidosUsuariosSinDespacho",
  "ventasUsuarios",
];

const buscarUsuarios = async (termino = "", res = response) => {
  const esMongoId = ObjectId.isValid(termino); //TRUE

  if (esMongoId) {
    const usuario = await Usuario.findById(termino);
    return res.json({
      results: usuario ? [usuario] : [],
    });
  }

  const regex = new RegExp(termino, "i"); //volver una expresion regular lo que venga en el termino para que no sea casesensitive

  const usuarios = await Usuario.find({
    $or: [
      {
        nombre: regex,
      },
      {
        correo: regex,
      },
    ],
    $and: [
      {
        estado: true,
      },
    ],
  });

  res.json({
    results: usuarios,
  });
};

const buscarCategorias = async (termino = "", res = response) => {
  const esMongoId = ObjectId.isValid(termino); //TRUE

  if (esMongoId) {
    const categoria = await Categoria.findById(termino);
    return res.json({
      results: categoria ? [categoria] : [],
    });
  }

  const regex = new RegExp(termino, "i"); //volver una expresion regular lo que venga en el termino para que no sea casesensitive

  const categorias = await Categoria.find({
    nombre: regex,
    estado: true,
  });

  res.json({
    results: categorias,
  });
};
const buscarProductos = async (termino = "", res = response) => {
  const esMongoId = ObjectId.isValid(termino); //TRUE

  if (esMongoId) {
    const producto = await Producto.findById(termino).populate(
      "categoria",
      "nombre"
    );
    return res.json({
      results: producto ? [producto] : [],
    });
  }

  const regex = new RegExp(termino, "i"); //volver una expresion regular lo que venga en el termino para que no sea casesensitive

  const productos = await Producto.find({
    nombre: regex,
    estado: true,
  }).populate("categoria", "nombre");

  res.json({
    results: productos,
  });
};

const buscarProductosPorCategoria = async (termino = "", res = response) => {
  const esMongoId = ObjectId.isValid(termino); //TRUE

  if (esMongoId) {
    const categoria = await Categoria.findById(termino);
    return res.json({
      results: categoria ? [categoria] : [],
    });
  }

  const regex = new RegExp(termino, "i"); //volver una expresion regular lo que venga en el termino para que no sea casesensitive
  // Verificar y encontrar que la categoria existe en la coleccion,y retorna un solo documento
  const categoria = await Categoria.findOne({
    nombre: regex,
    estado: true,
  });

  // Buscar los productos que coincidan con el documento encontrado
  const productos = await Producto.find({
    estado: true,
    $and: [
      {
        categoria: categoria._id,
      },
    ],
  }).populate("categoria", "nombre");

  // retornar los productos :D att:GarbanzoCake
  res.json({
    results: productos,
  });
};

const buscarStickers = async (termino = "", res = response) => {
  const esMongoId = ObjectId.isValid(termino); //TRUE

  if (esMongoId) {
    const sticker = await Sticker.findById(termino).populate(
      "categoria",
      "nombre"
    );
    return res.json({
      results: sticker ? [sticker] : [],
    });
  }

  const regex = new RegExp(termino, "i"); //volver una expresion regular lo que venga en el termino para que no sea casesensitive

  const stickers = await Sticker.find({
    nombre: regex,
    estado: true,
  }).populate("categoria", "nombre");

  res.json({
    results: stickers,
  });
};

const buscarPedidosPorUsuario = async (termino = "", res = response) => {
  const esMongoId = ObjectId.isValid(termino); //TRUE

  if (esMongoId) {
    const usuario = await Usuario.findById(termino);
    return res.json({
      results: usuario ? [usuario] : [],
    });
  }

  const regex = new RegExp(termino, "i"); //volver una expresion regular lo que venga en el termino para que no sea casesensitive
  // Verificar y encontrar que la categoria existe en la coleccion,y retorna un solo documento
  const usuario = await Usuario.findOne({
    correo: regex,
    estado: true,
  });

  // Buscar los productos que coincidan con el documento encontrado
  const pedidos = await Pedido.find({
    estado: true,
    $and: [
      {
        usuario: usuario._id,
      },
    ],
  })
    .populate("producto", "nombre")
    .populate("usuario", "correo");

  // retornar los productos :D att:GarbanzoCake
  res.json({
    total: pedidos.length,
    results: pedidos,
  });
};

const buscarPedidosPorUsuarioSinDespachar = async (
  termino = "",
  res = response
) => {
  const esMongoId = ObjectId.isValid(termino); //TRUE

  if (esMongoId) {
    const usuario = await Usuario.findById(termino);
    return res.json({
      results: usuario ? [usuario] : [],
    });
  }

  const regex = new RegExp(termino, "i"); //volver una expresion regular lo que venga en el termino para que no sea casesensitive
  // Verificar y encontrar que la categoria existe en la coleccion,y retorna un solo documento
  const usuario = await Usuario.findOne({
    correo: regex,
    estado: true,
  });

  // Buscar los productos que coincidan con el documento encontrado
  const pedidos = await Pedido.find({
    estado: true,
    $and: [
      {
        usuario: usuario._id,
      },
      {
        despachado: false,
      },
    ],
  })
    .populate("producto", "nombre")
    .populate("usuario", "correo");

  // retornar los productos :D att:GarbanzoCake
  res.json({
    total: pedidos.length,
    results: pedidos,
  });
};

const buscarVentasPorUsuario = async (termino = "", res = response) => {
  const esMongoId = ObjectId.isValid(termino); //TRUE

  if (esMongoId) {
    const usuario = await Venta.findById(termino);
    return res.json({
      results: usuario ? [usuario] : [],
    });
  }

  const regex = new RegExp(termino, "i"); //volver una expresion regular lo que venga en el termino para que no sea casesensitive
  // Verificar y encontrar que la categoria existe en la coleccion,y retorna un solo documento
  const usuario = await Usuario.findOne({
    correo: regex,
    estado: true,
  });

  // Buscar los productos que coincidan con el documento encontrado
  const ventas = await Venta.find({
    estado: true,
    $and: [
      {
        usuario: usuario._id,
      },
    ],
  }).populate("usuario");

  // retornar los productos :D att:GarbanzoCake
  res.json({
    total: ventas.length,
    results: ventas,
  });
};

const buscarVentasPorUsuarioSinDespachar = async (
  termino = "",
  res = response
) => {
  const esMongoId = ObjectId.isValid(termino); //TRUE

  if (esMongoId) {
    const usuario = await Venta.findById(termino);
    return res.json({
      results: usuario ? [usuario] : [],
    });
  }

  const regex = new RegExp(termino, "i"); //volver una expresion regular lo que venga en el termino para que no sea casesensitive
  // Verificar y encontrar que la categoria existe en la coleccion,y retorna un solo documento
  const usuario = await Usuario.findOne({
    correo: regex,
    estado: true,
  });

  // Buscar los productos que coincidan con el documento encontrado
  const ventas = await Venta.find({
    estado: true,
    $and: [
      {
        usuario: usuario._id,
      },
    ],
  }).populate("usuario");

  // retornar los productos :D att:GarbanzoCake
  res.json({
    total: ventas.length,
    results: ventas,
  });
};

const buscar = (req, res = response) => {
  const { coleccion, termino } = req.params;

  if (!coleccionesPermitidas.includes(coleccion)) {
    return res.status(400).json({
      msg: `Las colecciones permitidas son ${coleccionesPermitidas}`,
    });
  }

  switch (coleccion) {
    case "usuarios":
      buscarUsuarios(termino, res);

      break;

    case "categorias":
      buscarCategorias(termino, res);
      break;
    case "productos":
      buscarProductos(termino, res);
      break;

    case "productosCategorias":
      buscarProductosPorCategoria(termino, res);
      break;

    case "stickers":
      buscarStickers(termino, res);
      break;

    case "pedidosUsuarios":
      buscarPedidosPorUsuario(termino, res);
      break;

    case "pedidosUsuariosSinDespacho":
      buscarPedidosPorUsuarioSinDespachar(termino, res);
      break;

    case "ventasUsuarios":
      buscarVentasPorUsuario(termino, res);
      break;

    case "ventasUsuariosSinCompletar":
      buscarVentasPorUsuarioSinDespachar(termino, res);
      break;

    default:
      res.status(500).json({
        msg: "Se le olvido hacer esta busqueda",
      });
  }
};

module.exports = {
  buscar,
};
