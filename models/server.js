const express = require('express');
const cors = require('cors');
const path=  require('path');
const fileUpload= require('express-fileupload');
const {
    dbConnection
} = require('../database/config');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;


        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            categorias: '/api/categorias',
            productos: '/api/productos',
            usuarios: '/api/usuarios',
            uploads: '/api/uploads'
        }



        // Conectar a base de datos
        this.conectarDB();

        // MiddleWares
        this.middlewares();

        // Lectura y parseo del body
        this.app.use(express.json());

        // Rutas de mi aplicacion
        this.routes();

        //Manejar demas rutas
        this.app.get('*',(req,res)=>{
            res.sendFile(path.resolve( __dirname ,'../public/index.html'))
        })
        

    }


    async conectarDB() {
        await dbConnection();
    }


    middlewares() {

        // CORS
        this.app.use(cors());

        // Directorio publico
        this.app.use(express.static('public'))

        // FileUpload - carga de archivos

        // Note that this option available for versions 1.0.0 and newer. 
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));


    }



    routes() {

        this.app.use(this.paths.auth, require('../routes/auth.routes'));
        this.app.use(this.paths.buscar, require('../routes/buscar.routes'));
        this.app.use(this.paths.usuarios, require('../routes/usuarios.routes'));
        this.app.use(this.paths.productos, require('../routes/productos.routes'));
        this.app.use(this.paths.categorias, require('../routes/categorias.routes'));
        this.app.use(this.paths.uploads, require('../routes/uploads.routes'));


    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto ${this.port} !!`)
        });
    }

}


module.exports = Server;