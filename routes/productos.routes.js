const {
    Router
} = require('express');
const {
    check
} = require('express-validator');


const {
    crearProducto,
    obtenerProductos,
    actualizarProducto,
    borrarProducto,
    obtenerProducto,
    
} = require('../controllers/productos.controller');

const {
    existeProductoPorId,existeCategoriaPorId
} = require('../helpers/db-validators');

const {
    validarJWT,
    esAdminRole
} = require('../middlewares');


const {
    validarCampos
} = require('../middlewares/validar-campos');





const router = Router();



// Obtener todas los productos - publico
router.get('/', obtenerProductos )

// Obtener un producto por id- publico
router.get('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], obtenerProducto)




// crear un producto por id- privado- cualquier persona con token valido
router.post('/',
    [
        validarJWT,
        check('nombre', 'El nombre es Obligatorio').not().isEmpty(),
        check('categoria', 'No es un id de Mongo ').isMongoId(),
        check('categoria').custom(existeCategoriaPorId),
        validarCampos
    ], crearProducto)




    // Actualizar producto por id
router.put('/:id',
[
    validarJWT,
    check('categoria', 'No es un id de Mongo ').isMongoId(),
    check('id').custom(existeProductoPorId ),
    validarCampos
],
actualizarProducto

)


// Borrar producto por id - admin

router.delete('/:id', [
validarJWT,
esAdminRole,
check('id', 'No es un id valido').isMongoId(),
validarCampos,
check('id').custom(existeCategoriaPorId),
], borrarProducto)





module.exports = router;