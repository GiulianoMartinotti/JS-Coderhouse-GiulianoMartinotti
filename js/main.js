let productos = [];

fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    })


const contenedorProductos = document.querySelector("#contenedor-productos");
let botoncomprar = document.querySelectorAll(".agregarProducto");
const numeroDelCarrito = document.querySelector("#numeroDelCarrito");


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




function actualizarbotoncomprar() {
    botoncomprar = document.querySelectorAll(".agregarProducto");

    botoncomprar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito)
    });
}

let productosEnCarrito;

const productosEnCarritoLS = localStorage.getItem("productos-en-carrito");


if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumeroDelCarrito();
} else {
    productosEnCarrito = [];
}


function agregarAlCarrito(e) {
    Toastify({
        text: "Se ha agregado al carrito ✓",
        duration: 3000,
        close: false,
        gravity: "top", 
        position: "right", 
        stopOnFocus: true, 
        style: {
            background: "#A90000",
            fontSize: "1rem",
            color: "#ffffff",
            borderRadius: "2rem",
        },
        onClick: function () { }
    }).showToast();

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