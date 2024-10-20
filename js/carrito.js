let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);


const carritoVacio = document.querySelector("#carrito-vacio");
const productosCarrito = document.querySelector("#productos-carrito");
const interaccionesCarrito = document.querySelector("#interacciones-carrito");
const compraRealizada = document.querySelector("#compra-realizada");
let botonEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#vaciar");
const botonComprar = document.querySelector(".carrito-comprar")
const actualizarCarrito = document.querySelector("#total");


function cargarProductosCarrito(){
    if (productosEnCarrito && productosEnCarrito.length > 0) {
        carritoVacio.classList.add("disabled");
        productosCarrito.classList.remove("disabled");
        interaccionesCarrito.classList.remove("disabled");
        compraRealizada.classList.add("disabled");
    
        productosCarrito.innerHTML = "";
    
        productosEnCarrito.forEach(producto => {
    
            const div = document.createElement("div");
            div.classList.add("producto-carrito");
            div.innerHTML = `
                        <img class="producto-carrito-img" src="${producto.imagen}" alt="${producto.nombre}">
                        <div class="carrito-producto-nombre">
                            <small>Nombre</small>
                            <h3>${producto.nombre}</h3>
                        </div>
                        <div class="carrito-producto-cantidad">
                            <small>Cantidad</small>
                            <p>${producto.cantidad}</p>
                        </div>
                        <div class="carrito-producto-precio">
                            <small>Precio</small>
                            <p>$${producto.precio}</p>
                        </div>
                        <div class="carrito-producto-subtotal">
                            <small><sub></sub>Subtotal</small>
                            <p>$${producto.precio * producto.cantidad}</p>
                        </div>
                        <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash"></i></button>
            
            `;
    
            productosCarrito.append(div);
    
        });

    
    } else {
        carritoVacio.classList.remove("disabled");
        productosCarrito.classList.add("disabled");
        interaccionesCarrito.classList.add("disabled");
        compraRealizada.classList.add("disabled");
    }
    actualizarbotonEliminar();
    actualizarTotal();
}
cargarProductosCarrito()

function actualizarbotonEliminar() {
    botonEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito)
    });
}

/* Boton que elimina individualmente los productos del carrito, tambien eliminando individualmente desde localstorage*/
function eliminarDelCarrito(e){
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);

    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

}

/* Boton que vacía el carrito y retira el contenido desde localstorage */
botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito(){
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    cargarProductosCarrito();

}


/* Funcion utilizada para sumar o restar e ir actualizando el "total" que se muestra en el carrito */
function actualizarTotal(){
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc +(producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
}


/* Boton "comprar" que lanza el mensaje final luego de realizar la compra */
botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito(){
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    cargarProductosCarrito();

    carritoVacio.classList.add("disabled");
    productosCarrito.classList.add("disabled");
    interaccionesCarrito.classList.add("disabled");
    compraRealizada.classList.remove("disabled");

}