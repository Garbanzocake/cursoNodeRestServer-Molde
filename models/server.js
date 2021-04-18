const express = require('express');
const cors= require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        // Conectar a base de datos
        this.conectarDB();

        // MiddleWares
        this.middlewares();

        // Lectura y parseo del body
        this.app.use( express.json() ); 

        // Rutas de mi aplicacion
        this.routes();
    }


    async conectarDB(){
        await dbConnection();
    }


    middlewares(){

        // CORS
            this.app.use(cors());



        // Directorio publico
            this.app.use(express.static('public'))
    }



    routes() {
     
        this.app.use('/api/usuarios',require('../routes/usuarios.routes'));

       
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto ${this.port} !!`)
        });
    }

}


module.exports = Server;