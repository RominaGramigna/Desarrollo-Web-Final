fetch("http://localhost:3000/api/obtener-productos")
    .then(response => response.json())
    .then(data => {
        console.log("Datos recibidos de la API (tipo):", typeof data);
        productos = data;
        cargarProductos(productos);

        botonesSide.forEach(boton => {
                boton.addEventListener("click", (e) => {

                botonesSide.forEach(boton => boton.classList.remove("active"));
                e.currentTarget.classList.add("active");
                
                const tituloSide = e.currentTarget.getAttribute("data-titulo");
                tituloPrincipal.innerText = tituloSide;

                if(e.currentTarget.id == "productos") {
                    contenedorProductos.classList.remove('disabled');
                    seccionCargar.classList.add('disabled');
                    cargarProductos(productos);
                } else if (e.currentTarget.id == "cargar") {
                    contenedorProductos.classList.add('disabled');
                    seccionCargar.classList.remove('disabled');
                    seccionCargar.innerHTML = `
                    <div class="modal-contenido">
                    <h2>Productos</h2>
                    <form id="formulario-producto">
                        <div class="form-field">
                        <label for="ID_Articulo">ID Artículo:</label>
                        <input type="number" id="ID_Articulo">
                        </div>

                        <div class="form-field">
                        <label for="Articulo">Artículo:</label>
                        <input type="text" id="Articulo">
                        </div>

                        <div class="form-field">
                        <label for="categorias-modal">Categoría:</label>
                        <select id="categorias-modal">
                            <!-- Agrega más opciones de categorías según sea necesario -->
                        </select>
                        </div>

                        <div class="form-field">
                        <label for="marcas-modal">Marca:</label>
                        <select id="marcas-modal">
                            <!-- Agrega más opciones de categorías según sea necesario -->
                        </select>
                        </div>
                    
                        <div class="form-field">
                        <label for="precio">Precio:</label>
                        <input type="number" id="precio" min="0" step="0.01">
                        </div>
                        
                        <div class="form-field">
                        <label for="cantidad">Cantidad:</label>
                        <input type="number" id="cantidad" min="1">
                        </div>
                        
                        <div class="form-field">
                        <label for="Estado">Estado:</label>
                        <input type="checkbox" id="Estado">
                        </div>
                        
                        <div class="form-field">
                        <label for="imagen">Imagen:</label>
                        <input type="file" id="imagen">
                        </div>
                    
                        <div class='form-btn'>
                        <button onclick='registrarDatos()'>Guardar</button>
                        <button onclick='actualizarDatos()'>Actualizar</button>
                        <button onclick='eliminarProducto(document.getElementById("ID_Articulo").value)'>Eliminar</button>
                        </div>
                    </form>
                    </div>

                    <div class="modal-contenido">
                    <h2>Marcas - Categorias</h2>
                    <form id="formulario-producto">
                        <div class="form-field">
                        <label for="Marca">Marca:</label>
                        <input type="text" id="Marca">
                        </div>
                    
                        <div class="form-field">
                        <label for="Categoria">Categoría:</label>
                        <input type="text" id="Categoria">
                        </div>
                    
                        <div class='form-btn'>
                        <button onclick='registrarMarcas()'>Guardar</button>
                        </div>
                    </form>
                    </div>

                    <div class="modal-contenido">
                    <h2>Clientes</h2>
                    <form id="formulario-producto">
                        <div class="form-field">
                        <label for="ID_Cliente">ID Cliente:</label>
                        <input type="number" id="ID_Cliente">
                        </div>

                        <div class="form-field">
                        <label for="cliente">Razón Social:</label>
                        <input type="text" id="cliente">
                        </div>
                    
                        <div class="form-field">
                        <label for="domicilio">Domicilio:</label>
                        <input type="text" id="domicilio">
                        </div>
                        
                        <div class="form-field">
                        <label for="localidad">Localidad:</label>
                        <input type="text" id="localidad">
                        </div>
                        
                        <div class="form-field">
                        <label for="ID_Usuario_Cliente">ID Usuario:</label>
                        <input type="text" id="ID_Usuario_Cliente">
                        </div>
                        
                        <div class="form-field">
                        <label for="estado-cliente">Estado:</label>
                        <input type="checkbox" id="estado-cliente">
                        </div>
                    
                        <div class='form-btn'>
                        <button onclick='registrarClientes()'>Guardar</button>
                        <button onclick='actualizarClientes()'>Actualizar</button>
                        <button onclick='eliminarClientes(document.getElementById("ID_Cliente").value)'>Eliminar</button>
                        </div>
                    </form>
                    </div>

                    <div class="modal-contenido">
                    <h2>Usuarios</h2>
                    <form id="formulario-producto">
                        <div class="form-field">
                        <label for="ID_Usuario">ID Usuario:</label>
                        <input type="number" id="ID_Usuario">
                        </div>

                        <div class="form-field">
                        <label for="usuario">Usuario:</label>
                        <input type="text" id="usuario">
                        </div>
                    
                        <div class="form-field">
                        <label for="clave">Clave:</label>
                        <input type="text" id="clave">
                        </div>
                        
                        <div class="form-field">
                        <label for="email">Email:</label>
                        <input type="text" id="email">
                        </div>

                        <div class="form-field">
                        <label for="telefono">Teléfono:</label>
                        <input type="text" id="telefono">
                        </div>

                        <div class='form-btn'>
                        <button onclick='registrarUsuarios()'>Guardar</button>
                        <button onclick='actualizarUsuarios()'>Actualizar</button>
                        <button onclick='eliminarUsuarios(document.getElementById("ID_Usuario").value)'>Eliminar</button>
                        </div>
                    </form>
                    </div>
                    `;
                    cargarCategorias();

                } else if (e.currentTarget.id == "reseñas") {
                    contenedorProductos.classList.add('disabled');
                    seccionCargar.classList.add('disabled');
                } else if (e.currentTarget.id == "nosotros") {
                    contenedorProductos.classList.add('disabled');
                    seccionCargar.classList.add('disabled');
            }})

            const productosEnCarritoLS = JSON.parse(localStorage.getItem( "productos-en-carrito" )) || [];
            if (productosEnCarritoLS) {
                productosEnCarrito = productosEnCarritoLS
                actualizarNumerito();
            } else {
                productosEnCarrito = [];
            }

            botonesAgregar = document.querySelectorAll(".producto-agregar");

            botonesAgregar.forEach(boton => {
                boton.addEventListener("click", agregarAlCarrito) 
            })
    });
});

