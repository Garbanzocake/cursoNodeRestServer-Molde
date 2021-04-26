const dbValidators = require('./db-validators');
const generarJWT = require('./generarJwt');
const googleVerify = require('./google-verifiy');
const subirArchivo = require('./subir-archivo');





module.exports = {
    ...dbValidators,
    ...generarJWT,
    ...googleVerify,
    ...subirArchivo,
}