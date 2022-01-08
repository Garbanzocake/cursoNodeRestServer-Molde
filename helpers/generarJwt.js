const jwt = require("jsonwebtoken");

const generarJWT = (uid = "") => {
  return new Promise((resolve, reject) => {
    const payload = {
      uid,
    };

    jwt.sign(
      payload,
      process.env.SECRETORPRIVATEKEY,
      {
        expiresIn: "4h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo generar el token");
        } else {
          resolve(token);
        }
      }
    );
  });
};

const expiredJWT = (token = "") => {
  if (!token) {
    return res.status(400).json({
      msg: "No hay token en la peticion",
    });
  }

  try {
    const { exp } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    let expirado = false;

    if (exp > Date.now()) {
      return expirado;
    }

    return expirado;
  } catch (error) {
    
    
    return expirado=true ;
  }
};

module.exports = {
  generarJWT,
  expiredJWT,
};
