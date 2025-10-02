import { Espia } from "./espia.js";
// Creamos la clase agencia
export class Agencia {
    #_nombreAgencia;
    #_pais;
    #_agentes;
    // Constructor
    constructor(nombreAgencia, pais) {
        this.nombreAgencia = nombreAgencia;
        this.pais = pais;
        // Creamos un array vacío para guardar los agentes
        this.#_agentes = [];
    }

    // Método reclutarAgente
    reclutarAgente(objetoEspia) {
        let resultado = false;
        // Comprobamos si el objeto es de la clase Espia
        if (objetoEspia instanceof Espia) {
            // Comprobamos si el objeto ya está en el array de agentes
            let encontrado = false;
            for (let i = 0; i < this.#_agentes.length; i++) {
                if (this.#_agentes[i].nombre === objetoEspia.nombre) {
                    encontrado = true;
                }
            }
            // Si no está, añadirlo al array y establecer resultado a true
            if (!encontrado) {
                this.#_agentes.push(objetoEspia);
                resultado = true;
            }
        }
        // Devolvemos el resultado
        return resultado;
    }

    // Método cesarAgente
    cesarAgente(nombre) {
        let resultado = false;
        if (typeof nombre === "string") { // comprobamos que es String
            for (let i = 0; i < this.#_agentes.length; i++) {
                if (this.#_agentes[i].nombre === nombre) {
                    this.#_agentes.splice(i, 1);
                    i--;
                    cesar = true;
                }
            }
        } else {
            throw new Error("El campo introducido no es un nombre correcto")
        }
        return resultado;
    }

    // Método listadoAgentes
    listadoAgentes(tipo) {
        let resultado = "";
        if (typeof tipo === "string") {
            for (let agente of this.#_agentes) {
                if (agente.tipo === tipo) {
                    // Añadir los datos del agente al resultado
                    resultado += agente.toString() + "<br/>";
                }
            }
        }
        // Devolvemos el resultado
        return resultado;
    }

    // Método listadoOrdenado
    listadoOrdenado(criterio) {
        // Creamos un string vacío para guardar el resultado
        let resultado = ""; // iniciamos la variable de salida
        let listaOrden = this.#_agentes.slice();
        // Ordenamos por nombre
        if (criterio === "nombre") {
            listaOrden = listaOrden.sort(function (a, b) {
                return a.nombre.localeCompare(b.nombre);
            });
            // Ordenamos por edad
        } else if (criterio === "edad") {
            listaOrden = listaOrden.sort(function (a, b) {
                return a.edad - b.edad;
            });
        } else {
            throw new Error("El criterio debe ser nombre o edad");
        }
        // Recorremos la lista ordenada y añadir los datos de cada agente al resultado
        for (let agente of listaOrden) {
            resultado += agente.toString() + "<br>";
        }
        return resultado;
    }

    // Método toString
    toString() {
        // Devolvemos el resultado de #_formateaInfo()
        return this.#_formateaInfo();
    }

    #_formateaInfo() {
        // Creamos un string vacío para guardar el resultado
        let resultado = "" + "<br>";
        let Paises = this.#_agentes.splice();
        Paises = Paises.sort(function (a, b) {
            return a.pais.localeCompare(b.pais);
        });
        // Añadimos el nombre de la agencia y el país al resultado
        resultado += "<b>Agencia: </b>" + this.nombreAgencia + " <b>El pais: </b>" + this.pais + "\n" + "<br>";
        // Una línea separadora al resultado
        resultado += "----------------------------------------" + "<br>";
        // Los títulos de las columnas al resultado
        resultado += "<b>| - Nombre - | - País - | - Edad - | - Tipo - |" + "<br></b>";
        // Otra línea separadora al resultado
        resultado += "----------------------------------------" + "<br>";
        // Recorremos el array de agentes y añadimos los datos de cada uno al resultado
        for (let agente of this.#_agentes) {
            resultado += `| ${agente.nombre} | ${agente.pais} | ${agente.edad} | ${agente.tipo} |` + "<br>";
        }
        // Añadimos una última línea separadora al resultado
        resultado += "----------------------------------------" + "<br>" + "<br>";
        // Devolvemos el resultado
        return resultado;
    }
    // Getters y Setter de nombreAgencia
    get nombreAgencia() {
        return this.#_nombreAgencia;
    }
    set nombreAgencia(nuevoNombreAgencia) {
        if (typeof nuevoNombreAgencia !== "string") { // comprobamos que es un String, sino lanza una excepcion
            throw new Error("El nombre de la Agencia no es una cadena");
        } else {
            this.#_nombreAgencia = nuevoNombreAgencia;
        }
    }
    // Getters y Setter de pais  
    get pais() {
        return this.#_pais;
    }
    set pais(nuevoPais) {
        // Comprobamos si el nuevo país es válido
        let paises = ["USA", "Reino Unido", "URSS"];
        if (!paises.includes(nuevoPais)) {
            // Lanzamos una excepción si el país no está en la lista
            throw new Error("El país debe ser uno de estos: " + paises.join(", "));
        }
        this.#_pais = nuevoPais;
    }
    // Getter de agentes
    get agentes() {
        return this.#_agentes;
    }
}