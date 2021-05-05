const {
    Router
} = require('express');
const {
    check
} = require('express-validator');

const {
    usuariosGet,
    obtenerUsuario,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
} = require('../controllers/usuarios.controller');

const {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
} = require('../helpers/db-validators');



const {
    validarCampos,
    validarJWT,
    esAdminRole,
    tieneRole
} = require('../middlewares');


const router = Router();


router.get('/', usuariosGet);

// Obtener un producto por id- publico
router.get('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], obtenerUsuario)


router.put('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(emailExiste),
    check('password', 'El password debe de ser 6 caracteres o mas').isLength({
        min: 6
    }),
    // check('rol',' No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol','El rol no esta registrado').custom(esRoleValido),
    validarCampos
], usuariosPost);

router.delete('/:id', [
    validarJWT,
    // esAdminRole,
    tieneRole('ADMIN_ROLE,USER_ROLE', 'OTRO_ROLE'),
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete);

router.patch('/', usuariosPatch);



module.exports = router;