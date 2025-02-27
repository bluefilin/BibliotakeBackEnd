import jwt from "jsonwebtoken";
import "dotenv/config"
const { sign, verify } = jwt;

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * 
 * @param {string} id - El id del usuario
 * @returns {string} Devuelve el token que contiene el id y la firma del token
 */
const generarToken = (id) => {
  const jwt = sign({ id }, JWT_SECRET);
  return jwt
};

/**
 * @author ALbert Ospina 
 * @param {string} id - El id del usuario
 * @returns {string} Devuelve el token que contiene el id y la firma del token
 */
const generarTokenTemporal = (id) => {
  const jwt = sign({ id }, JWT_SECRET, {
    expiresIn: "10m",
  });
  return jwt;
};

/**
 * 
 * @param {string} token 
 * @returns {boolean}- Devuelve verdadero si el token es valido y falso en el caso contrario
 */
const verificarToken = (token) => {
  const esCorrecto = verify(token, JWT_SECRET);
  return esCorrecto;
};

export { generarTokenTemporal, verificarToken, generarToken };
