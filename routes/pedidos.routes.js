const { Router } = require("express");
const { check } = require("express-validator");
const {
  obtenerPedidos,
  crearPedido,
  actualizarPedido,
  borrarPedido,
  obtenerPedido,
  obtenerPedidosSinDespachar,
} = require("../controllers/pedidos.controller");

const { existePedidoPorId } = require("../helpers/db-validators");
const { validarJWT, esAdminRole } = require("../middlewares");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

// Obtener todos los pedidos - publico
router.get("/", obtenerPedidos);

// Obtener todos los pedidos - publico
router.get("/sinDespachar", obtenerPedidosSinDespachar);

// Obtener un pedido por id -publico
router.get(
  "/:id",
  [
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(existePedidoPorId),
    validarCampos,
  ],
  obtenerPedido
);

// Crear un Pedido
router.post(
  "/",
  [
    validarJWT,
    check("producto", "El producto es Obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearPedido
);

// Actualizar Pedido por id
router.put(
  "/:id",
  [
    validarJWT,
    check("id").custom(existePedidoPorId),
    validarCampos,
  ],
  actualizarPedido
);

//borrar Pedido por id-admin
router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un id valido").isMongoId(),
    validarCampos,
    check("id").custom(existePedidoPorId),
  ],
  borrarPedido
);

module.exports = router;
