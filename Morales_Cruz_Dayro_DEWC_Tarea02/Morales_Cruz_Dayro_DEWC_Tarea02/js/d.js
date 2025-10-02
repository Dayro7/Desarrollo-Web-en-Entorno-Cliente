// Ejercicio 4

// Pedimos al usuario que introduzca el día, mes y año
let dia = prompt("Introduce el día:");
let mes = prompt("Introduce el mes:");
let anio = prompt("Introduce el año:");

// Crear un objeto Date con la fecha introducida por el usuario
let fecha = new Date(anio, mes - 1, dia);

// Crear un objeto Date para la fecha actual
let hoy = new Date();

// Calcular la diferencia entre las dos fechas en milisegundos
let diferencia = hoy - fecha;

// Convertir la diferencia en días, semanas y años
let milisegundosEnUnDia = 1000 * 60 * 60 * 24;
let milisegundosEnUnaSemana = milisegundosEnUnDia * 7;

let dias = Math.floor(diferencia / milisegundosEnUnDia);
let semanas = Math.floor(diferencia / milisegundosEnUnaSemana);
let anios = hoy.getFullYear() - fecha.getFullYear();

// Mostrar los resultados al usuario en el HTML
document.write("La diferencia entre: " + dia + "/" + mes + "/" + anio + " y hoy es de: " + dias + " días, " + semanas + " semanas, y " + anios + " años.");
