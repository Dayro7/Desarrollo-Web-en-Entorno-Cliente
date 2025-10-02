// Ejercicio 5

// Crearemos una función para calcular el área del casquete
function calcularAreaCasquete() {

// Pedimos el valor de R
    let R = parseFloat(prompt("Introduce el valor de R (Radio de la esfera) en cm: "));
// Pedimos el valor de a
    let a = parseFloat(prompt("Introduce el valor de a (radio del círculo que forma dicho casquete) en cm: "));
// Pedimos el valor de h
    let h = parseFloat(prompt("Introduce el valor de h (altura de dicho casquete) en cm: "));

// Calculamos el área usando la fórmula siguiente:
    let A = Math.PI * (a * a + h * h) * R;

// Mostramos el resultado
    let resultadoElement = document.createElement("div");
    resultadoElement.textContent = "El área del casquete esférico es de " + A.toFixed(2) + " cm².";
    document.body.appendChild(resultadoElement);
}
// Llamamos a la función
calcularAreaCasquete();
