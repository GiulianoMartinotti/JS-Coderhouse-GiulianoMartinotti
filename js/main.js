const productos = [
    {
        id: "Adidas-01",
        nombre: "Adidas Metalbone HRD 3.3",
        precio: 380,
        imagen: "./imagenes/adidas-metalbone-hrd-2024.jpg"
    },
    {
        id: "Adidas-02",
        nombre: "Adidas Metalbone 3.3",
        precio: 380,
        imagen: "./imagenes/adidas-metalbone-3.3"
    },
    {
        id: "Adidas-03",
        nombre: "Adipower Multiweight CTRL",
        precio: 340,
        imagen: "./imagenes/adidas-adipower-multiweight.jpeg"
    },
    {
        id: "Adidas-04",
        nombre: "Adipower Legend",
        precio: 380,
        imagen: "./imagenes/adipower-legend.jpeg"
    },
    {
        id: "Adidas-05",
        nombre: "Cross It Light",
        precio: 380,
        imagen: "./imagenes/adidas-crossit.jpeg"
    },
    {
        id: "Nox-01",
        nombre: "AT10 LUXURY GENIUS 18K",
        precio: 360,
        imagen: "./imagenes/nox-at10-18k.webp"
    },
    {
        id: "Nox-02",
        nombre: "AT GENIUS ATTACK 18K",
        precio: 380,
        imagen: "./imagenes/nox-at-attack.webp"
    },
    {
        id: "Nox-03",
        nombre: "AT GENIUS ATTACK 12K",
        precio: 360,
        imagen: "./imagenes/nox-at-attack-12k.jpeg"
    },
    {
        id: "Nox-04",
        nombre: "AT10 LUXURY GENIUS 12K",
        precio: 380,
        imagen: "./imagenes/nox-at10-12k.webp"
    },
    {
        id: "Nox-05",
        nombre: "ML10 QUANTUM 3K",
        precio: 320,
        imagen: "./imagenes/nox-ml10.jpg"
    }
];



const contenedorProductos = document.querySelector("#contenedor-productos");
let botoncomprar = document.querySelectorAll(".agregarProducto");
const numeroDelCarrito = document.querySelector("#numeroDelCarrito")

function cargarProductos() {
    productos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
        <img class="imagenes-productos" src="${producto.imagen}" alt="">
        <div class="informacionDelProducto">
            <p>${producto.nombre}</p>
            <p class="precio">$${producto.precio}</p>
            <button class="agregarProducto" id="${producto.id}">Comprar</button>
        </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarbotoncomprar();
}
cargarProductos();


function actualizarbotoncomprar() {
    botoncomprar = document.querySelectorAll(".agregarProducto");

    botoncomprar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito)
    });
}

let productosEnCarrito;

const productosEnCarritoLS = localStorage.getItem("productos-en-carrito");


if (productosEnCarritoLS){
    productosEnCarrito = JSON.parse (productosEnCarritoLS);
    actualizarNumeroDelCarrito();
} else {
    productosEnCarrito = [];
}


function agregarAlCarrito(e) {

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumeroDelCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}


function actualizarNumeroDelCarrito() {

    let nuevoNumeroDelCarrito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numeroDelCarrito.innerText = nuevoNumeroDelCarrito;
}