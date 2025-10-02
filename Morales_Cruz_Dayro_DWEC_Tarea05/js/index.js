// Cuando la página se carga, se llama a la función iniciar.
window.onload = function () {
    iniciar();
}

// La función iniciar crea un botón de inicio y lo añade al cuerpo del documento.
function iniciar() {
    var body = document.getElementsByTagName("body")[0];  // Obtiene el elemento body del documento
    var botonInicio = document.createElement("button");
    var textoBotonInicio = document.createTextNode("INICIO");
    botonInicio.appendChild(textoBotonInicio);  // Añade el nodo de texto al botón
    botonInicio.addEventListener("click", function () {
        body.removeChild(botonInicio);  // Elimina el botón de inicio del cuerpo del documento
        var contenedor = document.createElement("div");
        contenedor.id = "contenedor";  // Asigna el id "contenedor" al div
        contenedor.style.display = "flex";  // Aplica el estilo de visualización "flex" al div
        document.body.appendChild(contenedor);
        crearBotones();  // Llama a la función crearBotones
        crearTabla(5, 5);
        crearContenido();
    });
    body.appendChild(botonInicio);  // Añade el botón de inicio al cuerpo del documento
}

// Se crean algunas variables globales para almacenar los fragmentos de audio, el índice actual y el audio actual.
var fragmentos = [];
var indiceActual = 0;
var audioActual;

// La función crearTabla crea una tabla con un número dado de filas y columnas y la añade al cuerpo del documento.
function crearTabla(filas, columnas) {
    var tabla = document.createElement("table");
    tabla.id = "tabla";  // Asigna el id "tabla" a la tabla
    document.body.appendChild(tabla);  // Añade la tabla al cuerpo del documento

    for (var i = 0; i < filas; i++) {
        var fila = document.createElement("tr");
        tabla.appendChild(fila);  // Añade la fila a la tabla

        for (var j = 0; j < columnas; j++) {
            var celda = document.createElement("td");
            celda.addEventListener("click", reproducirFragmentos(i, j));  // Añade un evento de clic a la celda que llama a la función reproducirFragmentos
            fila.appendChild(celda);  // Añade la celda a la fila
        }
    }
}


function reproducirFragmentos(i, j) {
    return function () {
        // Cambiar el contenido de la casilla y reproducir el sonido oculto en esa casilla
        var textoCelda = document.createTextNode("Track");
        this.appendChild(textoCelda);
        var indiceAudio = i * 5 + j + 1;
        var audio = new Audio('./audio/' + indiceAudio + '.wav');
        audio.play();
        fragmentos.push(audio);
    };
}

function reproducirTodosLosFragmentos() {
    if (indiceActual < fragmentos.length) {
        audioActual = fragmentos[indiceActual];
        audioActual.play();
        audioActual.onended = function () {
            indiceActual++;
            reproducirTodosLosFragmentos();
        };
    } else {
        indiceActual = 0;  // Reiniciar el índice para la próxima vez que se pulse "Reproducir"
    }
}

function crearBotones() {
    var botones = ["Borrar", "Reproducir", "Parar"];
    botones.forEach(function (boton) {
        var nuevoBoton = document.createElement("button");
        var textoBoton = document.createTextNode(boton);
        nuevoBoton.appendChild(textoBoton);
        nuevoBoton.addEventListener("click", function () {
            if (boton === "Borrar") {
                // Reiniciar los fragmentos musicales elegidos
                fragmentos = [];
                // Reiniciar las celdas de la tabla
                var celdas = document.getElementsByTagName("td");
                for (var i = 0; i < celdas.length; i++) {
                    while (celdas[i].firstChild) {
                        celdas[i].removeChild(celdas[i].firstChild);
                    }
                }
            }
            if (boton === "Reproducir") {
                // Reproducir los fragmentos musicales en el orden en que se pulsaron
                reproducirTodosLosFragmentos();
            }
            if (boton === "Parar") {
                // Parar la reproducción
                if (audioActual) {
                    audioActual.pause();
                }
            }
        });
        document.body.appendChild(nuevoBoton);
    });
}

function crearContenido() {
    var contenido = document.createElement("div");  // Crea un nuevo div para el contenido
    contenido.id = "divContenido";  // Asigna un id al div de contenido

    var divImagenes = document.createElement("div");
    divImagenes.id = "div1";

    var imagen1 = document.createElement("img");  // Crea una nueva imagen
    imagen1.src = "./img/imagen1.jpg";  // Asigna la fuente de la imagen
    var imagen2 = document.createElement("img");
    imagen2.src = "./img/imagen2.jpg";

    divImagenes.appendChild(imagen1);  // Añaden las imagenes al div de imágenes
    divImagenes.appendChild(imagen2);

    var divTexto = document.createElement("div");
    divTexto.id = "div2";

    var texto = document.createElement("p");  // Crea un nuevo párrafo
    var textoParrafo = document.createTextNode("La música es una forma de arte que ha sido una parte integral de la sociedad humana a lo largo de la historia. Se cree que la música existe desde que los humanos comenzaron a comunicarse, y los ritmos son una parte fundamental de ella.");  // Crea un nodo de texto para el párrafo
    texto.appendChild(textoParrafo);  // Añade el nodo de texto al párrafo
    divTexto.appendChild(texto);

    contenido.appendChild(divImagenes);
    contenido.appendChild(divTexto);

    document.body.appendChild(contenido);
}

