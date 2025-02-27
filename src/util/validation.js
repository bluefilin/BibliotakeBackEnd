export const objetoVacio = (objeto) => {
  return Object.entries(objeto).length === 0;
};

export const quitarCamposVacios = (objeto) => {
  const objetoFiltrado = {};
  for (const clave in objeto) {
    if (objeto[clave] !== "") {
      objetoFiltrado[clave] = objeto[clave];
    }
  }
  return objetoFiltrado;
}

export const archivoSinNumero = (cadena, caracter) => {
  return cadena.split(caracter).pop();
}

export const obtenerPrimerNombre = (nombre) => {
  const primerNombre = nombre.split(' ');
  return primerNombre[0];
}

export const formatearFecha = (fecha) => {
  const fechaFormateada = `${fecha.getFullYear()}-${((fecha.getMonth() + 1) < 10 ? `0` + fecha.getMonth() : fecha.getMonth())}-${fecha.getDate() < 10 ? `0` + fecha.getDate() : fecha.getDate()}T${fecha.getHours()}:${fecha.getMinutes()}`;
  return fechaFormateada;
}

export const renombrarImagenes=(nombreOriginal)=>{
  const prefijoUnico = Math.round(Math.random() * 1e5);
  const nombreArchivo = prefijoUnico + "ASD2_" + nombreOriginal.split(".")[0] + ".webp";
  return nombreArchivo;
}