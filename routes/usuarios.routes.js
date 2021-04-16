const { Router } = require('express');
const { usuariosGet,usuariosPost,usuariosPut,usuariosPatch,usuariosDelete} = require('../controllers/usuarios.controller');


const router= Router();


router.get('/',usuariosGet );

router.put('/:id', usuariosPut );

router.post('/',usuariosPost );

router.delete('/',usuariosDelete );

router.patch('/',usuariosPatch);



module.exports = router;