const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { revalidarToken} = require('../controllers/auth.controller');   

const { login, googleSignin } = require('../controllers/auth.controller');


const router= Router();

router.post('/login',[
    check('correo','El correo es obligatorio').isEmail(),
    check('password','la contraseña es obligatoria').not().isEmpty(),
    validarCampos
],login);

router.post('/google',[
    check('id_token','El token es necesario').not().isEmpty(),
    validarCampos
],googleSignin);

// Validar y revalidar token de usuario 
router.get('/renew',validarJWT  ,revalidarToken);





module.exports = router;