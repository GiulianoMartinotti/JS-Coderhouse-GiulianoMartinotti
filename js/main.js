
let carrito = [];
let totaldeCompra = 0;
let marca;
let tipodeProducto;
let productoSeleccionado;

//log in
let nombreyapellido = prompt("Ingrese su nombre y apellido")
let contraseña = prompt("Ingrese su contraseña")

alert("!Bienvenido " + nombreyapellido + "!")

const tienda = "Padel Pro Shop"

const Adidas1 = {
    modelo: "Metalbone HRD 3.3",
    año: 2024,
    forma: "Diamante",
    materiales: "Fibra de carbono aluminzado",
    peso: "345-365",
    eva: "High memory",
    precio: "$340",
}
const Adidas2 = {
    modelo: "Adipower Multiweight CTRL",
    año: 2024,
    forma: "Redonda",
    materiales: "Carbono 18k",
    peso: "345 - 360",
    eva: "Goma eva",
    precio: "$340",
}
const Adidas3 = {
    modelo: "Cross It Light",
    año: 2024,
    forma: "Redonda",
    materiales: "Fibra de carbono aluminizado 24k",
    peso: "345 - 360",
    eva: "High memory",
    precio: "$290"
}
const Adidas4 = {
    modelo: "Metalbone 3.3",
    año: 2024,
    forma: "Diamante Oversize",
    materiales: "Fibra de carbono aluminzado 2 to 1",
    peso: "345 - 365",
    eva: "Eva soft",
    precio: "$320",
}


/*const Nox1 = {
    modelo: "AT10 Genius 18k",
    año: 2024,
    forma: "Gota",
    materiales: "Fibra de carbono 18k",
    peso: "360 - 375",
    eva: "MLD black eva",
    precio: "$300",
}
const Nox2 = {
    modelo: "La10 Future",
    año: 2024,
    forma: "Diamante",
    materiales: "Fibra de carbono 12k",
    peso: "360 - 375",
    eva: "HR3 core",
    precio: "$290",
}
const Nox3 = {
    modelo: "Tl10 Future Eva",
    año: 2024,
    forma: "Lágrima",
    materiales: "Fibra de carbono 12k",
    peso: "363 - 367",
    eva: "HR3 core",
    precio: "$265",
}
const Nox4 = {
    modelo: "At10 Genius 12k",
    año: 2024,
    forma: "Gota",
    materiales: "Fibra de carbono 12k",
    peso: "360 - 370",
    eva: "MLD black eva",
    precio: "$280",
}
*/

//let selecciondeProducto = prompt("¿Que marca de paleta estas buscando?")

const paletasadidas = [Adidas1, Adidas2, Adidas3, Adidas4]
/*const paletasnox = [Nox1, Nox2, Nox3, Nox4]*/

for (const paletasadida of paletasadidas) {
    console.log("modelo: " + paletasadida.modelo)
}

/*for (const paletasno of paletasnox) {
    console.log ("modelo: "+ paletasno.modelo)
}*/


let selecciondeProducto = prompt("¿Que modelo de paleta estas buscando?")

if (selecciondeProducto == "Adidas1"){
    console.table(Adidas1),
    marca = Adidas1
} else if (selecciondeProducto == "Adidas2"){
    console.table(Adidas2)
    marca = Adidas2
} else if (selecciondeProducto == "Adidas3"){
    console.table(Adidas3)
    marca = Adidas3
} else if (selecciondeProducto == "Adidas4"){
    console.table(Adidas4)
    marca = Adidas4
} else {
    alert ("Actualmente no tenemos stock de modelos " + selecciondeProducto + ", puedes consultar más tarde! Gracias por visitar " + tienda)
}


/*const agregaralcarrito = () => {
    let finalizarcompra = prompt ("Desea agregar el modelo " + productoSeleccionado.modelo + " al carrito? \n (confirmar/cancelar)").toLowerCase()

    if(finalizarcompra == "confirmar"){
        carrito.push(productoSeleccionado)
        totaldeCompra = totaldeCompra + productoSeleccionado.precio
        console.table (carrito)
    } else if (finalizarcompra === "cancelar"){
        console.log ("Se canceló la compra.")
    } else {
        alert ("Siga comprando!")
        agregaralcarrito()
    }
}
*/


































































