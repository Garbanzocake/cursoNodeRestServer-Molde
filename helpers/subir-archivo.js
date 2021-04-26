const {
    v4: uuidv4
} = require('uuid');


const path = require('path');



const subirArchivo = (files, extensionesValidas = ['png', 'jpg','JPG','JPEG','PNG','GIF', 'jpeg', 'gif'], carpeta = '') => {

    return new Promise((resolve, reject) => {

        // obteniendo el archivo en la request
        const {
            archivo
        } = files;

        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1];

        // Validar la extension


        if (!extensionesValidas.includes(extension)) {
            return reject(`La extension ${extension} no es permitida, las extensiones validas son ${extensionesValidas}`)

        }


        const nombreTemp = uuidv4() + '.' + extension;

        // path donde va a ir el archivo
        const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemp);

        archivo.mv(uploadPath, (err) => {
            if (err) {

                reject(err);
            }

            resolve(nombreTemp);

        });






    })




}

const subirArchivosProd = (files, extensionesValidas = ['png', 'jpg','JPG','JPEG','PNG','GIF', 'jpeg', 'gif'], carpeta = '',carpetaProducto='') => {

    return new Promise((resolve, reject) => {

        // obteniendo el archivo en la request
        const {
            archivo
        } = files;

        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1];

        // Validar la extension


        if (!extensionesValidas.includes(extension)) {
            return reject(`La extension ${extension} no es permitida, las extensiones validas son ${extensionesValidas}`)

        }


        const nombreTemp = uuidv4() + '.' + extension;

        // path donde va a ir el archivo
        const uploadPath = path.join(__dirname, '../uploads/', carpeta,carpetaProducto, nombreTemp);

        archivo.mv(uploadPath, (err) => {
            if (err) {

                reject(err);
            }

            resolve(nombreTemp);

        });






    })




}





module.exports = {
    subirArchivo,
    subirArchivosProd
    
}