const {
    response
} = require("express");
const {
    Producto
} = require("../models");


// Obtener Productos- paginado total - populate

const obtenerProductos = async (req = request, res = response) => {

    const {
        limite = 5, desde = 0
    } = req.query;
    const query = {
        estado: true
    };

    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre')
        .skip(Number(desde))
        .limit(Number(limite))

    ]);

    res.json({
        total,
        productos
    })
}

// Obtener Prodcuto - populate {}


const obtenerProducto = async (req, res = response) => {


    const {
        id
    } = req.params;


    // Desactivar el usuario pero no borrarlo
    const categoria = await Producto.findById(id).populate('usuario', 'nombre').populate('categoria', 'nombre');



    res.json({
        producto
    })
}



// Crear Producto

const crearProducto = async (req, res = response) => {


    // const nombre = req.body.nombre.toUpperCase();
    const {estado,usuario,...body} = req.body;

    
    // const precioi = req.body.precio;
    // const precio = precioi * 1;

const productoDB = await Producto.findOne({nombre: body.nombre });

    if (productoDB) {
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre},ya existe`
        });
    }

    // Generar la data a guardar

    const data = {
        
        nombre:body.nombre.toUpperCase(),
        usuario: req.usuario._id,
        ...body,
    }

    const producto = new Producto(data);

    // Guaradar en DB
    await producto.save();

    res.status(201).json(producto);

}



// Actualizar Categoria
const actualizarProducto = async (req, res = response) => {
    const {
        id
    } = req.params;

    const {
        estado,
        usuario,
        ...data
    } = req.body;

    if (data.nombre) {
        
            // capitalizando el nombre
            data.nombre = data.nombre.toUpperCase();
        
    }
    
    // asignando el usuario ultimo por el que hace la actualizacion
    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id, data, {
        new: true
    });


    res.json(producto);
}




// Borrar Categoria

const borrarProducto = async (req, res = response) => {


    const {
        id
    } = req.params;

    const productoBorrado = await Producto.findByIdAndUpdate(id, {
        estado: false
    }, {
        new: true
    });
    // {new : true} es para que se vean los cambios reflejados en la respuesta json


    res.json(productoBorrado);
}











module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
}
