// Aseguramos que la página está creada antes de realizar tareas con los elementos del
// formulario.
document.addEventListener("DOMContentLoaded", function () {
  // Recojemos los dos eventos del formulario y les asignamos su función
  document.getElementById("admision").addEventListener("submit", function (event) {
      event.preventDefault();
      validar(event);
    });
  document.getElementById("admision").addEventListener("reset", borrar);
  let boton = document.getElementById("mostrarContraseña");
  boton.addEventListener("click", function () {
    mostrarContraseña();
  });
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
    // Si el nombre es correcto se cambia a verde
    if (validarNombre(this.value.trim())) {
      this.style.backgroundColor = "lightgreen";
    }
  });

  // si pierde el foco "BLUR"
  textInputs[i].addEventListener("blur", function () {
    this.style.backgroundColor = "";

    // Si el nombre es incorrecto se cambia a rojo
    if (!validarNombre(this.value.trim())) {
      this.style.backgroundColor = "";
    }
  });
}

// Obtenemos todos los inputs de tipo CONTRASEÑA del formulario
let passwordInputs = document.querySelectorAll('input[type="password"]');

// Recorremos los input de tipo password
for (let i = 0; i < passwordInputs.length; i++) {
  // si tiene el foco "FOCUS"
  passwordInputs[i].addEventListener("focus", function () {
    // le aplicamos el color al fondo
    this.style.backgroundColor = "yellow";
    // Si la contraseña es correcto se cambia a verde
    if (validarContraseña(this.value.trim())) {
      this.style.backgroundColor = "lightgreen";
    }
  });
  // si pierde el foco "BLUR"
  passwordInputs[i].addEventListener("blur", function () {
    this.style.backgroundColor = "";
    if (!validarContraseña(this.value.trim())) {
      this.style.backgroundColor = "";
    }
  });

  // ---------------------------------------------------------------
}
// Definición de la función validar
function validar(evento) {
  // Prevenimos que se envíe el formulario al servidor
  evento.preventDefault();
  // Constante array con los posibles errores que nos podemos encontrar:
  const errores = [
    // Error 0 -> nombre
    "El nombre debe contener entre 10 y 25 caracteres alfábeticos",
    // Error 1 -> nacionalidad
    " ",
    // Error 2 -> contraseña
    'Contraseña no debe empezar en "ç", "," o "$" <br>' +
    'Contener de 1 a 3 números"<br>' +
    'No puede contener la cadena "select" o "where" <br>' +
    'No debe contener ";" <br>' +
    'Debe terminar en "." precedido de un número <br>' +
    "Entre 8 y 21 caracteres",
  ];

  // Obtenemos los valores del formulario
  let nombre = document.getElementById("form-nombre").value.trim();
  let nacionalidad = document.getElementById("form-nacionalidad");
  let contraseña = document.getElementById("form-contraseña").value.trim();

  // Uso de las funciones de validación. Muestro valor o error en cada validación
  if (validarNombre(nombre)) {
    // escribe el dato en el div final
    document.getElementById("nombre").innerHTML = "Nombre: " + nombre;
    // pone en verde su input del formulario
    document.getElementById("form-nombre").style.backgroundColor = "lightgreen";
  } else {
    // cogemos su error del array de errores
    document.getElementById("nombre").innerHTML = errores[0];
    // pone en rojo su input del formulario
    document.getElementById("form-nombre").style.backgroundColor = "red";
  }

  // Categoría solo tenemos que validar que se haya seleccionado alguna
  if (nacionalidad.value !== "") {
    document.getElementById("nacionalidad").innerHTML = "Nacionalidad: " + nacionalidad.value;
    document.getElementById("form-nacionalidad").style.backgroundColor = "lightgreen";
  } else {
    document.getElementById("nacionalidad").innerHTML = errores[1];
    document.getElementById("form-nacionalidad").style.backgroundColor = "Puedes elegir un país de la lista";
  }
  // validación de contraseña
  if (validarContraseña(contraseña)) {
    document.getElementById("contraseña").innerHTML = "Contraseña: " + contraseña;
    document.getElementById("form-contraseña").style.backgroundColor = "lightgreen";
  } else {
    document.getElementById("contraseña").innerHTML = errores[2];
    document.getElementById("form-contraseña").style.backgroundColor = "red";
  }
  if (validarContraseña(contraseña)) {
    document.getElementById("contraseña").innerHTML = "Contraseña: " + contraseña;
    document.getElementById("form-passwordRepeat").style.backgroundColor = "lightgreen";
  } else {
    document.getElementById("contraseña").innerHTML = errores[2];
    document.getElementById("form-passwordRepeat").style.backgroundColor = "red";
  }
}

