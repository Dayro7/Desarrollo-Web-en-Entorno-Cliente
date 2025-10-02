import { Ciudadano } from "./ciudadano.js";
// Creamos la Clase espía que hereda de Ciudadano
export class Espia extends Ciudadano {
    #_tipo;
    // Constructor
    constructor(nombre, pais, edad, tipo) {
        // Llamamos al constructor de la clase padre
        super(nombre, pais, edad);
        // Asignamos el valor a tipo
        this.tipo = tipo;
        // Comprobamos si el tipo es válido
    }
    // Getters y Setters de tipo
    get tipo() {
        return this.#_tipo;
    }
    set tipo(nuevoTipo) {
        // Comprobamos si el nuevo tipo es válido
        let tipos = ["desestabilizador", "diplomático", "infiltrado", "ilegal", "operativo", "provocador", "durmiente"];
        if (!tipos.includes(nuevoTipo)) {
            // Lanzamos una excepción si el nuevo tipo no está entre las opciones
            throw new Error("El tipo debe ser una de estas opciones: " + tipos.join(", "));
        }
        this.#_tipo = nuevoTipo;
    }
    get edad() {
        return super.edad;
    }
    set edad(nuevaEdad) {
        if (nuevaEdad < 16 || nuevaEdad > 125) {
            throw new Error ("La edad debe ser entre mayor que 15 y 125 años");
        } else {
            super.edad = nuevaEdad;
        }
    }
    toString() {
        // Llamamos al método de la clase padre añadiendo tipo
        return (
            "<br/></b>El espía tiene de nombre: <b>" + this.nombre +
            "<br/></b>Nacido en: <b>" + this.pais + "</b> y tiene: <b>" + this.edad + "</b> años" +
            "<br/>Es un espía <b>" + this.tipo + "."
        );
    }
}