//----------------------------------------------------------- boton - menu de usuario -----------------------------------------------------------------------------------
let usuario = 1; // o false
const botonUsuario = document.getElementById("boton-usuario");
const menuUsuario = document.querySelector( ".menu-usuario" );

botonUsuario.addEventListener("click", (event) => {
    event.stopPropagation(); 
    menuUsuario.classList.toggle("mostrar");
});

// Event listener para clics en cualquier parte del documento
document.addEventListener("click", () => {
    menuUsuario.classList.remove("mostrar");
});

function mostrarOpcionesUsuario(usuario, callback) {
    const iniciarSesion = document.getElementById('iniciar-sesion');
    const miCuenta = document.getElementById('mi-cuenta');
    const misPedidos = document.getElementById('mis-pedidos');
    const cerrarSesion = document.getElementById('cerrar-sesion');

    if (usuario) {
        iniciarSesion.style.display = 'none';
        miCuenta.style.display = 'block';
        misPedidos.style.display = 'block';
        cerrarSesion.style.display = 'block';
    } else {
        iniciarSesion.style.display = 'block';
        miCuenta.style.display = 'none';
        misPedidos.style.display = 'none';
        cerrarSesion.style.display = 'none';
    }

    if (callback) {
        callback();
    }
}

const enlaceCerrarSesion = document.getElementById('enlace-cerrar-sesion');

enlaceCerrarSesion.addEventListener('click', (event) => {
    event.preventDefault(); // Evitar que el enlace realice su acción por defecto

    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Se va a cerrar tu sesion.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, cerrar sesión',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Actualiza el estado de usuario
            usuario = false;

            // Actualiza el menú desplegable con el nuevo estado de usuario
            mostrarOpcionesUsuario(usuario, () => {
            });
        }
    });
});

