import { Ciudadano } from "./js/ciudadano.js";
import { Espia } from "./js/espia.js";
import { Agencia } from "./js/agencia.js";

// Para acceder al elemento div con el id "resultado"
var resultado = document.getElementById("resultado");

// Función buscaTopos
var buscaTopos = function (agencia1, agencia2, nombreAgente) {
    // Comprobamos si los argumentos son de la clase Agencia
    if (agencia1 instanceof Agencia && agencia2 instanceof Agencia) {
        // Buscar el nombre del agente en la primera agencia
        let encontrado1 = false;
        for (let i = 0; i < agencia1.agentes.length; i++) {
            if (agencia1.agentes[i].nombre === nombreAgente) {
                encontrado1 = true;
            }
        }

        // Buscamos el nombre del agente en la segunda agencia
        let encontrado2 = false;
        for (let i = 0; i < agencia2.agentes.length; i++) {
            if (agencia2.agentes[i].nombre === nombreAgente) {
                encontrado2 = true;
            }
        }
        // Devolver true si el agente está en las dos agencias, false en caso contrario
        return encontrado1 && encontrado2;
    }
    else {
        throw new Error("Debe estar en Agencia");
    }
}

// Creamos cuatro objetos de la clase Ciudadano usando try y catch
let c1, c2, c3, c4;
try {
    c1 = new Ciudadano("Andrew", "Reino Unido", 32);
    c2 = new Ciudadano("Hanna", "Suiza", 25);
    c3 = new Ciudadano("Ivankov", "URSS", 51);
    c4 = new Ciudadano("Lisandra", "RFA", 28);
} catch (e) {
    // Mostramos el mensaje de error con la función console.error
    console.error(e.toString());
}
// Mostramos los datos de cada ciudadano usando el método toString y la propiedad innerHTML
resultado.innerHTML += "<p>" + c1.toString() + "</p>";
resultado.innerHTML += "<p>" + c2.toString() + "</p>";
resultado.innerHTML += "<p>" + c3.toString() + "</p>";
resultado.innerHTML += "<p>" + c4.toString() + "</p>";

// Creamos dos objetos de la clase Agencia usando try y catch
let cia, kgb;
try {
    cia = new Agencia("CIA", "USA");
    kgb = new Agencia("KGB", "URSS");
} catch (e) {
    // Mostramos el mensaje de error con la función console.error
    console.error(e.toString());
}

// Creamos diez objetos de la clase Espia usando try y catch
let e1, e2, e3, e4, e5, e6, e7, e8, e9, e10;
try {
    e1 = new Espia("Carlos", "RDA", 35, "infiltrado");
    e2 = new Espia("Julia", "USA", 27, "operativo");
    e3 = new Espia("Sergei", "URSS", 42, "ilegal");
    e4 = new Espia("Gemma", "Reino Unido", 31, "diplomático");
    e5 = new Espia("Hansel", "RFA", 29, "desestabilizador");
    e6 = new Espia("Marie", "Francia", 24, "provocador");
    e7 = new Espia("David", "USA", 33, "provocador");
    e8 = new Espia("Elena", "URSS", 38, "infiltrado");
    e9 = new Espia("Marco", "Reino Unido", 36, "provocador");
    e10 = new Espia("Lemar", "Francia", 26, "durmiente");
} catch (e) {
    // Mostramos el mensaje de error con la función console.error
    console.error(e.toString());
}

// Reclutamos algunos agentes para cada agencia usando try y catch
try {
    cia.reclutarAgente(e7);
    cia.reclutarAgente(e4);
    cia.reclutarAgente(e2);
    cia.reclutarAgente(e9);
    cia.reclutarAgente(e3); // Este será un topo
} catch (e) {
    // Mostramos el mensaje de error con la función console.error
    console.error(e.toString());
}
try {
    kgb.reclutarAgente(e1);
    kgb.reclutarAgente(e8);
    kgb.reclutarAgente(e5);
    kgb.reclutarAgente(e6);
    kgb.reclutarAgente(e9);// Este será otro topo
    kgb.reclutarAgente(e3);
} catch (e) {
    // Mostramos el mensaje de error con la función console.error
    console.error(e.toString());
}

// Mostramos los datos de cada agencia usando el método toString y la propiedad innerHTML
resultado.innerHTML += "<p>" + cia.toString() + "</p>";
resultado.innerHTML += "<p>" + kgb.toString() + "</p>";

// Usaremos el método del listado para que nos ordene por nombre los agentes de la CIA que sean del tipo provocador
resultado.innerHTML += "<b>Estos agentes del CIA son del tipo provocador: <br>";
try {
    resultado.innerHTML += cia.listadoAgentes("provocador") + "<br>";
} catch (e) {
    console.error(e.toString());
}

