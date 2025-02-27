export const manejoMensajes = (error, res, mensaje = null) => {
  res
    .status(error?.status || 500)
    .send({ status: error?.status || 500, message: error?.message || error });
};
