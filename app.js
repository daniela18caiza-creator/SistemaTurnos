
// VARIABLES DEL SISTEMA

let turnos = [];
let numeroTurno = 1;


// VALIDACIÓN DEL NOMBRE

function validarNombre(campo) {

    const error = document.getElementById("errorNombre");

    // Permite letras, tildes, ñ y espacios
    const nombreLimpio = campo.value.replace(
        /[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]/g,
        ""
    );

    if (campo.value !== nombreLimpio) {

        campo.value = nombreLimpio;

        error.textContent =
            "Solo se permiten letras y espacios.";

    } else {

        error.textContent = "";

    }

}


// SOLICITAR TURNO

function solicitarTurno() {

    const campoNombre =
        document.getElementById("nombrePaciente");

    const error =
        document.getElementById("errorNombre");

    const nombre = campoNombre.value.trim();

    // Expresión para validar nombres
    const expresion =
        /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+(?:\s+[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+)*$/;

    // Validar campo vacío
    if (nombre === "") {

        error.textContent =
            "Ingrese el nombre del paciente.";

        campoNombre.focus();

        return;

    }

    // Validar que solo tenga letras
    if (!expresion.test(nombre)) {

        error.textContent =
            "Ingrese un nombre válido, solo con letras.";

        campoNombre.focus();

        return;

    }

    error.textContent = "";

    // Crear paciente
    const paciente = {

        numero: numeroTurno,

        nombre: nombre

    };

    // Agregar paciente a la lista
    turnos.push(paciente);

    // Mostrar confirmación
    document.getElementById("mensajeTurno").innerText =
        "Turno registrado correctamente. " +
        nombre +
        ", su número es: T-" +
        String(numeroTurno).padStart(3, "0");

    // Aumentar número de turno
    numeroTurno++;

    // Limpiar campo
    campoNombre.value = "";

    // Actualizar lista
    actualizarLista();

}


// LLAMAR SIGUIENTE PACIENTE

function llamarSiguiente() {

    if (turnos.length === 0) {

        alert("No hay pacientes pendientes.");

        return;

    }

    // Obtener primer paciente de la lista
    const paciente = turnos.shift();

    // Mostrar turno actual
    document.getElementById("turnoActual").innerText =
        "T-" + String(paciente.numero).padStart(3, "0");

    // Mostrar nombre del paciente
    document.getElementById("pacienteActual").innerText =
        paciente.nombre;

    // Actualizar lista
    actualizarLista();

}


// ACTUALIZAR LISTA DE PACIENTES

function actualizarLista() {

    const lista =
        document.getElementById("listaPacientes");

    const contador =
        document.getElementById("cantidadPendientes");

    // Mostrar cantidad de pacientes pendientes
    contador.innerText = turnos.length;

    // Limpiar lista anterior
    lista.innerHTML = "";

    // Comprobar si no hay pacientes
    if (turnos.length === 0) {

        lista.innerHTML =
            '<p class="vacio">No hay pacientes pendientes.</p>';

        return;

    }

    // Recorrer los pacientes
    turnos.forEach(function(paciente) {

        const elemento = document.createElement("div");

        elemento.className = "paciente";


        // Datos del paciente
        const datos = document.createElement("div");

        datos.className = "datos-paciente";


        // Inicial del nombre
        const avatar = document.createElement("div");

        avatar.className = "avatar";

        avatar.textContent =
            paciente.nombre.charAt(0).toUpperCase();


        // Información
        const informacion = document.createElement("div");


        // Nombre
        const nombre = document.createElement("div");

        nombre.className = "nombre";

        nombre.textContent = paciente.nombre;


        // Estado
        const estado = document.createElement("div");

        estado.className = "estado";

        estado.textContent = "En espera";


        // Agregar información
        informacion.appendChild(nombre);

        informacion.appendChild(estado);


        // Agregar avatar e información
        datos.appendChild(avatar);

        datos.appendChild(informacion);


        // Número de turno
        const numero = document.createElement("span");

        numero.className = "numero-lista";

        numero.textContent =
            "T-" + String(paciente.numero).padStart(3, "0");


        // Construir elemento
        elemento.appendChild(datos);

        elemento.appendChild(numero);


        // Agregar paciente a la lista
        lista.appendChild(elemento);

    });

}