/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*----------------------------------------------------------------- INDEX ------------------------------------------------------------------------------*/
const contenedorProductos = document.querySelector("#contenedor-productos");
const seccionCargar = document.getElementById('modal-agregar-producto');
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector('#numerito')

const tituloPrincipal = document.querySelector("#titulo-principal");
const tituloProductos = document.getElementById("productos");
const tituloCargar = document.getElementById("cargar");
const tituloResenas = document.getElementById("reseñas");
const tituloNosotros = document.getElementById("nosotros");
const filtroCategorias = document.querySelector(".filtro-categorias");

let productosEnCarrito;

function cargarProductos(productos) {
    console.log("productos obtenidos: ", productos);
    contenedorProductos.innerHTML = "";

    productos.forEach(producto => {
        const imagen = "../img/productos/" + producto.Imagen;
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <div class="producto">
            <img class="producto-imagen" src="${imagen}" alt="${producto.Articulo}">
                <div class="producto-detalles">
                    <h3 class="producto-titulo">${producto.Articulo}</h3>
                    <p class="producto-precio">$${producto.Precio}</p>
                    <button class="producto-agregar" id="${producto.ID_Articulo}">Agregar</button>
                </div>
            </div>
        `;
        contenedorProductos.appendChild(div);
    })

    actualizarBotonesAgregar();
    console.log(botonesAgregar);
};

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito) 
    })
}

function agregarAlCarrito(e) {

    Toastify({
        text: "Producto Agregado!",
        duration: 1000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function(){} // Callback after click
      }).showToast();

    const idBoton = e.currentTarget.id;
    console.log("ID del botón:", idBoton);
    const productoAgregado = productos.find(producto => producto.ID_Articulo == idBoton);
    console.log(productoAgregado);
    
    if(productosEnCarrito.some(producto => producto.ID_Articulo == idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.ID_Articulo == idBoton);
        productosEnCarrito[index].Cantidad ++;
    } else {
        productoAgregado.Cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }
    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let numCarrito = productosEnCarrito.reduce((acc, producto) => acc + producto.Cantidad, 0); 
    numerito.innerText = numCarrito;
}

/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/*----------------------------------------------------------------------- FILTRO POR CATEGORÍAS --------------------------------------------------------------------------------*/
function cargarCategorias() {
    fetch('http://localhost:3000/api/obtener-categorias')
    .then(response => response.json())
    .then(data => {
        const categoriasModal = document.getElementById('categorias-modal');
        data.forEach(categoria => {
            const opcionCategoria = document.createElement('option');
            opcionCategoria.value = categoria.ID_Categoria;
            opcionCategoria.textContent = categoria.Descripcion;
            categoriasModal.appendChild(opcionCategoria);
        })
    })

    fetch('http://localhost:3000/api/obtener-marcas')
    .then(response => response.json())
    .then(data => {
        const marcasModal = document.getElementById('marcas-modal');
        data.forEach(marca => {
            const opcionMarca = document.createElement('option');
            opcionMarca.value = marca.ID_Marca;
            opcionMarca.textContent = marca.Descripcion;
            marcasModal.appendChild(opcionMarca);
        })
    })
}

fetch("http://localhost:3000/api/obtener-categorias")
.then(response => response.json())
.then(data => {
    const selectCategorias = document.getElementById('categorias');

    selectCategorias.innerHTML = '';

    // Agregar la opción 'Todos'
    const opcionTodos = document.createElement('option');
    opcionTodos.value = 'todos';
    opcionTodos.textContent = 'Todos';
    selectCategorias.appendChild(opcionTodos);

    // Agregar las opciones de categorías
    data.forEach(categoria => {
        const opcionCategoria = document.createElement('option');
        opcionCategoria.value = categoria.ID_Categoria;
        opcionCategoria.textContent = categoria.Descripcion;
        selectCategorias.appendChild(opcionCategoria);
    });

    document.getElementById('categorias').addEventListener('change', function() {
        const categoriaSeleccionada = this.value; 
        
        const productosFiltrados = productos.filter(producto => {
            if (categoriaSeleccionada == 'todos') {
                return true;
            }
            return producto.ID_Categoria == categoriaSeleccionada;
        });
    
        cargarProductos(productosFiltrados);
    });

})

tituloProductos.addEventListener('click', () => {
    filtroCategorias.style.display = 'block';
});

tituloCargar.addEventListener('click', () => {
    filtroCategorias.style.display = 'none';
});

tituloResenas.addEventListener('click', () => {
    filtroCategorias.style.display = 'none';
});

tituloNosotros.addEventListener('click', () => {
    filtroCategorias.style.display = 'none';
});
/* ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */

/************************** FUNCIONES *******************************/
/******* PRODUCTOS **********/
async function registrarDatos() {

    const id_articulo = document.getElementById('ID_Articulo').value
    const articulo = document.getElementById('Articulo').value
    const categoria = document.getElementById('categorias-modal').value
    const marca = document.getElementById('marcas-modal').value
    const precio = document.getElementById('precio').value
    const estadoCheck = document.getElementById('Estado').value
    const estado = estadoCheck.checked ? 1 : 0;
    const imagen = document.getElementById('imagen').value;
    const cantidad = document.getElementById('cantidad').value

    const nombreImagen = imagen.split('\\').pop();

    if (!id_articulo || !articulo || !categoria || !marca || !precio || cantidad === '' || estadoCheck === '') {
        alert('Todos los campos son obligatorios.');
        return;
    }

    const producto = {
        ID_Articulo: id_articulo,
        Articulo: articulo,
        ID_Categoria: categoria,
        ID_Marca: marca,
        Cantidad: cantidad,
        Estado: estado,
        Precio: precio,
        Imagen: nombreImagen
    }

    console.log(producto)

    try {
        const response = await fetch('http://localhost:3000/api/registrar-producto', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(producto),
        });
    
        // Verifica la respuesta del servidor
        if (response.ok) {
          const data = await response.json();
          console.log('Datos guardados correctamente:', data);
          alert('Datos guardados correctamente');
        } else {
          throw new Error('Error al guardar los datos');
        }
      } catch (error) {
        console.error('Error al guardar datos:', error);
      }
}

async function actualizarDatos() {
    const id_articulo = document.getElementById('ID_Articulo').value
    const articulo = document.getElementById('Articulo').value
    const categoria = document.getElementById('categorias-modal').value
    const marca = document.getElementById('marcas-modal').value
    const precio = document.getElementById('precio').value
    const estadoCheck = document.getElementById('Estado')
    const estado = estadoCheck.checked ? 1 : 0;
    const imagen = document.getElementById('imagen').value;
    const cantidad = document.getElementById('cantidad').value

    const nombreImagen = imagen.split('\\').pop();

    if (!id_articulo || !articulo || !categoria || !marca || !precio || cantidad === '' || estadoCheck === '') {
        alert('Todos los campos son obligatorios.');
        return;
    }

    const producto = {
        ID_Articulo: id_articulo,
        Articulo: articulo,
        ID_Categoria: categoria,
        ID_Marca: marca,
        Cantidad: cantidad,
        Estado: estado,
        Precio: precio,
        Imagen: nombreImagen
    }

    console.log(producto)

    try {
        const response = await fetch('http://localhost:3000/api/actualizar-producto', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(producto),
        });
    
        // Verifica la respuesta del servidor
        if (response.ok) {
          const data = await response.json();
          console.log('Datos guardados correctamente:', data);
          alert('Datos guardados correctamente');
        } else {
          throw new Error('Error al guardar los datos');
        }
      } catch (error) {
        console.error('Error al guardar datos:', error);
        alert('Hubo un error al guardar los datos');
      }
}

async function eliminarProducto(ID_Articulo) {
    console.log('ID Producto a eliminar:', ID_Articulo);
    if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
        try {
            const response = await fetch(`http://localhost:3000/api/eliminar-productos/${ID_Articulo}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                const data = await response.json();
                console.log('Producto eliminado:', data);
                alert('Producto eliminado correctamente');
                // Aquí puedes agregar lógica adicional para actualizar la interfaz
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.error}`);
            }
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
        }
    }
}

/********** MARCAS - CATEGORIAS *************/
async function registrarMarcas() {
    const marca = document.getElementById('Marca').value
    const categoria = document.getElementById('Categoria').value

    if (marca) {    
    if (!marca) {
        alert('Todos los campos son obligatorios.');
        return;
    }

    const marcaObjeto = {Descripcion: marca}
    console.log(marcaObjeto)
    try {
        const response = await fetch('http://localhost:3000/api/registrar-marcas', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(marcaObjeto),
        });
    
        // Verifica la respuesta del servidor
        if (response.ok) {
          const data = await response.json();
          console.log('Datos guardados correctamente:', data);
          alert('Datos guardados correctamente');
        } else {
          throw new Error('Error al guardar los datos');
        }
      } catch (error) {
        console.error('Error al guardar datos:', error);
      }

} else if (categoria) {
    if(!categoria) {
        alert('Todos los campos son obligatorios.');
        return;
    }
    const categoriaObjeto = {Descripcion: categoria}
      try {
        const response = await fetch('http://localhost:3000/api/registrar-categorias', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(categoriaObjeto),
        });
    
        // Verifica la respuesta del servidor
        if (response.ok) {
          const data = await response.json();
          console.log('Datos guardados correctamente:', data);
          alert('Datos guardados correctamente');
        } else {
          throw new Error('Error al guardar los datos');
        }
      } catch (error) {
        console.error('Error al guardar datos:', error);
      }
} else if (marca && categoria) {
    const marcaObjeto = {Descripcion: marca}
    console.log(marcaObjeto)
    try {
        const response = await fetch('http://localhost:3000/api/registrar-marcas', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(marcaObjeto),
        });
    
        // Verifica la respuesta del servidor
        if (response.ok) {
          const data = await response.json();
          console.log('Datos guardados correctamente:', data);
          alert('Datos guardados correctamente');
        } else {
          throw new Error('Error al guardar los datos');
        }
      } catch (error) {
        console.error('Error al guardar datos:', error);
      }

      const categoriaObjeto = {Descripcion: categoria}
      try {
        const response = await fetch('http://localhost:3000/api/registrar-categorias', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(categoriaObjeto),
        });
    
        // Verifica la respuesta del servidor
        if (response.ok) {
          const data = await response.json();
          console.log('Datos guardados correctamente:', data);
          alert('Datos guardados correctamente');
        } else {
          throw new Error('Error al guardar los datos');
        }
      } catch (error) {
        console.error('Error al guardar datos:', error);
      }

}
}

/******* CLIENTES ***********/
async function registrarClientes() {
    const ID_Cliente = document.getElementById('ID_Cliente').value
    const cliente = document.getElementById('cliente').value
    const domicilio = document.getElementById('domicilio').value
    const localidad = document.getElementById('localidad').value
    const estadoCliente = document.getElementById('estado-cliente')
    const estado = estadoCliente.checked ? 1 : 0;
    const usuario = document.getElementById('ID_Usuario_Cliente').value
   

    if (!ID_Cliente || !cliente || estadoCliente === '') {
        alert('Todos los campos son obligatorios.');
        return;
    }

    const clienteObjeto = {
        ID_Cliente: ID_Cliente,
        Cliente: cliente,
        Domicilio: domicilio,
        Localidad: localidad,
        Estado: estado,
        ID_Usuario: usuario
    }

    console.log(clienteObjeto)

    try {
        const response = await fetch('http://localhost:3000/api/registrar-clientes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(clienteObjeto),
        });
    
        // Verifica la respuesta del servidor
        if (response.ok) {
          const data = await response.json();
          console.log('Datos guardados correctamente:', data);
          alert('Datos guardados correctamente');
        } else {
          throw new Error('Error al guardar los datos');
        }
      } catch (error) {
        console.error('Error al guardar datos:', error);
        alert('Hubo un error al guardar los datos');
      }
}

async function actualizarClientes() {
    const ID_Cliente = document.getElementById('ID_Cliente').value
    const cliente = document.getElementById('cliente').value
    const domicilio = document.getElementById('domicilio').value
    const localidad = document.getElementById('localidad').value
    const estadoCliente = document.getElementById('estado-cliente')
    const estado = estadoCliente.checked ? 1 : 0;
    const usuario = document.getElementById('ID_Usuario_Cliente').value
   

    if (!ID_Cliente || !cliente || estadoCliente === '') {
        alert('Todos los campos son obligatorios.');
        return;
    }

    const clienteObjeto = {
        ID_Cliente: ID_Cliente,
        Cliente: cliente,
        Domicilio: domicilio,
        Localidad: localidad,
        Estado: estado,
        ID_Usuario: usuario
    }

    console.log(clienteObjeto)

    try {
        const response = await fetch('http://localhost:3000/api/actualizar-clientes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(clienteObjeto),
        });
    
        // Verifica la respuesta del servidor
        if (response.ok) {
          const data = await response.json();
          console.log('Datos guardados correctamente:', data);
          alert('Datos guardados correctamente');
        } else {
          throw new Error('Error al guardar los datos');
        }
      } catch (error) {
        console.error('Error al guardar datos:', error);
        alert('Hubo un error al guardar los datos');
      }
}

async function eliminarClientes(ID_Cliente) {
    console.log('ID Cliente a eliminar:', ID_Cliente);
    if (confirm("¿Estás seguro de que deseas eliminar este cliente?")) {
        try {
            const response = await fetch(`http://localhost:3000/api/eliminar-clientes/${ID_Cliente}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                const data = await response.json();
                console.log('Cliente eliminado:', data);
                alert('Cliente eliminado correctamente');
                // Aquí puedes agregar lógica adicional para actualizar la interfaz
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.error}`);
            }
        } catch (error) {
            console.error('Error al eliminar el cliente:', error);
        }
    }
}

/******* USUARIOS ***********/
async function registrarUsuarios() {
    const ID_Usuario = document.getElementById('ID_Usuario').value
    const usuarioU = document.getElementById('usuario').value
    const clave = document.getElementById('clave').value
    const email = document.getElementById('email').value
    const telefono = document.getElementById('telefono').value
   

    if (!ID_Usuario || !usuario || clave === '') {
        alert('Todos los campos son obligatorios.');
        return;
    }

    const usuarioObjeto = {
        ID_Usuario: ID_Usuario,
        Usuario: usuarioU,
        Clave: clave,
        Email: email,
        Telefono: telefono
    }

    console.log(usuarioObjeto)

    try {
        const response = await fetch('http://localhost:3000/api/registrar-usuarios', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(usuarioObjeto),
        });
    
        // Verifica la respuesta del servidor
        if (response.ok) {
          const data = await response.json();
          console.log('Datos guardados correctamente:', data);
          alert('Datos guardados correctamente');
        } else {
          throw new Error('Error al guardar los datos');
        }
      } catch (error) {
        console.error('Error al guardar datos:', error);
        alert('Hubo un error al guardar los datos');
      }
}

async function actualizarUsuarios() {
    const ID_Usuario = document.getElementById('ID_Usuario').value
    const usuarioU = document.getElementById('usuario').value
    const clave = document.getElementById('clave').value
    const email = document.getElementById('email').value
    const telefono = document.getElementById('telefono').value
   

    if (!ID_Usuario || !usuario || !clave) {
        alert('Todos los campos son obligatorios.');
        return;
    }

    const usuarioObjeto = {
        ID_Usuario: ID_Usuario,
        Usuario: usuarioU,
        Clave: clave,
        Email: email,
        Telefono: telefono
    }

    console.log(usuarioObjeto)

    try {
        const response = await fetch('http://localhost:3000/api/actualizar-usuarios', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(usuarioObjeto),
        });
    
        // Verifica la respuesta del servidor
        if (response.ok) {
          const data = await response.json();
          console.log('Datos guardados correctamente:', data);
          alert('Datos guardados correctamente');
        } else {
          throw new Error('Error al guardar los datos');
        }
      } catch (error) {
        console.error('Error al guardar datos:', error);
        alert('Hubo un error al guardar los datos');
      }
}

async function eliminarUsuarios(ID_Usuario) {
    console.log('ID Usuario a eliminar:', ID_Usuario);
    if (confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
        try {
            const response = await fetch(`http://localhost:3000/api/eliminar-usuarios/${ID_Usuario}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                const data = await response.json();
                console.log('Usuario eliminado:', data);
                alert('Usuario eliminado correctamente');
                // Aquí puedes agregar lógica adicional para actualizar la interfaz
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.error}`);
            }
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
        }
    }
}
/* -------------------------------------------------------------------------------------------------------------- */
mostrarOpcionesUsuario(usuario)