// Aqui para que nos saque la lista ordenada por nombre y por edad de los agentes de la CIA
resultado.innerHTML += "<b>Lista de agentes del CIA ordenados alfabeticamente por nombre: <br>";
try {
    resultado.innerHTML += cia.listadoOrdenado("nombre") + "<br>";
} catch (e) {
    console.error(e.toString());
}
resultado.innerHTML += "<b>Lista de agentes del CIA ordenados edad: <br>";
try {
    resultado.innerHTML += cia.listadoOrdenado("edad") + "<br>";
} catch (e) {
    console.error(e.toString());
}

// probamos a cesar a un agente del CIA
resultado.innerHTML += "<br>" + "<b>Vamos a cesar a David de la CIA";
try {
    resultado.innerHTML += "<br>";
    resultado.innerHTML += cia.cesarAgente("David");

} catch (e) {
    console.error(e.toString());
}
resultado.innerHTML += cia.toString();
resultado.innerHTML += "<br>";

// Buscamos si hay algún topo entre las agencias usando try y catch
try {
    resultado.innerHTML += "<b>Buscaremos al topo";
    resultado.innerHTML += "<p>¿Hay un topo entre la CIA y el KGB llamado Sergei? " + buscaTopos(cia, kgb, "Sergei") + "</p>"; // Devuelve true
    resultado.innerHTML += "<p>¿Hay un topo entre la CIA y el KGB llamado Marco? " + buscaTopos(cia, kgb, "Marco") + "</p>"; // Devuelve true
    resultado.innerHTML += "<p>¿Hay un topo entre la CIA y el KGB llamado Gemma? " + buscaTopos(cia, kgb, "Gemma") + "</p>"; // Devuelve false
} catch (e) {
    // Mostramos el mensaje de error con la función console.error
    console.error(e.toString());
}

// Comprobamos las clases
resultado.innerHTML += "<br>" + "<b>Ciudadanos: <br>";
resultado.innerHTML += c1.toString() + "<br>";
resultado.innerHTML += c2.toString() + "<br>";
resultado.innerHTML += "<br>" + "<b>Y espías: <br>";
resultado.innerHTML += e3.toString() + "<br>";
resultado.innerHTML += e7.toString() + "<br>";
// Comrpobaciones de nombre, pais y edad en ciudadanos y espías
try {
    c1.nombre = "Macario";
} catch (e) {
    console.error(e.toString());
}
try {
    c1.pais = "USA";
} catch (e) {
    console.error(e.toString());
}
try {
    c2.edad = "80";
} catch (e) {
    console.error(e.toString());
}
try {
    e3.pais = "Reino Unido";
} catch (e) {
    console.error(e.toString());
}
try {
    e7.edad = "90";
} catch (e) {
    console.error(e.toString());
}
try {
    e7.tipo = "desestabilizador";
} catch (e) {
    console.error(e.toString());
}


// Comprobamos los cambios realizados
resultado.innerHTML += "<br>" + " <b>MODIFICAMOS Y COMPROBAMOS LOS CAMBIOS" + "<br>";
resultado.innerHTML += "<br>" + " <b>Ciudadanos: " + "<br>";
resultado.innerHTML += c1.toString() + "<br>";
resultado.innerHTML += c2.toString() + "<br>";
resultado.innerHTML += "<br>" + " <b>Y espías: " + "<br>";
resultado.innerHTML += e3.toString() + "<br>";
resultado.innerHTML += e7.toString() + "<br>";

// Comprobamos Excepciones en ciudadanos y espias
// Comprobaremos las excepciones de nombre
try {
    c1 = new Ciudadano("Zeus", "Reino Unido", 32);
} catch (e) {
    console.error(e.toString());
}
// Comprobaremos las excepciones de edad inferior
try {
    c2 = new Ciudadano("Hannah", "Suiza", 1);
} catch (e) {
    console.error(e.toString());
}
// Comprobaremos las excepciones de edad superior
try {
    c3 = new Ciudadano("Ivankov", "URSS", 130);
} catch (e) {
    console.error(e.toString());
}
// Comprobaremos las excepciones de tipo
try {
    e1 = new Espia("Carlos", "RDA", 35, "aniquilador");
} catch (e) {
    console.error(e.toString());
}
// Comprobaremos las excepciones de String
try {
    e2 = new Espia("Julia", "USA", "Veintisiete", "operativo");
} catch (e) {
    console.error(e.toString());
}

// Comprobamos Excepciones de Agencia
// Comprobaremos las excepciones de cesar agente
try {
    resultado.innerHTML += kgb.cesarAgente(e1) + "<br>";
} catch (e) {
    console.error(e.toString());
}
// Comprobaremos las excepciones de numero en nombre
try {
    cia = new Agencia(1235, "URSS");
} catch (e) {
    console.error(e.toString());
}
// Comprobaremos las excepciones de 
try {
    cia = new Agencia("CIA", "Luxemburgo");
} catch (e) {
    console.error(e.toString());
}