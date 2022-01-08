const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { revalidarToken,expiradoToken} = require('../controllers/auth.controller');   

const { login, googleSignin } = require('../controllers/auth.controller');


const router= Router();

router.post('/login',[
    check('correo','El correo es obligatorio').isEmail(),
    check('password','la contraseña es obligatoria').not().isEmpty(),
    validarCampos
],login);

router.post('/google',[
    check('id_token','id_token de google es necesario').not().isEmpty(),
    validarCampos
],googleSignin);

// Validar y revalidar token de usuario 
router.get('/renew',validarJWT  ,revalidarToken);

// Validar si ya expiro el token de usuario 
router.get('/expired' ,expiradoToken);




module.exports = router;