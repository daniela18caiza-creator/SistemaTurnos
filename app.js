let turnos = [];
let numeroTurno = 1;

function solicitarTurno() {
    const campoNombre = document.getElementById("nombrePaciente");
    const nombre = campoNombre.value.trim();

    if (nombre === "") {
        alert("Por favor, ingrese el nombre del paciente.");
        campoNombre.focus();
        return;
    }

    const paciente = {
        numero: numeroTurno,
        nombre: nombre
    };

    turnos.push(paciente);

    document.getElementById("mensajeTurno").innerText =
        "¡Turno registrado! " + nombre +
        ", su número es: T-" + String(numeroTurno).padStart(3, "0");

    numeroTurno++;

    campoNombre.value = "";

    actualizarLista();
}

function llamarSiguiente() {
    if (turnos.length === 0) {
        alert("No hay pacientes pendientes.");
        return;
    }

    const paciente = turnos.shift();

    document.getElementById("turnoActual").innerText =
        "T-" + String(paciente.numero).padStart(3, "0");

    document.getElementById("pacienteActual").innerText =
        paciente.nombre;

    actualizarLista();
}

function actualizarLista() {
    const lista = document.getElementById("listaPacientes");
    const contador = document.getElementById("cantidadPendientes");

    contador.innerText = turnos.length;

    lista.innerHTML = "";

    if (turnos.length === 0) {
        lista.innerHTML =
            '<p class="vacio">No hay pacientes pendientes.</p>';
        return;
    }

    turnos.forEach(function(paciente) {
        const elemento = document.createElement("div");
        elemento.className = "paciente";

        const datos = document.createElement("div");
        datos.className = "datos-paciente";

        const avatar = document.createElement("div");
        avatar.className = "avatar";
        avatar.textContent = paciente.nombre.charAt(0).toUpperCase();

        const informacion = document.createElement("div");

        const nombre = document.createElement("div");
        nombre.className = "nombre";
        nombre.textContent = paciente.nombre;

        const estado = document.createElement("div");
        estado.className = "estado";
        estado.textContent = "En espera";

        informacion.appendChild(nombre);
        informacion.appendChild(estado);

        datos.appendChild(avatar);
        datos.appendChild(informacion);

        const numero = document.createElement("span");
        numero.className = "numero-lista";
        numero.textContent =
            "T-" + String(paciente.numero).padStart(3, "0");

        elemento.appendChild(datos);
        elemento.appendChild(numero);

        lista.appendChild(elemento);
    });
}
