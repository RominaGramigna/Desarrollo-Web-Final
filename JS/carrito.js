let productosEnCarrito = localStorage.getItem( "productos-en-carrito" );
productosEnCarrito = JSON.parse(productosEnCarrito);

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const botonComprar = document.querySelector("#carrito-acciones-comprar");
const contenedorTotal = document.querySelector("#total");

function cargarProductosCarrito(){
if (productosEnCarrito && productosEnCarrito.length > 0) {

    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.remove("disabled");
    contenedorCarritoAcciones.classList.remove("disabled");
    contenedorCarritoComprado.classList.add("disabled");

    contenedorCarritoProductos.innerHTML = "";

    productosEnCarrito.forEach(producto => {
        const imagen = '../img/productos/' + producto.Imagen;
        const div = document.createElement('div');
        div.classList.add("carrito-producto");
        div.innerHTML = `
        <img class="carrito-producto-imagen" src="${imagen}" alt="${producto.Articulo}">
        <div class="carrito-producto-titulo">
            <small>Título</small>
            <h3>${producto.Articulo}</h3>
        </div>
        <div class="carrito-producto-cantidad">
            <small>Cantidad</small>
            <input id="cantidad" class="cantidad" type="number" value="${producto.Cantidad}" min="1" step="1">
        </div>
        <div class="carrito-producto-precio">
            <small>Precio</small>
            <p>$${producto.Precio}</p>
        </div>
        <div class="carrito-producto-subtotal">
            <small>Subtotal</small>
            <p>$${producto.Precio * producto.Cantidad}</p>
        </div>
            <button class="carrito-producto-eliminar" id="${producto.ID_Articulo}" ><i class="bi bi-trash3-fill"></i></button>    
        `;

        contenedorCarritoProductos.append(div);

        const inputCantidad = div.querySelector('.cantidad');
            inputCantidad.addEventListener('input', function() {
                const nuevaCantidad = parseInt(this.value);
                
                // Actualizar la cantidad en el objeto del producto
                producto.Cantidad = nuevaCantidad;

                // Actualizar el subtotal del producto
                const subtotalProducto = nuevaCantidad * producto.Precio;
                const subtotalElemento = div.querySelector('.carrito-producto-subtotal p');
                subtotalElemento.innerText = `$${subtotalProducto}`;

                localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

                // Actualizar el total
                actualizarTotal();
            });
    })
    
} else {
    contenedorCarritoVacio.classList.remove("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.add("disabled");
}

actualizarBotonesEliminar();
actualizarTotal();
}

cargarProductosCarrito();

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito) 
    })
}

function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.ID_Articulo === idBoton);
    
    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

botonVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito() {

    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Eliminarás todos tus productos',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, vaciar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            productosEnCarrito.length = 0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
            cargarProductosCarrito();
        }
    });
}

function actualizarTotal() {
    /*const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    contenedorTotal.innerText = `: $${totalCalculado}`;*/

    // Recalcular el total sumando los subtotales de todos los productos en el carrito
    let total = 0;
    productosEnCarrito.forEach(producto => {
        total += producto.Precio * producto.Cantidad;
    });

    // Actualizar el elemento HTML del total
    const contenedorTotal = document.querySelector("#total");
    contenedorTotal.textContent = `: $${total}`;
}

botonComprar.addEventListener("click", comprarCarrito);

function comprarCarrito() {
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");

    const textoMostrar = document.querySelector("#carrito-comprado");
    const fechaActual = new Date();
    const fechaLocal = fechaActual.toLocaleString();

    textoMostrar.innerHTML = `¡Gracias por tu compra! El ${fechaLocal} <i class="bi bi-emoji-laughing"></i>`
}