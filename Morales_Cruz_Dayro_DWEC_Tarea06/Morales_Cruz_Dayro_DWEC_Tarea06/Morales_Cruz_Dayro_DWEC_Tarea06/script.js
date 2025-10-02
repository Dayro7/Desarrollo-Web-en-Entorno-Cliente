$(() => {
  const apiKey = "HAWWRKRH6B427QD2S6MM7XYAT";
  $("#info-tiempo").hide(); // Oculta el elemento con el ID "info-tiempo" al cargar la página

  // Función para obtener la previsión del tiempo actual
  async function obtenerPrevisionActual(latitud, longitud, dias) {
    let fechas;
    try {
      // si el numero de dias es 0 o 1 lo cambiamos por today en el resto de los casos indicamos los siguientes X dias
      if (dias === 1 || dias === 0) {
        fechas = "today";
      } else {
        fechas = "next${dias}days";
      }

      const respuesta = await fetch(
        // URL de la API para obtener la previsión del tiempo
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitud},${longitud}/${fechas}?unitGroup=metric&key=${apiKey}&contentType=json&lang=es`
      );
      const datos = await respuesta.json(); // Convierte la respuesta a JSON
      console.log(datos);
      return datos; // Devuelve los datos de la previsión del tiempo
    } catch (error) {
      console.error("Error al obtener la previsión del tiempo:", error); // Maneja los errores
      return null; // Devuelve null en caso de error
    }
  }

  async function obtenerPrevisionProximosDias(latitud, longitud, dias) {
    try {
      // si el numero de dias es 0 o 1 lo cambiamos por today en el resto de los casos indicamos los siguientes X dias
      if (dias === 1 || dias === 0) {
        fechas = "today";
      } else {
        fechas = "next" + dias + "days";
      }

      const respuesta = await fetch(
        // URL de la API para obtener la previsión del tiempo
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitud},${longitud}/${fechas}?unitGroup=metric&key=${apiKey}&contentType=json&lang=es`
      );
      const datos = await respuesta.json(); // Convierte la respuesta a JSON
      return datos; // Devuelve los datos de la previsión del tiempo
    } catch (error) {
      console.error("Error al obtener la previsión del tiempo:", error); // Maneja los errores
      return null; // Devuelve null en caso de error
    }
  }

  // Función para mostrar la previsión del tiempo del día actual
  function mostrarPrevisionActual(
    datosPrevision,
    ciudad,
    country,
    region,
    population
  ) {
    // Mostrar el nombre de la ciudad, país, región y población
    $("#titulo-ciudad").html(
      `${ciudad} - ${country} - ${region} - Población: ${population} </br> Estaciones: `
    );
    // Mostrar el elemento con el ID "info-tiempo"
    $("#info-tiempo").show();

    // Limpiar contenido previo de la tabla
    $("#previsionTable tbody").empty();

    // Crear una fila para mostrar todos los datos
    const filaDatos = $("<tr>").addClass("dias");
    
    // con JQuery recorremos el array de datosPrevision.station obteniendo su conenido y ya podemos acceder a sus propiedades
    $.each(datosPrevision.stations, function (stationId, station) {
      $("#titulo-ciudad").append(` ${station.id}`);
    });

    // Añadir cada dato como una celda en la fila
    filaDatos.append($("<td>").text("Día Actual"));
    filaDatos.append(
      $("<td>").text(
        `Máxima: ${datosPrevision.days[0].tempmax}°C, Mínima: ${datosPrevision.days[0].tempmin}°C`
      )
    );
    filaDatos.append($("<td>").text(`${datosPrevision.days[0].conditions}`));
    filaDatos.append($("<td>").text(`${datosPrevision.days[0].windspeed} m/s`));
    filaDatos.append(
      $("<td>").text(`${datosPrevision.days[0].precip > 0 ? "Sí" : "No"}`)
    );
    filaDatos.append($("<td>").text(`${datosPrevision.days[0].visibility} km`));
    filaDatos.append($("<td>").text(`${datosPrevision.days[0].humidity} %`));

    // Agregar la fila a la tabla
    $("#previsionTable tbody").append(filaDatos);
  }

  // Función para mostrar la previsión del tiempo de los próximos días
  function mostrarPrevisionProximosDias(datosPrevisionProximosDias) {
    $("#info-tiempo").show(); // Muestra el elemento con el ID "info-tiempo"

    // Recorre la previsión de los próximos 10 días y crea elementos para cada día en la tabla
    datosPrevisionProximosDias.days.slice(1).forEach((dia, index) => {
      const contenedorDia = $("<tr>");

      // Agregar información del día
      const infoTempDias = $("<td>").text(`Día ${index + 1}`);
      contenedorDia.append(infoTempDias);

      // Agregar información de temperatura
      const infoTempDia = $("<td>").text(
        `Máxima mediodía: ${dia.tempmax}°C
         Mínima noche: ${dia.tempmin}°C`
      );
      contenedorDia.append(infoTempDia);

      // Obtener el icono del clima correspondiente al día
      const iconoClima = $("<td>");
      const iconoNombre = dia.icon; // Usa la propiedad icon del objeto
      const iconoURL = `iconos/${iconoNombre}.png`;
      const imgIcono = $("<img>").attr("src", iconoURL);
      iconoClima.append(imgIcono);
      contenedorDia.append(iconoClima);

      // Agregar el contenedor del día a la tabla
      $("#previsionTable tbody").append(contenedorDia);
    });
  }

  // Evento click al botón de Tiempo Actual
  $("#btnTiempoActual").on("click", async () => {
    const ciudad = $("#localidad").val(); // Obtiene el valor de la ciudad desde un input
    if (!ciudad.trim()) {
      // Verifica si la ciudad está vacía o tiene solo espacios en blanco
      alert("Por favor, introduzca una ciudad."); // Muestra una alerta si no se proporciona una ciudad
      return;
    }

    const geolocalizacion = await obtenerGeolocalizacion(ciudad); // Obtiene la geolocalización de la ciudad
    if (!geolocalizacion) {
      // Verifica si no se pudo obtener la geolocalización
      alert("No se pudo obtener la geolocalización de la ciudad."); // Muestra una alerta si no se pudo obtener la geolocalización
      return;
    }

    const { latitude, longitude, country, region, population } =
      geolocalizacion; // Obtiene los datos adicionales

    const datosPrevision = await obtenerPrevisionActual(
      latitude,
      longitude,
      1 // Obtiene la previsión del tiempo actual para 1 día
    );

    const datosPrevisionProximosDias = await obtenerPrevisionProximosDias(
      latitude,
      longitude,
      10 // // Obtiene la previsión del tiempo actual para los próximos 10 días
    );

    // Muestra la previsión del tiempo actual
    mostrarPrevisionActual(datosPrevision, ciudad, country, region, population);

    // Muestra la previsión de los próximos 10 días
    mostrarPrevisionProximosDias(datosPrevisionProximosDias, ciudad);

    // Inicializa el mapa
    inicializarMapa(latitude, longitude);
  });

  // Evento click al botón de Posición GPS
  $("#btnPosicionGPS").on("click", obtenerPosicionGPS);

  let mapa; // se crea la variable de forma global

  // Función para inicializar el mapa con una posición dada por latitud y longitud
  function inicializarMapa(latitud, longitud) {
    if (mapa) {
      // si el mapa esta creado
      mapa.remove(); // lo elimina
    }
    // Crea el mapa
    mapa = L.map("geomap").setView([latitud, longitud], 13);

    // Añade la capa de OpenStreetMap al mapa
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(mapa);

    // Añade un marcador al mapa en la ubicación actual
    var marcador = L.marker([latitud, longitud], { draggable: true }).addTo(
      mapa
    );

    // Añade un evento de clic al marcador para mostrar la previsión del tiempo
    marcador.on("click", async function () {
      const datosPrevision = await obtenerPrevisionActual(latitud, longitud, 1);
      var contenidoPopup = mostrarPrevisionActualpop(datosPrevision);
      var popup = L.popup()
        .setLatLng([latitud, longitud])
        .setContent(contenidoPopup)
        .openOn(mapa);
    });
  }

  // Función para obtener la posición GPS actual
  function obtenerPosicionGPS() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (posicion) {
          const latitud = posicion.coords.latitude; // Obtiene la latitud
          const longitud = posicion.coords.longitude; // Obtiene la longitud
          inicializarMapa(latitud, longitud); // Inicializa el mapa con la posición actual
        },
        function (error) {
          console.error("Error al obtener la posición GPS:", error); // Maneja los errores
        }
      );
    } else {
      console.error("Geolocalización no soportada"); // Muestra un mensaje si la geolocalización no está soportada
    }
  }

  // Función para mostrar los datos de la previsión del tiempo en un formato específico
  function mostrarPrevisionActualpop(datosPrevision) {
    // Retorna una cadena de texto con los datos de la previsión del tiempo
    return `
   <strong>Dia actual</strong><br>
   <strong>Temperatura:</strong> ${datosPrevision.days[0].temp}°C<br>
   <strong>Viento:</strong> ${datosPrevision.days[0].windspeed} m/s<br>
   <strong>Condición climática:</strong> ${datosPrevision.days[0].conditions}<br>
   <strong>Lluvia:</strong> ${datosPrevision.days[0].precip} mm<br>
   <strong>Visibilidad:</strong> ${datosPrevision.days[0].visibility} km<br>
   <strong>Humedad:</strong> ${datosPrevision.days[0].humidity} %
 `;
  }

  // Función para obtener la geolocalización de una ciudad utilizando AJAX
  async function obtenerGeolocalizacion(ciudad) {
    try {
      // URL del servicio web para obtener la geolocalización de la ciudad
      const url = `http://geodb-free-service.wirefreethought.com/v1/geo/cities`;
      // Parámetros de la solicitud
      const params = {
        namePrefix: ciudad, // Prefijo del nombre de la ciudad
        limit: 1, // Límite de resultados
        offset: 0, // Desplazamiento
        key: apiKey, // Clave de la API
        countryIds: "es", // ID del país
        languageCode: "es", // idioma deseado de los datos devueltos
      };

      // Realizar la solicitud AJAX utilizando $.ajax de jQuery
      const datos = await $.ajax({
        url: url, // URL del servicio
        type: "GET", // Tipo de solicitud (GET en este caso)
        data: params, // Datos a enviar en la solicitud
      });

      // Verificar si se obtuvieron datos válidos y si hay datos de la ciudad buscada
      if (datos && datos.data && datos.data.length > 0) {
        // Extraer la latitud y longitud de la primera ciudad encontrada
        const { latitude, longitude, country, region, population } =
          datos.data[0];

        // Devolver la latitud, longitud, país, región y población como un objeto
        return { latitude, longitude, country, region, population };
      } else {
        // Mostrar una alerta si no se encontraron datos para la ciudad proporcionada
        alert("No se encontraron datos para la ciudad proporcionada.");
        return null;
      }
    } catch (error) {
      // Manejar cualquier error que ocurra durante la solicitud AJAX
      console.error("Error al obtener la geolocalización:", error);
      return null; // Devolver null en caso de error
    }
  }
});
