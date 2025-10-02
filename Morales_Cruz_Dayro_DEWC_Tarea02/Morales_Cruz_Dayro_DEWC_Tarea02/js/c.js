// Ejercicio 3

// Creamos la función para comprobar si el navegador está en pantalla completa o no
function checkPantallaCompleta() {
  let resultadoPantallaCompleta;

  if (document.fullscreenElement !== null) {
    resultadoPantallaCompleta = "El navegador está en pantalla completa.";
  } else {
    resultadoPantallaCompleta = "El navegador no está en pantalla completa.";
  }

  return resultadoPantallaCompleta;
}

// Comprobamos si estás en un dispositivo móvil
let dispositivoMovil = /Mobi/.test(navigator.userAgent) ? "Estás en un dispositivo móvil." : "No estás en un dispositivo móvil.";

// Crear elementos div y mostrar los resultados
let divPantallaCompleta = document.createElement("div");
divPantallaCompleta.textContent = checkPantallaCompleta();

let divDispositivoMovil = document.createElement("div");
divDispositivoMovil.textContent = dispositivoMovil;

// Agregar los elementos div al cuerpo del documento para visualizarlo en el HTML
document.body.appendChild(divPantallaCompleta);
document.body.appendChild(divDispositivoMovil);
