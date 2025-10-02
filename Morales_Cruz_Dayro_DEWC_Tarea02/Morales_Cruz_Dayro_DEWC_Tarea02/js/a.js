// Ejercicio 1

// Creamos una función que genera un número aleatorio entre 0 y 1
function lanzarDado() {
  return Math.random();
}

// Creamos una función que recibe una pregunta y devuelve la respuesta de la bruja
function brujIA(pregunta) {
// Si la pregunta contiene "DWEC" (mayúsculas o minúsculas), la bruja se enfada y dice que no sabe nada de eso
  if (/dewc/i.test(pregunta)) {
    return "¿¡DEWC!?, ¡Ahora me enfado y no respiro!";
  } else {
// Lanzamos el dado y guardamos el resultado en una variable
    let resultado = lanzarDado();
// Si el resultado es mayor que 0.499999, la respuesta es sí
    if (resultado > 0.5) {
      return "Sí";
    } else {
      return "No";
    }
  }
}

// Comenzamos un bucle para que el programa siga preguntando
while (true) {
  let pregunta = prompt("Hazme una pregunta a la brujIA:");

  if (pregunta === null) {
// Si el usuario cancela el prompt, el programa termina y lo avisamos mediante alert
    alert("La bruja se fué a dormir");
    break;
  }

  let respuesta = brujIA(pregunta);

// Mostramos las respuestas en el documento HTML usando document.write
  document.write("Yo: " + pregunta + "<br>BrujIA: " + respuesta + "<br>");
  document.write("<br>");

// Mostramos la respuesta de brujIA en un cuadro
  alert("BrujIA: " + respuesta);

// Comprobamos si la pregunta contiene "DEWC" o derivados.
  if (/dewc/i.test(pregunta)) {
// Si contiene "DEWC" o derivados, el programa finaliza con alert
    alert("Mencionaste DEWC y la brujIA se fué a llorar.");
    break;
  }
}
