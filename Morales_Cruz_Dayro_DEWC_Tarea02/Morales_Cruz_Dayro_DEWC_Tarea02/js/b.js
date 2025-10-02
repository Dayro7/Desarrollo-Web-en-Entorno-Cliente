// Ejercicio 2

let cadenas = prompt("Ingrese una cadena:");
let caracter = prompt("Ingrese el carácter que quiera eliminar:");

function eliminarCaracter(cadenas, caracter) {
// Creamos una variable para almacenar la nueva cadena
  let nuevaCadena = "";
// Recorremos la cadena con un bucle for
  for (let i = 0; i < cadenas.length; i++) {
// Obtenemos el carácter en la posición i
    let letra = cadenas.charAt(i);
// Comparamos el carácter con el que queremos eliminar
    if (letra != caracter) {
// Si no coinciden, lo añadimos a la nueva cadena
      nuevaCadena += letra;
    }
  }
// Retornamos la nueva cadena
  return nuevaCadena;
}

let cadenas2 = prompt("Ingrese la misma y otra cadena: ");
let numero = prompt("Ingrese un número sin decimales: ");

function invertirCaso(cadenas2, numero) {
// Creamos una variable para almacenar la nueva cadena
  let nuevaCadena2 = "";
// Recorremos la cadena con un bucle for
  for (let i = 0; i < cadenas2.length; i++) {
// Obtenemos el carácter en la posición i
    let letra = cadenas2.charAt(i);
// Comprobamos si la posición es múltiplo del número
    if ((i + 1) % numero == 0) {
// Si lo es, invertimos el caso del carácter
      if (letra == letra.toUpperCase()) {
// Si está en mayúscula, lo pasamos a minúscula
        letra = letra.toLowerCase();
      } else {
// Si está en minúscula, lo pasamos a mayúscula
        letra = letra.toUpperCase();
      }
    }
// Añadimos el carácter a la nueva cadena
    nuevaCadena2 += letra;
  }
// Retornamos la nueva cadena
  return nuevaCadena2;
}

// Llamamos a las funciones y almacenamos los resultados
let resultadoEliminarCaracter = eliminarCaracter(cadenas, caracter);
let resultadoInvertirCaso = invertirCaso(cadenas2, numero);

// Mostramos los resultados en el documento HTML
document.write("La cadena escrita es: " + cadenas + "<br>");
document.write(" Y los carácteres eliminados: " + caracter + "<br>");
document.write("Resultado: " + resultadoEliminarCaracter + "<br>");
document.write("<br>");
document.write("La segunda cadena escrita es: " + cadenas2 + "<br>");
document.write("El número para alternan con mayúsculas es: " + numero + "<br>");
document.write("Resultado: " + resultadoInvertirCaso + "<br>");
