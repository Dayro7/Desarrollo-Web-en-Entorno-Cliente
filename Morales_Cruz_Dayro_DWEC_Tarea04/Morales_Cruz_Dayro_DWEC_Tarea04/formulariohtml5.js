// Aseguramos que la página está creada antes de realizar tareas con los elementos del 
// formulario. 
document.addEventListener("DOMContentLoaded", function () {
    // Recojemos los dos eventos del formulario y les asignamos su función
    document.getElementById("form").addEventListener("submit", function (event) {
        event.preventDefault();
        validar(event);
    });
    document.getElementById("form").addEventListener('reset', borrar);
});

//------------ BLOQUE PARA COMPROBACIÓN DEL FOCO --------------------
// Obtenemos todos los inputs de tipo TEXTO del formulario
let textInputs = document.querySelectorAll('input[type="text"]');

// Recorremos los input de tipo texto
for (let i = 0; i < textInputs.length; i++) {
    // si tiene el foco "FOCUS"
    textInputs[i].addEventListener("focus", function () {
        // le aplicamos el color al fondo
        this.style.backgroundColor = "yellow";

    });

    // si pierde el foco "BLUR"
    textInputs[i].addEventListener("blur", function () {
        this.style.backgroundColor = "";

    });
}

// Definición de la función validar
function validar(evento) {
    // Prevenimos que se envíe el formulario al servidor
    evento.preventDefault();

    // Obtenemos los objetos del formulario
    let nombre = document.getElementById('form-nombre');
    let codigo = document.getElementById('form-codigo');
    let paises = document.querySelector('input[list="opciones-paises"]');

    nombre.addEventListener('input', function () {
        // Convierte el valor del campo a mayúsculas mientras el usuario está escribiendo
        nombre.value = nombre.value.toUpperCase();

        if (nombre.checkValidity()) {
            // Escribe el dato en el div final
            document.getElementById('nombre').innerHTML = '<strong>Nombre: </strong>' + nombre.value;
            // Pone en verde su input del formulario
            nombre.style.backgroundColor = 'lightgreen';
        }
    });

    if (nombre.checkValidity()) {
        // Escribe el dato en el div final
        document.getElementById('nombre').innerHTML = '<strong>Nombre: </strong>' + nombre.value;
        // Pone en verde su input del formulario
        nombre.style.backgroundColor = 'lightgreen';
    }

    // validación del código
    if (codigo.checkValidity()) {
        document.getElementById('codigo').innerHTML = '<strong>Código: </strong>' + codigo.value;
        codigo.style.backgroundColor = 'lightgreen';
    }

    // Obtenemos el valor del dataList con los países
    if (paises.value !== '') {
        document.getElementById('paises').innerHTML = '<strong>Elección de paises:  </strong>' + paises.value;
        paises.style.backgroundColor = 'lightgreen';
    }
}

// Creamos esta function para que contabilice en todo momento cada vez que ingresamos en la página
window.contarVisitas = function() {
    if (localStorage) {
        if (!localStorage["visitas"]) {
            localStorage.setItem("visitas", 1);
        } else {
            let contador = parseInt(localStorage.getItem("visitas")) + 1;
            localStorage.setItem("visitas", contador);
        }
        document.getElementById('visitas').innerHTML = "Número de visitas a nuestra página: " + localStorage.getItem("visitas");
    }
}

// Llamamos a la función
window.contarVisitas();

// definición de la función de borrado
function borrar() {
    // Obtenemos los elementos y los vaciamos/reseteamos
    document.getElementById('nombre').innerHTML = '';
    document.getElementById('codigo').innerHTML = '';
    document.getElementById('paises').innerHTML = '';
    document.getElementById('form').reset();
    // Borrado del color de fondo del formulario
    document.getElementById('form-nombre').style.backgroundColor = '';
    document.getElementById('form-codigo').style.backgroundColor = '';
    document.getElementById('form-paises').style.backgroundColor = '';
}