const {
    response
} = require("express");
const {
    Usuario,
    Categoria,
    Producto
} = require("../models");


const {
    ObjectId
} = require('mongoose').Types;

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'productosCategorias',
    'roles'
];

const buscarUsuarios = async (termino = '', res = response) => {

    const esMongoId = ObjectId.isValid(termino); //TRUE

    if (esMongoId) {
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: (usuario) ? [usuario] : []
        });

    }

    const regex = new RegExp(termino, 'i'); //volver una expresion regular lo que venga en el termino para que no sea casesensitive

    const usuarios = await Usuario.find({
        $or: [{
            nombre: regex
        }, {
            correo: regex
        }],
        $and: [{
            estado: true
        }]


    });

    res.json({
        results: usuarios
    });


}

const buscarCategorias = async (termino = '', res = response) => {

    const esMongoId = ObjectId.isValid(termino); //TRUE

    if (esMongoId) {
        const categoria = await Categoria.findById(termino);
        return res.json({
            results: (categoria) ? [categoria] : []
        });

    }

    const regex = new RegExp(termino, 'i'); //volver una expresion regular lo que venga en el termino para que no sea casesensitive

    const categorias = await Categoria.find({
        nombre: regex,
        estado: true
    });

    res.json({
        results: categorias
    });


}
const buscarProductos = async (termino = '', res = response) => {
    const esMongoId = ObjectId.isValid(termino); //TRUE

    if (esMongoId) {
        const producto = await Producto.findById(termino).populate('categoria', 'nombre');
        return res.json({
            results: (producto) ? [producto] : []
        });

    }

    const regex = new RegExp(termino, 'i'); //volver una expresion regular lo que venga en el termino para que no sea casesensitive

    const productos = await Producto.find({
        nombre: regex,
        estado: true
    }).populate('categoria', 'nombre');

    res.json({
        results: productos
    });
}

const buscarProductosPorCategoria = async (termino = '', res = response) => {
    const esMongoId = ObjectId.isValid(termino); //TRUE

    if (esMongoId) {
        const categoria = await Categoria.findById(termino);
        return res.json({
            results: (categoria) ? [categoria] : []
        });

    }

    const regex = new RegExp(termino, 'i'); //volver una expresion regular lo que venga en el termino para que no sea casesensitive
    // Verificar y encontrar que la categoria existe en la coleccion,y retorna un solo documento
    const categoria = await Categoria.findOne({
        nombre: regex,
        estado: true
    });

    // Buscar los productos que coincidan con el documento encontrado
    const productos = await Producto.find({
        estado: true,
        $and: [{
            categoria: categoria._id
        }],

    }).populate('categoria', 'nombre');

    // retornar los productos :D att:GarbanzoCake
    res.json({
        results: productos
    });

}


const buscar = (req, res = response) => {

    const {
        coleccion,
        termino
    } = req.params;


    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son ${coleccionesPermitidas}`
        })
    }

    switch (coleccion) {
        case 'usuarios':

            buscarUsuarios(termino, res);

            break;

        case 'categorias':
            buscarCategorias(termino, res);
            break;
        case 'productos':
            buscarProductos(termino, res);
            break;


        case 'productosCategorias':
            buscarProductosPorCategoria(termino, res);
            break;

        default:
            res.status(500).json({
                msg: 'Se le olvido hacer esta busqueda'
            })

    }



}



module.exports = {
    buscar
}