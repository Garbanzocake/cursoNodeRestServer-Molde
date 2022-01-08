const { Router } = require("express");
const { check } = require("express-validator");

const {
  crearSticker,
  getStickers,
  actualizarSticker,
  borrarSticker,
  obtenerSticker,
} = require("../controllers/stickers.controller");

const { existeStickerPorId } = require("../helpers/db-validators");
const { validarJWT, esAdminRole } = require("../middlewares");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

// Obtener todos los stickers - publico
router.get("/", getStickers);

// Obtener un sticker por id -publico
router.get(
  "/:id",
  [
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(existeStickerPorId),
    validarCampos,
  ],
  obtenerSticker
);

// Crear un Sticker
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es Obligatorio").not().isEmpty(),
    check("artista", "El artista es Obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearSticker
);

// Actualizar sticker por id
router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "El nombre es Obligatorio").not().isEmpty(),
    check("id").custom(existeStickerPorId),
    validarCampos,
  ],
  actualizarSticker
);

//borrar sticker por id-admin
router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un id valido").isMongoId(),
    validarCampos,
    check("id").custom(existeStickerPorId),
  ],
  borrarSticker
);

module.exports = router;
