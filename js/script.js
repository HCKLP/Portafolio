document.addEventListener("scroll", function () {
    const header = document.querySelector(".cabecera");
    header.classList.toggle("scrolled", window.scrollY > 50);
});

// Función para cargar contenido HTML en una sección específica
function cargarSeccion(ruta, contenedorId, callback) {
    fetch(ruta)
        .then(response => response.text())
        .then(data => {
            document.getElementById(contenedorId).innerHTML = data;
            if (callback) callback();  // Ejecuta el callback después de cargar el HTML
        })
        .catch(error => console.error(`Error al cargar ${ruta}:`, error));
}

// Cargar cada sección con su archivo HTML correspondiente
document.addEventListener("DOMContentLoaded", () => {
    cargarSeccion('html/presentacion.html', 'presentacion');
    cargarSeccion('html/sobre-mi.html', 'sobre-mi');
    cargarSeccion('html/habilidades.html', 'habilidades');
    cargarSeccion('html/aficiones.html', 'aficiones');
    cargarSeccion('html/formacion.html', 'formacion');
    cargarSeccion('html/proyectos.html', 'proyectos');

    // Cargar contacto.html y luego inicializar la validación del formulario
    cargarSeccion('html/contacto.html', 'contacto', inicializarValidacionFormulario);
});

// Inicializar la validación del formulario después de cargar contacto.html
function inicializarValidacionFormulario() {
    const formulario = document.getElementById("contactoForm");

    if (formulario) {
        formulario.addEventListener("submit", function (event) {
            event.preventDefault();
            if (validarFormulario()) {
                alert("Formulario enviado con éxito.");
                // Aquí puedes agregar el código para enviar el formulario (e.g., con una solicitud HTTP)
            }
        });

        // Validación en tiempo real para habilitar el botón de enviar cuando los campos son válidos
        document.querySelectorAll(".contacto__campo").forEach(campo => {
            campo.addEventListener("input", validarFormulario);
        });
    }
}

// Función de validación del formulario
function validarFormulario() {
    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const asunto = document.getElementById("asunto").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();
    
    const nombreError = document.getElementById("nombreError");
    const emailError = document.getElementById("emailError");
    const asuntoError = document.getElementById("asuntoError");
    const mensajeError = document.getElementById("mensajeError");
    let esValido = true;

    // Función auxiliar para mostrar el error
    const mostrarError = (elemento, mensaje) => {
        elemento.textContent = mensaje;
        elemento.style.color = "red";
    };

    // Validación del campo Nombre
    nombreError.textContent = "";
    if (!nombre) {
        mostrarError(nombreError, "El campo Nombre no debe estar vacío.");
        esValido = false;
    } else if (nombre.length > 50) {
        mostrarError(nombreError, "El campo Nombre debe tener máximo 50 caracteres.");
        esValido = false;
    }

    // Validación del campo Email
    emailError.textContent = "";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        mostrarError(emailError, "El campo Correo Electrónico no debe estar vacío.");
        esValido = false;
    } else if (!emailRegex.test(email)) {
        mostrarError(emailError, "El formato del correo es incorrecto. Ejemplo: texto@texto.com");
        esValido = false;
    }

    // Validación del campo Asunto
    asuntoError.textContent = "";
    if (!asunto) {
        mostrarError(asuntoError, "El campo Asunto no debe estar vacío.");
        esValido = false;
    } else if (asunto.length > 50) {
        mostrarError(asuntoError, "El campo Asunto debe tener máximo 50 caracteres.");
        esValido = false;
    }

    // Validación del campo Mensaje
    mensajeError.textContent = "";
    if (!mensaje) {
        mostrarError(mensajeError, "El campo Mensaje no debe estar vacío.");
        esValido = false;
    } else if (mensaje.length > 300) {
        mostrarError(mensajeError, "El campo Mensaje debe tener máximo 300 caracteres.");
        esValido = false;
    }

    // Habilitar o deshabilitar el botón de enviar según la validez del formulario
    const botonEnviar = document.getElementById("enviarBtn");
    if (botonEnviar) {
        botonEnviar.disabled = !esValido;
    }

    return esValido;
}
