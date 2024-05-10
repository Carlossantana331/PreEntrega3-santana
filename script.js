
//codigo para hacer que el menu sea dinamico (aparezca y desaparezca)
let mostrarElementos = document.querySelectorAll('.menuMostrarClick');

mostrarElementos.forEach(listarElementos => {
    listarElementos.addEventListener('click', () => {
        mostrarElementos.forEach(menu => {
            if (menu !== listarElementos && menu.classList.contains('arrow')) {
                menu.classList.remove('arrow');
                menu.nextElementSibling.style.height = "0px";
            }
        });

        listarElementos.classList.toggle('arrow');

        let height = 0;
        let menu = listarElementos.nextElementSibling;
        if (menu.clientHeight == "0") {
            height = menu.scrollHeight;
        }

        menu.style.height = `${height}px`;
    })
});












// Función constructora de objetos para representar una tarea
function TareaPorHacer(tarea, fechaLimite) {
    this.tarea = tarea;
    this.fechaLimite = fechaLimite;
}

// Función para agregar una nueva tarea al array
function agregarTarea(nuevaTarea) {
    tareas.push(nuevaTarea);
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

// Función para validar que la fecha sea ingresada en el formato DD-MM
function validarFecha(fecha) {
    let regex = /^\d{2}-\d{2}$/;
    return regex.test(fecha);
}


// Función para imprimir las tareas en formato de lista
function listaTareas(tareas) {
    let lista = "<ul class = 'listaTareasContainer'>"; // Inicia una lista no ordenada

    for (let i = 0; i < tareas.length; i++) {
        lista += "<li class = 'listaTareasItem'>"; // Inicia un ítem de lista
        lista += "Tarea por hacer: " + tareas[i].tarea.charAt(0).toUpperCase() + tareas[i].tarea.slice(1) + "<br>"; // Contenido de la tarea
        lista += "Fecha límite: " + tareas[i].fechaLimite; // Fecha límite
        lista += "</li>"; // Termina el ítem de lista
    }

    lista += "</ul>"; // Termina la lista no ordenada
    return lista;
}

function actualizarListaTareas() {
    let listaTareasElemento = document.getElementById("listaTareas");
    if (tareas.length !== 0) {
        let lista = "<ul class = 'listaTareasContainer'>"; // Inicia una lista no ordenada

        // Recorre todas las tareas y las agrega a la lista con un botón de eliminación
        for (let i = 0; i < tareas.length; i++) {
            lista += "<li class = 'listaTareasItem'>"; // Inicia un ítem de lista
            lista += "Tarea por hacer: " + tareas[i].tarea.charAt(0).toUpperCase() + tareas[i].tarea.slice(1) + "<br>"; // Contenido de la tarea
            lista += "Fecha límite: " + tareas[i].fechaLimite; // Fecha límite
            lista += "<div class = 'botonesListaTareas'>"
            lista += `<button onclick="tareaCompletada(${i})" class = "boton"><img src="assets/check.svg"></button>`; //Botón de finalizacion de una tarea
            lista += `<button onclick="eliminarTarea(${i})" class = "boton"><img src="assets/basura.svg"></button>`; // Botón de eliminación
            lista += "</div>"
            lista += "</li>"; // Termina el ítem de lista
            lista += "<div class = 'lineaDivisora'></div>";
        }

        lista += "</ul>"; // Termina la lista no ordenada
        listaTareasElemento.innerHTML = lista;
    } else {
        listaTareasElemento.innerHTML = "<h2>Aun no hay tareas en la lista.</h2>";
    }
}


//funcion para mover tareas a la lista de completadas 
function tareaCompletada(index) {
    tareasCompletadas.push({
        tarea: tareas[index].tarea,
        fechaLimite: tareas[index].fechaLimite,
        fechaCompletado: new Date().toLocaleDateString(), // Fecha actual
    });
    tareas.splice(index, 1);
    localStorage.setItem("tareas", JSON.stringify(tareas));
    localStorage.setItem("tareasCompletadas", JSON.stringify(tareasCompletadas));
    actualizarListaTareas();
    actualizarListaTareasCompletadas();
}



function actualizarListaTareasCompletadas() {
    let listaTareasCompletadasElemento = document.getElementById("listaTareasCompletadas");
    if (tareasCompletadas.length !== 0) {
        let lista = "<ul class = 'listaTareasContainer'>"; // Inicia una lista no ordenada

        // Recorre todas las tareas completadas y las agrega a la lista
        for (let i = 0; i < tareasCompletadas.length; i++) {
            lista += "<li class = 'listaTareasItem'>"; 
            lista += "Tarea completada: " + tareasCompletadas[i].tarea.charAt(0).toUpperCase() + tareasCompletadas[i].tarea.slice(1) + "<br>"; // Contenido de la tarea completada
            lista += "Fecha límite: " + tareasCompletadas[i].fechaLimite + "<br>"; // Fecha límite
            lista += "Fecha en la que se realizo: " + tareasCompletadas[i].fechaCompletado; // Fecha de completado
            lista += "</li>"; 
            lista += "<div class = 'lineaDivisora'></div>";
        }
        
        lista += "</ul>"; // Termina la lista no ordenada
        listaTareasCompletadasElemento.innerHTML = lista;
    } else {
        listaTareasCompletadasElemento.innerHTML = "<h2>No hay tareas completadas.</h2>";
    }
}


let tareasCompletadas = [];
document.addEventListener("DOMContentLoaded", function() {
    let tareasCompletadasGuardadas = localStorage.getItem("tareasCompletadas");
    if (tareasCompletadasGuardadas) {
        tareasCompletadas = JSON.parse(tareasCompletadasGuardadas);
        actualizarListaTareasCompletadas();
    }
});


function eliminarTarea(index) {
    tareas.splice(index, 1);
    localStorage.setItem("tareas", JSON.stringify(tareas));
    actualizarListaTareas();
}


// Función para agregar una nueva tarea
function agregarNuevaTarea() {
    let tareaInput = document.getElementById("input-tarea").value.trim();
    let fechaInput = document.getElementById("input-fecha").value; // Ya no necesitas el trim() aquí

    if (tareaInput !== "" && fechaInput !== "") {
        let nuevaFecha = new Date(fechaInput); // Convertir el valor del input de fecha a un objeto de fecha
        let fechaFormateada = nuevaFecha.toLocaleDateString(); // Formatear la fecha si es necesario
        let nuevaTarea = new TareaPorHacer(tareaInput, fechaFormateada);
        agregarTarea(nuevaTarea);
        document.getElementById("input-tarea").value = "";
        document.getElementById("input-fecha").value = "";
        actualizarListaTareas();
    } else {
        alert("Por favor, complete todos los campos.");
    }
}

//funcion para limpiar el historial de tareas completadas
function limpiarTareasCompletadas() {
    tareasCompletadas = []; // Vaciar el array de tareas completadas
    localStorage.removeItem("tareasCompletadas"); // Remover las tareas completadas del almacenamiento local
    actualizarListaTareasCompletadas(); // Actualizar la visualización de la lista de tareas completadas
}


// Cargar tareas desde localStorage al cargar la página
document.addEventListener("DOMContentLoaded", function() {
    let tareasGuardadas = localStorage.getItem("tareas");
    if (tareasGuardadas) {
        tareas = JSON.parse(tareasGuardadas);
        actualizarListaTareas();
    }
});

//evento click en boton de tareas terminadas
document.getElementById("limpiarTareasCompletadas").addEventListener("click", limpiarTareasCompletadas);

// Obtener el botón "Agregar tarea" por su ID
let botonAgregarTarea = document.getElementById("boton-agregar-tarea");

// Agregar un event listener para el clic en el botón
botonAgregarTarea.addEventListener("click", agregarNuevaTarea);

// Obtener el enlace correspondiente a la opción 1
let enlaceConsultarTareas = document.querySelector('.menuLink');

// Agregar un evento de escucha para el clic en el enlace
enlaceConsultarTareas.addEventListener('click', function(event) {
    event.preventDefault(); // Evitar que el enlace siga el href

    // Llamar a la función para actualizar la lista de tareas
    actualizarListaTareas();
});

// Array para almacenar las tareas
let tareas = [];
