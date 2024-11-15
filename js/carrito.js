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

/* funciones que eliminan por completo los productos del carrito, tambien eliminando individualmente desde localstorage*/
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
            formularioFinal.classList.add("disabled");
        }
    });

}


/* Funcion utilizada para sumar o restar e ir actualizando el "total" que se muestra en el carrito */
function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
}



botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {
    cargarProductosCarrito();
    interaccionesCarrito.classList.remove("disabled");
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


const validacionDeDatosFinales = () => {
    const nombre = document.querySelector("#nombre");
    const apellido = document.querySelector("#apellido");
    const email = document.querySelector("#email");
    const domicilio = document.querySelector("#domicilio");

    if (!nombre.value) return alertaDatosIngresados('Debe ingresar su nombre.') && false;

    if (!apellido.value) return alertaDatosIngresados('Debe ingresar su apellido.') && false;

    if (!email.value) return alertaDatosIngresados('Debe ingresar su e-mail.') && false;

    if (!domicilio.value) return alertaDatosIngresados('Debe ingresar su domicilio.') && false;

    return true;
}

const alertaDatosIngresados = () => {
    Swal.fire({
        text: "Debe completar los datos",
        confirmButtonColor: 'red'
    });
};

botonFinalizarCompra.addEventListener("click", (e) => {
    e.preventDefault();
    if (validacionDeDatosFinales()) {
        finalizarCompra();
    } else{
        carritoVacio.classList.add("disabled");
        productosCarrito.classList.remove("disabled");
        interaccionesCarrito.classList.add("disabled");
        compraRealizada.classList.add("disabled");
        formularioFinal.classList.remove("disabled");
    }
})


/*botonSumar.addEventListener("click", sumarCantidad);
function sumarCantidad(e) {
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
botonSumar.addEventListener("click", sumarCantidad);
*/
