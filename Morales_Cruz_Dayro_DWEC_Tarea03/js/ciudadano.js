export class Ciudadano {
    #_nombre;
    #_pais;
    #_edad;
    // Constructor
    constructor(nombre, pais, edad) {
        // Asignamos los valores
        this.nombre = nombre;
        this.pais = pais;
        this.edad = edad;
    }

    // Getters y Setter de nombre
    get nombre() {
        return this.#_nombre;
    }
    set nombre(nuevoNombre) {
        if (nuevoNombre.length < 5) {
            throw new Error("El nombre debe tener al menos 5 carácteres");
        }
        this.#_nombre = nuevoNombre;
    }
    // Getters y Setter de pais
    get pais() {
        return this.#_pais;
    }
    set pais(nuevoPais) {
        let paises = ["USA", "URSS", "Reino Unido", "RDA", "RFA", "Francia", "Suiza"];
        if (!paises.includes(nuevoPais)) {
            this.#_pais = "Suiza";
        } else {
            this.#_pais = nuevoPais;
        }
    }
    // Getters y Setter de edad
    get edad() {
        return this.#_edad;
    }
    set edad(nuevaEdad) {
        if (isNaN(Number(nuevaEdad)) || nuevaEdad < 2 || nuevaEdad > 124) {
            throw new Error("La edad debe estar comprendida entre mayor que 1 y menor que 125");
        } else {
            this.#_edad = parseInt(Number(nuevaEdad));  
        }
    }
    // Monstramos la información del objeto
    toString() {
        return (
            "<br/> El ciudadano tiene de nombre: <b>" + this.nombre +
            "<br/> </b>Nacido en: <b>" + this.pais + "</b> y tiene: <b>" + this.edad + " <b>años<b>"
        );
    }
}