const {response, request} = require('express');



   const usuariosGet = (req= request, res= response) => {

    const {q,nombre='No name',apikey,page = 1,limit} = req.query;
    res.json({
        ok: true,
        msg: 'get API - Controlador',
        q,
        nombre,
        apikey,
        page,
        limit
    })
}


   const usuariosPut = (req, res=response) => {
       const {id} = req.params;
    res.json({
        ok: true,
        msg: 'put API - Controlador',
        id
    })
}


   const usuariosPost = (req, res=response) => {
       const {nombre,edad}= req.body;
    res.json({
        ok: true,
        msg: 'post API - Controlador',
        nombre,
        edad
    })
}



   const usuariosDelete = (req, res= response) => {
    res.json({
        ok: true,
        msg: 'delete API - Controlador'
    })
}

   const usuariosPatch =  (req, res= response) => {
    res.json({
        ok: true,
        msg: 'patch API - Controlador'
    })
}

module.exports = { 
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}