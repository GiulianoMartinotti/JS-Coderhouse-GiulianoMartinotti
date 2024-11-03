let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

/* Constantes necesarias para utilizar el carrito */
const carritoVacio = document.querySelector("#carrito-vacio");
const productosCarrito = document.querySelector("#productos-carrito");
const interaccionesCarrito = document.querySelector("#interacciones-carrito");
const compraRealizada = document.querySelector("#compra-realizada");
let botonEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#vaciar");
const botonComprar = document.querySelector(".carrito-comprar")
const actualizarCarrito = document.querySelector("#total");
const formularioFinal = document.querySelector(".formularioFinal");
const botonFinalizarCompra = document.querySelector(".boton-finalizar-compra");


/* Funcion que se encarga de cargar los productos al carrito */
function cargarProductosCarrito() {
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
function eliminarDelCarrito(e) {
    Swal.fire({
        title: "¿Está seguro que desea eliminar este producto del carrito?",
        icon: "warning",
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: `Eliminar`,
        confirmButtonColor: "#A90000",
        cancelButtonText: `Conservar producto`,
    }).then((result) => {
        if (result.isConfirmed) {
            productosEnCarrito.splice(index, 1);
            cargarProductosCarrito();
        
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
        }
    });

    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
}

/* Boton que vacía el carrito y retira el contenido desde localstorage */
botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {
    Swal.fire({
        title: "¿Está seguro que desea vaciar el carrito?",
        icon: "question",
        html: `Se van a borrar ${productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)} productos.`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: `Confirmar`,
        confirmButtonColor: "#A90000",
        cancelButtonText: `Conservar el carrito`,
    }).then((result) => {
        if (result.isConfirmed) {
            productosEnCarrito.length = 0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
            cargarProductosCarrito();
        }
    });
}



    /* Funcion utilizada para sumar o restar e ir actualizando el "total" que se muestra en el carrito */
    function actualizarTotal() {
        const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
        total.innerText = `$${totalCalculado}`;
    }


    /* Boton "comprar" que lanza el mensaje final luego de realizar la compra */
    botonComprar.addEventListener("click", comprarCarrito);
    function comprarCarrito() {
        productosEnCarrito.length = 0;
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
        cargarProductosCarrito();

        carritoVacio.classList.add("disabled");
        productosCarrito.classList.add("disabled");
        interaccionesCarrito.classList.add("disabled");
        compraRealizada.classList.add("disabled");
        formularioFinal.classList.remove("disabled");
    }

    /* Boton que finaliza la compra luego de cargar los datos de la tarjeta */
    botonFinalizarCompra.addEventListener("click", finalizarCompra);
    function finalizarCompra() {
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "¡Su compra se ha realizado con éxito!",
            showConfirmButton: false,
            timer: 2000,
            fontWeigth: "100"
        });
        productosEnCarrito.length = 0;
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
        cargarProductosCarrito();

        carritoVacio.classList.add("disabled");
        productosCarrito.classList.add("disabled");
        interaccionesCarrito.classList.add("disabled");
        compraRealizada.classList.remove("disabled");
        formularioFinal.classList.add("disabled");
    }

