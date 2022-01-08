const path = require("path");
const fs = require("fs");

const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const { response } = require("express");
const { subirArchivo } = require("../helpers");

const { Usuario, Producto, Sticker } = require("../models");

const cargarArchivo = async (req, res = response) => {
  try {
    // aca se manda los archivos,el tipo de extension que se quiere y la carpeta en la que se subiran los archivos
    // const nombre= await subirArchivo(req.files,['txt','md'], 'textos');
    const nombre = await subirArchivo(req.files, undefined, "imgs");

    res.json({
      nombre,
    });
  } catch (msg) {
    res.status(400).json({
      msg,
    });
  }
};

const actualizarImagen = async (req, res = response) => {
  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`,
        });
      }

      break;

    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un producto con el id ${id}`,
        });
      }

      break;

    default:
      return res.status(500).json({
        msg: "Se me olvidó validar esto",
      });
  }

  // Limpiar imágenes previas
  if (modelo.img) {
    // Hay que borrar la imagen del servidor
    const pathImagen = path.join(
      __dirname,
      "../uploads",
      coleccion,
      modelo.img
    );
    if (fs.existsSync(pathImagen)) {
      fs.unlinkSync(pathImagen);
    }
  }

  const nombre = await subirArchivo(req.files, undefined, coleccion);
  modelo.img = nombre;

  await modelo.save();

  res.json(modelo);
};

const mostrarImagen = async (req, res = response) => {
  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`,
        });
      }

      break;

    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un producto con el id ${id}`,
        });
      }

      break;

    default:
      return res.status(500).json({
        msg: "Se me olvidó validar esto",
      });
  }

  // Limpiar imágenes previas
  if (modelo.img) {
    // Hay que borrar la imagen del servidor
    const pathImagenn = path.join(
      __dirname,
      "../uploads",
      coleccion,
      modelo.img
    );
    if (fs.existsSync(pathImagenn)) {
      return res.sendFile(pathImagenn);
    }
  }

  const pathImagen = path.join(__dirname, "../assets/no-image.jpg");
  res.sendFile(pathImagen);
};

const actualizarImagenCloudinary = async (req, res = response) => {
  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`,
        });
      }

      break;

    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un producto con el id ${id}`,
        });
      }

      break;

    case "stickers":
      modelo = await Sticker.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un sticker con el id ${id}`,
        });
      }

      break;

    default:
      return res.status(500).json({
        msg: "Se me olvidó validar esto",
      });
  }

  // Limpiar imágenes previas
  if (modelo.img) {
    const nombreArr = modelo.img.split("/");
    const nombre = nombreArr[nombreArr.length - 1];
    const [public_id] = nombre.split(".");
    cloudinary.uploader.destroy(`TiendaApp/${public_id}`);
  }

  const { tempFilePath } = req.files.archivo;

  const { secure_url } = await cloudinary.uploader.upload(tempFilePath, {
    folder: "TiendaApp",
  });

  modelo.img = secure_url;
  modelo.imgs.push(secure_url);

  await modelo.save();

  res.json(modelo);
};

const actualizarImagenesCloudinary = async (req, res = response) => {
  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`,
        });
      }

      break;

    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un producto con el id ${id}`,
        });
      }

      break;

    case "stickers":
      modelo = await Sticker.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un sticker con el id ${id}`,
        });
      }

      break;

    default:
      return res.status(500).json({
        msg: "Se me olvidó validar esto",
      });
  }

  // Limpiar imágenes previas

  const { tempFilePath } = req.files.archivo;

  const { secure_url } = await cloudinary.uploader.upload(tempFilePath, {
    folder: "TiendaApp",
  });

  // cloudinary.image("lady.jpg", {transformation: [
  //   {gravity: "face", height: 400, width: 400, crop: "crop"},
  //   {radius: "max"},
  //   {width: 200, crop: "scale"}
  //   ]})

  modelo.imgs.push(secure_url);

  await modelo.save();

  res.json(modelo);
};

const limpiarImagenesCloudinary = async (req, res = response) => {
  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`,
        });
      }

      break;

    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un producto con el id ${id}`,
        });
      }

      break;

      
    case "stickers":
      modelo = await Sticker.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un producto con el id ${id}`,
        });
      }

      break;

    default:
      return res.status(500).json({
        msg: "Se me olvidó validar esto",
      });
  }

  // Limpiar imágenes previas

  let imagenes = modelo.imgs;

  for (let i = 0; i < imagenes.length; i++) {
    const element = imagenes[i];
    const nombreArr = element.split("/");
    const nombre = nombreArr[nombreArr.length - 1];
    const [public_id] = nombre.split(".");
    cloudinary.uploader.destroy(`TiendaApp/${public_id}`);
  }

 

  modelo.imgs = [];

  await modelo.save();

  res.json(modelo);
};

module.exports = {
  actualizarImagen,
  cargarArchivo,
  mostrarImagen,
  actualizarImagenCloudinary,
  actualizarImagenesCloudinary,
  limpiarImagenesCloudinary,
};