// Definición de la función que valida el nombre
function validarNombre(nombre) {
  let devolver = false;
  // Usando el objeto RegExp para la expresión regular que:
  // Solo acepte caracteres mayúsculas y minúsculas. De 10 a 25 caracteres alfabéticos
  // incluyendo la ñ. Obligatorio.
  let expresionRegular = new RegExp(/^[a-zñA-ZÑ]{10,25}$/);

  if (expresionRegular.test(nombre)) {
    devolver = true;
  }
  return devolver;
}

// Definición de la función que valida la contraseña
function validarContraseña(contraseña) {
  let devolver = false;

  // Contraseña no debe empezar en "ç", "," o "$" (?![ç,$])
  // No puede contener la cadena "select" o "where" (?!.*select) / (?!.*where)
  // No debe contener ";" (?!.*;)
  // Entre 8 y 21 caracteres (?=.{8,21})
  // Contener de 1 a 3 números" (?=.*\d{1,3})
  // Debe terminar en "." precedido de un número (?=.*\d\.$)

  let expresionRegular = new RegExp(/^(?![çÇ,$])(?!.*select)(?!.*SELECT)(?!.*where)(?!.*WHERE)(?!.*;)(?=.{8,21})(?=.*\d{1,3})(?=.*\d\.$)/
  );
  if (expresionRegular.test(contraseña)) {
    devolver = true;
  }
  return devolver;
}

// Definimos función para mostrar contraseña
function mostrarContraseña() {
  let campoContraseña = document.getElementById("form-contraseña");
  let campoContraseña2 = document.getElementById("form-passwordRepeat");
  let botonMostrar = document.getElementById('mostrarContraseña');

  botonMostrar.addEventListener('mousedown', function() {
    // Cuando el botón está pulsado, cambiamos el tipo a 'text'
    campoContraseña.type = 'text';
    campoContraseña2.type = 'text'
  });
  
  botonMostrar.addEventListener('mouseup', function() {
    // Cuando se suelta el botón, cambiamos el tipo a 'password'
    campoContraseña.type = 'password';
    campoContraseña2.type = 'password'
  });
  
  botonMostrar.addEventListener('mouseleave', function() {
    // Si el cursor sale del botón mientras está pulsado, también cambiamos el tipo a 'password'
    campoContraseña.type = 'password';
    campoContraseña2.type = 'password'
  });
}

// Aunque no pide que se tenga registro de la página en este formulario lo añado para que quede mejor
window.contarVisitas = function() {
  if (localStorage) {
      if (!localStorage["visita"]) {
          localStorage.setItem("visita", 1);
      } else {
          let contador = parseInt(localStorage.getItem("visita")) + 1;
          localStorage.setItem("visita", contador);
      }
      document.getElementById('visita').innerHTML = "Número de visitas a nuestra página: " + localStorage.getItem("visita");
  }
}
// Llamamos a la función
window.contarVisitas();
// definición de la función de borrado
function borrar() {
  // Obtenemos los elementos y los vaciamos/reseteamos
  document.getElementById("nombre").innerHTML = "";
  document.getElementById("nacionalidad").innerHTML = "";
  document.getElementById("contraseña").innerHTML = "";
  document.getElementById("admision").reset();
  // Borrado del color de fondo del formulario
  document.getElementById("form-nombre").style.backgroundColor = "";
  document.getElementById("form-nacionalidad").style.backgroundColor = "";
  document.getElementById("form-contraseña").style.backgroundColor = "";
}
