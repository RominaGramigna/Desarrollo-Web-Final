document.getElementById("btn-login").addEventListener("click", iniciarSesion);
document.getElementById("btn-signup").addEventListener("click", Register);
window.addEventListener("resize", anchoPagina);

//Declaración de variables
var contenedor_login_signup = document.querySelector(".contenedor-login-signup");
var Formulario_login = document.querySelector(".login");
var Formulario_signup = document.querySelector(".signup");
var Caja_trasera_login = document.querySelector(".caja-trasera-login");
var Caja_trasera_register = document.querySelector(".caja-trasera-register");

//Variables de registro
// Agrega un listener al formulario de registro
document.getElementById("signup").addEventListener("submit", function (event) {
    event.preventDefault(); // Evita el envío predeterminado del formulario

    // Obtener los valores de los campos de entrada
    var Nombre = document.getElementById("Nombre-registro").value;
    var Usuario = document.getElementById("Usuario-registro").value;
    var Contraseña = document.getElementById("Contraseña-registro").value;
    var repetirContraseña = document.getElementById("Repetir-contraseña-registro").value;

    // Verifica si las contraseñas coinciden
    if (password !== repeatPassword) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    // Realizar las comprobaciones de registro de usuario
    // ...

    // Si el registro es exitoso, muestra un mensaje de éxito y limpia los campos
    alert("Registro exitoso. Ahora puedes iniciar sesión.");
    document.getElementById("signup").reset();
});

// Agregar el resto del código JavaScript existente
// ...

// Agrega un listener al formulario de inicio de sesión
document.getElementById("login").addEventListener("submit", function (event) {
    event.preventDefault(); // Evita el envío predeterminado del formulario

    // Obtener los valores de los campos de entrada
    var username = document.getElementById("Usuario-login").value;
    var password = document.getElementById("Contraseña-login").value;

    // Realizar las comprobaciones de inicio de sesión
    // ...

    // Si el inicio de sesión es exitoso, redirige al usuario a index.html
    window.location.href = "../index.html";
});

// Agregar el resto del código JavaScript existente
// ...

function anchoPagina() {
    if (window.innerWidth > 800) {
        Caja_trasera_login.style.display = "block";
        Caja_trasera_register.style.display  = "block";
    } else {
        Caja_trasera_register.style.display  = "block";
        Caja_trasera_register.style.opacity  = "1";
        Caja_trasera_login.style.display = "none";
        Formulario_login.style.display = "block";
        Formulario_signup.style.display  = "none";
        contenedor_login_signup.style.left = "0px";
    }
}

anchoPagina();

function iniciarSesion() {
    if (window.innerWidth > 800) {
        Formulario_signup.style.display = "none";
        contenedor_login_signup.style.left = "10px";
        Formulario_login.style.display = "block";
        Caja_trasera_register.style.opacity = "1";
        Caja_trasera_login.style.opacity = "0";
    }
    else {
        Formulario_signup.style.display = "none";
        contenedor_login_signup.style.left = "0px";
        Formulario_login.style.display = "block";
        Caja_trasera_register.style.display = "block";
        Caja_trasera_login.style.display = "none";
    }
}

function Register() {
    if (window.innerWidth > 800){
        Formulario_signup.style.display = "block";
        contenedor_login_signup.style.left = "410px";
        Formulario_login.style.display = "none";
        Caja_trasera_register.style.opacity = "0";
        Caja_trasera_login.style.opacity = "1";
    } else {
        Formulario_signup.style.display = "block";
        contenedor_login_signup.style.left = "0px";
        Formulario_login.style.display = "none";
        Caja_trasera_register.style.display = "none";
        Caja_trasera_login.style.display = "block";
    }
}