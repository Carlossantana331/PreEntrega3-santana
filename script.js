//funcion para almacenar el nombre del usuario
function guardarNombre(e){
    e.preventDefault();
    
    let nombre = document.getElementById("inputUsuario").value;

    localStorage.setItem("nombre", nombre);
}


//funcion para mostrar el nombre del usuario
function saludoPersonalizado (){
    let elementoNombre = document.getElementById ("nombreUsuario")
    let nombreIngresado = localStorage.getItem ("nombre")

    if (nombreIngresado) {
        elementoNombre.textContent = "Bienvenido a tu lista de tareas, " + nombreIngresado;
    }else{
        elementoNombre.textContent = "Bienvenido";
    }
}

//funcion para mostrar/ocultar el menu inicial y el formulario para el nombre de usuario 
function mostrarFormularioTareas() {
    document.getElementById("formularioNombre").style.display = "none"; // oculta el formulario de ingreso de nombre
    document.getElementById("menuInicial").style.display = "block"; // muestra el formulario de tareas
}

//funcion para comprobar si hay un nombre guardado previamente
function comprobarNombreGuardado() {
    let nombreIngresado = localStorage.getItem("nombre");

    if (nombreIngresado) {
        saludoPersonalizado(); // muestra un saludo personalizado si hay un nombre guardado
        mostrarFormularioTareas(); // muestra directamente el menu inicial si hay un nombre guardado
    }
}


//funcion  para imrpimir las tareas que tengo ingresadas
function listaTareas(tareas) {
    let lista = "Lista de tareas: \n";
    for (let i = 0; i < tareas.length; i++) {
        lista += (i + 1) + "- Tarea por hacer: " + tareas[i].tarea + "\n    Fecha límite: " + tareas[i].fechaLimite + "\n--------------------------------------\n";
    }
    return lista;
}

// Actualizar el contenido del HTML con la lista de tareas
function actualizarListaTareas() {
    let listaTareasElemento = document.getElementById("listaTareas");
    if (tareas.length !== 0) {
        listaTareasElemento.innerHTML = listaTareas(tareas);
    } else {
        listaTareasElemento.innerHTML = "<li>Aun no hay tareas en la lista.</li>";
    }
}

//funcion para mostrar que opcion fue elegida
function mostrarInfo(mensaje) {
    document.getElementById("infoOpcion").textContent = mensaje;
}

//funciones para mostrar/ocultar elemento
function mostrarElemento(id) {
    document.getElementById(id).style.display = "block";
}

function ocultarElemento(id) {
    document.getElementById(id).style.display = "none";
}

//funcion para regresar al menu principal
function regresarMenuPrincipal() {
    mostrarElemento("menuInicial");
    ocultarElemento("listaTareasHTML");
    eleccion = (0)
}


//llamada de las funciones
saludoPersonalizado();
comprobarNombreGuardado();

document.getElementById("formularioNombre");
document.addEventListener("submit", guardarNombre);
document.addEventListener("DOMContentLoaded", saludoPersonalizado);












//funcion constructora de objetos
function tareaPorHacer (tarea, fechaLimite) {
    this.tarea = tarea;
    this.fechaLimite = fechaLimite;
}


// Función para agregar una nueva tarea al array
function agregarTarea(nuevaTarea) {
    tareas.push(nuevaTarea);
}


//funcion para validar que la fecha sea ingresada como se solicita
function validarFecha(fecha) {
    // Expresión regular para el formato DD-MM
    let regex = /^\d{2}-\d{2}$/;
    if (!regex.test(fecha)) {
        return false;
    }

    // Extraer el mes de la fecha
    let partesFecha = fecha.split("-");
    let mes = parseInt(partesFecha[1], 10);

    // Verificar si el mes es válido (de 01 a 12)
    return mes >= 1 && mes <= 12;
}










//variables
let tareas = [];


document.getElementById("opcionesForm").addEventListener("submit", function(event) {
event.preventDefault(); // Evitar el envío del formulario

    let eleccion = parseInt(document.getElementById("opcionInput").value);

    switch (eleccion) {
        case 1:
            mostrarElemento("switch")
            ocultarElemento("menuInicial")
            ocultarElemento("agregarTarea")
            actualizarListaTareas();
            break;

        case 2:
            mostrarElemento("switch")
            ocultarElemento("menuInicial")
            ocultarElemento("listaTareasHTML")
            
            let tarea = document.getElementById("tareaInput").value;
            let fechaLimite = document.getElementById("fechaInput").value;
            if (tarea && fechaLimite && validarFecha(fechaLimite)) {
                let nuevaTarea = new tareaPorHacer(tarea, fechaLimite);
                agregarTarea(nuevaTarea);
                mostrarInfo("Tarea agregada correctamente.");
            } else {
                mostrarInfo("Por favor, ingrese una tarea y una fecha límite válida (DD-MM).");
            }
            break;
            
        case 3:
            mostrarInfo("Eliminar tarea");
            break;
        case 4:
            mostrarInfo("Salir");
            break;
        default:
            mostrarInfo("Opción no válida. Por favor, elija una opción válida del 1 al 4.");
        }
});















//script para si es tarea diaria, desactivar la fecha
document.getElementById("recurrente").addEventListener("change", function() {
    // Obtener la referencia al elemento de fecha
    var fechaInput = document.getElementById("fechaInput");

    // Si la casilla de verificación está marcada, desactivar la entrada de fecha; de lo contrario, habilitarla
    if (this.checked) {
        fechaInput.disabled = true;
    } else {
        fechaInput.disabled = false;
    }
});




