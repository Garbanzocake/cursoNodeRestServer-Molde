const { Router } = require("express");
const { check } = require("express-validator");
const {
  obtenerVentas,
  obtenerVenta,
  crearVenta,
  actualizarVenta,
  borrarVenta,
  obtenerVentasSinCompletar,
  obtenerVentasCompletadas,
} = require("../controllers/ventas.controller");
const { existeVentaPorId } = require("../helpers");

const { validarJWT, esAdminRole } = require("../middlewares");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

// Obtener todos las ventas - publico
router.get("/", obtenerVentas);

// Obtener todos las ventas completas - publico
router.get("/completadas", obtenerVentasCompletadas);

// Obtener todos las ventas sin completar - publico
router.get("/sinCompletar", obtenerVentasSinCompletar);

//Obtener una venta por id- publico
router.get(
  "/:id",
  [
    check("id", "no es un id valido").isMongoId(),
    check("id").custom(existeVentaPorId),
    validarCampos,
  ],
  obtenerVenta
);

// Crear una venta
router.post(
  "/",
  [
    validarJWT,
    check("productos","Los Productos son obligatorios"),
    validarCampos,
  ],
  crearVenta
);

// Actualizar venta por id
router.put(
  "/:id",
  [
    validarJWT,
    check("nombreComprador", "El nombre es Obligatorio").not().isEmpty(),
    check("id").custom(existeVentaPorId),
    validarCampos,
  ],
  actualizarVenta
);

//Borrar Venta por id-admin
router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un id valido").isMongoId(),
    validarCampos,
    check("id").custom(existeVentaPorId),
  ],
  borrarVenta
);

module.exports = router;
