
// funciones de almacenamiento de datos

function almacenamientoLocal(key, valor) {
    localStorage.setItem(key, JSON.stringify(valor))
}

function obtenerAlmacenamientoLocal(key) {
    const datos = JSON.parse(localStorage.getItem(key))
    return datos
}

let productos = obtenerAlmacenamientoLocal("productos") || [];

//constantes
const informacionDeCompra = document.getElementById("informacionDeCompra");
const contenedorDeCompra = document.getElementById("contenedorDeCompra");
const compraDeProductos = document.getElementById("compraDeProductos");
const contenedorC = document.getElementById("contenedorC");
const carrito = document.getElementById("carrito");
const header = document.querySelector("#header");
const numeroDelCarrito = document.getElementById("numeroDelCarrito");
const total = document.getElementById("total");
const x = document.getElementById("x");
const body = document.querySelector("#body");

//variables

let lista = []
let valortotal = 0


window.addEventListener("scroll", function () {
    if (contenedorC.getBoundingClientRect().top < 10) {
        header.classList.add("scroll")
    }
    else {
        header.classList.remove("scroll")
    }
})
window.addEventListener('load', () => {
    visualizarProductos();
    contenedorDeCompra.classList.add("none")
})

function visualizarProductos() {
    contenedorC.innerHTML = ""
    for (let i = 0; i < productos.length; i++) {
        if (productos[i].existencia > 0) {
            contenedorC.innerHTML += `<div><imgjv src="${productos[i].urlImagen}"><div class="informacion"><p>${productos[i].nombre}</p><p class="precio">$${productos[i].valor}</p><button onclick=comprar(${i})>Comprar</button></div></div>`
        }
        else {
            contenedorC.innerHTML += `<div><imgjv src="${productos[i].urlImagen}"><div class="informacion"><p>${productos[i].nombre}</p><p class="precio">$${productos[i].valor}</p><p class="soldOut">Sold Out</p></div></div>`
        }
    }
}

function comprar(indice) {
    lista.push({ nombre: productos[indice].nombre, precio: productos[indice].valor })
    let van = true
    let i = 0
    while (van == true) {
        if (productos[i].nombre == productos[indice].nombre) {
            productos[i].existencia -= 1
            if (productos[i].existencia == 0) {
                visualizarProductos()
            }
            van = false
        }
        guardarAlmacenamientoLocal("productos", productos)
        i += 1
    }
    numeroDelCarrito.innerHTML = lista.length
    numeroDelCarrito.classList.add("diseñoNumero")
    return lista
}
carrito.addEventListener("click", function () {
    body.style.overflow = "hidden"
    contenedorDeCompra.classList.remove('none')
    contenedorDeCompra.classList.add('contenedorCompra')
    informacionDeCompra.classList.add('informacionCompra')
    mostrarElemtrosLista()
})

function mostrarElemtrosLista() {
    productosCompra.innerHTML = ""
    valortotal = 0
    for (let i = 0; i < lista.length; i++) {
        productosCompra.innerHTML += `<div><div class="img"><button onclick=eliminar(${i}) class="botonTrash"><img src="/img/trash.png"></button><p>${lista[i].nombre}</p></div><p> $${lista[i].precio}</p></div>`
        valortotal += parseInt(lista[i].precio)
    }
    total.innerHTML = `<p>Valor Total</p> <p><span>$${valortotal}</span></p>`
}

function eliminar(indice) {
    let van = true
    let i = 0
    while (van == true) {
        if (productos[i].nombre == lista[indice].nombre) {
            productos[i].existencia += 1
            lista.splice(indice, 1)
            van = false
        }
        i += 1
    }
    guardarAlmacenamientoLocal("productos", productos)
    numeroDelCarrito.innerHTML = lista.length
    if (lista.length == 0) {
        numeroDelCarrito.classList.remove("diseñoNumero")
    }
    visualizarProductos()
    mostrarElemtrosLista()
}
x.addEventListener("click", function () {
    body.style.overflow = "auto"
    contenedorDeCompra.classList.add('none')
    contenedorDeCompra.classList.remove('contenedorCompra')
    informacionDeCompra.classList.remove('informacionCompra')
})
