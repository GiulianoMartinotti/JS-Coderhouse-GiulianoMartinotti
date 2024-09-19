//-----Variables y Constantes-----//

//Carrito de compras
let carrito = {};
let totaldeCompra = 0;
let marca;
let tipodeProducto;
let productoSeleccionado;

const tienda = "Padel Pro Shop"

//Marcas de paletas
const Adidas = [
    {
        modelo: "Metalbone HRD 3.3",
        año: 2024,
        forma: "Diamante",
        materiales: "Fibra de carbono aluminzado",
        peso: 345 - 365,
        eva: "High memory",
    },
    {
        modelo: "Adipower Multiweight CTRL",
        año: 2024,
        forma: "Redonda",
        materiales: "Carbono 18k",
        peso: 345 - 360,
        eva: "Goma eva"
    },
    {
        modelo: "Cross It Light",
        año: 2024,
        forma: "Redonda",
        materiales: "Fibra de carbono aluminizado 24k",
        peso: 345 - 360,
        eva: "High memory"
    },
    {
        modelo: "Metalbone 3.3",
        año: 2024,
        forma: "Diamante Oversize",
        materiales: "Fibra de carbono aluminzado 2 to 1",
        peso: 345 - 365,
        eva: "Eva soft"
    }
]

const Nox = [
    {
        modelo: "AT10 Genius 18k",
        año: 2024,
        forma: "Gota",
        materiales: "Fibra de carbono 18k",
        peso: 360 - 375,
        eva: "MLD black eva",
    },
    {
        modelo: "La10 Future",
        año: 2024,
        forma: "Diamante",
        materiales: "Fibra de carbono 12k",
        peso: 360 - 375,
        eva: "HR3 core"
    },
    {
        modelo: "Tl10 Future Eva",
        año: 2024,
        forma: "Lágrima",
        materiales: "Fibra de carbono 12k",
        peso: 363 - 367,
        eva: "HR3 core"
    },
    {
        modelo: "At10 Genius 12k",
        año: 2024,
        forma: "Gota",
        materiales: "Fibra de carbono 12k",
        peso: 360 - 370,
        eva: "MLD black eva",
    }
]


let selecciondeProducto = prompt("Bienvenido! Que marca de paleta estas buscando?")
let productos = selecciondeProducto.toLowerCase()

if (productos == "Adidas") {
    console.table(Adidas),
    marca = Adidas
    seleccionarmodelo()
} else if (productos == "Nox") {
    console.table(Nox)
    marca = Adidas
    seleccionarmodelo()
} else {
    alert ("Actualmente no tenemos stock de la marca "+selecciondeProducto+ ", puedes consultar más tarde!"),
    selecciondeProducto()
}

let seleccionarmodelo = () => {
    let seleccion = parseInt (prompt("Actualmente tenemos estos 4 modelos en stock!, Selecciona el que mas te guste para ver mas detalles!"))

    if (seleccion >= 1 && seleccion <= 4) {
        productoSeleccionado = marca [seleccion - 1]
        console.log (productoSeleccionado)
        añadiralcarrito ()
    }
}


































































//   Variables, ejemplos a tener en cuenta para la entrega

// let paleta = prompt ("Ingresa la marca de paleta")
// let indumentaria = prompt ("ingresa el tipo de indumentaria")


// Ejemplos de la clase
//let academia = prompt ("¿En que academia estas cursando?")
//alert("ESTAS SIENDO INVADIDO POR GIUX0508")
//console.log("Hola! actualmente estas estudiando Javascript en "+ academia)
//Variables constantes


//Parseo para poder hacer operaciones matematicas con prompt (especialmente para las sumas porque el "+" concatena) (parseInt para numeros enteros y parsefloat para numeros con decimales)
//let numeroA = parseInt (prompt ("Ingrese el primer número"))
//let numeroB = parseInt (prompt ("Ingrese el segundo número"))
//let resultado = numeroA + numeroB
//console.log(resultado)



//OR = ||
//let fruta = "sandia"
//let mes = "septiembre"
//let edad = 25

//if (fruta == "melon" || fruta == "sandia") {
//console.log("Creo que estamos hablanado del verano")
//}

//AND &&
//Else
//if (fruta == "sandia" && (mes == "diciembre" || "enero" || "febrero" || "marzo")){
//console.log("fruta y mes veraniego")
//} else{
//console.log("quizas no es del todo verano")
//}



//let edad = 17

//if (edad >= 18){
//console.log ("Podes entrar al boliche")
//} else{
//console.log ("Lamentablemente no podes entrarar al boliche")
//}


