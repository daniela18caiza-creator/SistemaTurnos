
let turnos = [];
let numero = 1;

function solicitarTurno() {

    let nuevoTurno = numero++;

    turnos.push(nuevoTurno);

    document.getElementById("numeroTurno").innerText =
        "Su número de turno es: " + nuevoTurno;

    actualizarPendientes();
}

function llamarSiguiente() {

    if (turnos.length === 0) {

        alert("No hay pacientes pendientes");

        return;
    }

    let turnoActual = turnos.shift();

    document.getElementById("turnoActual").innerText =
        turnoActual;

    actualizarPendientes();
}

function actualizarPendientes() {

    document.getElementById("pendientes").innerText =
        turnos.length;
}
