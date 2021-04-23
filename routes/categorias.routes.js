const {
    Router
} = require('express');
const {
    check
} = require('express-validator');
const {
    crearCategoria,
    obtenerCategorias,
    actualizarCategoria,
    borrarCategoria,
    obtenerCategoria
} = require('../controllers/categorias.controller');
const {
    existeCategoriaPorId,
} = require('../helpers/db-validators');
const {
    validarJWT,
    esAdminRole
} = require('../middlewares');
const {
    validarCampos
} = require('../middlewares/validar-campos');


const router = Router();


// Obtener todas las categorias - publico
router.get('/', obtenerCategorias)

// Obtener una categorias por id- publico
router.get('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], obtenerCategoria)

// crear una categorias por id- privado- cualquier persona con token valido
router.post('/',
    [
        validarJWT,
        check('nombre', 'El nombre es Obligatorio').not().isEmpty(),
        validarCampos
    ], crearCategoria)



// Actualizar categoria por id
router.put('/:id',
    [
        validarJWT,
        check('nombre', 'El nombre es Obligatorio').not().isEmpty(),
        check('id').custom(existeCategoriaPorId),
        validarCampos
    ],
    actualizarCategoria

)


// Borrar categoria por id - admin

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id valido').isMongoId(),
    validarCampos,
    check('id').custom(existeCategoriaPorId),
], borrarCategoria)




module.exports = router;