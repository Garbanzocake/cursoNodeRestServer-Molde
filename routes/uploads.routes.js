const {
    Router
} = require('express');
const {
    check
} = require('express-validator');
const {
    cargarArchivo,
    // actualizarImagen,
    mostrarImagen,
    actualizarImagenCloudinary,
    actualizarImagenesCloudinary,
    limpiarImagenesCloudinary
} = require('../controllers/uploads.controller');
const {
    coleccionesPermitidas
} = require('../helpers');
const {
    validarArchivoSubir,
    validarCampos
} = require('../middlewares');






const router = Router();

router.post('/', validarArchivoSubir, cargarArchivo);


router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id', 'El id debe ser un id de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], actualizarImagenCloudinary);



router.put('/:coleccion/:id/imgs', [
    validarArchivoSubir,
    check('id', 'El id debe ser un id de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], actualizarImagenesCloudinary);

router.delete('/:coleccion/:id/imgs', [
    
    check('id', 'El id debe ser un id de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], limpiarImagenesCloudinary);


// ], actualizarImagen);


router.get('/:coleccion/:id', [check('id', 'El id debe ser un id de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], mostrarImagen)








module.exports = router;