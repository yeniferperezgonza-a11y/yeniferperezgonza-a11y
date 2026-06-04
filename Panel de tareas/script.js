const formulario = document.getElementById("formulario");
const listaTareas = document.getElementById("listaTareas");
const mensaje = document.getElementById("mensaje");
const limpiar = document.getElementById("limpiar");

let tareas = [];

formulario.addEventListener("submit", function(event){

    event.preventDefault();

    let tarea = document.getElementById("tarea").value;
    let responsable = document.getElementById("responsable").value;
    let prioridad = document.getElementById("prioridad").value;
    let estado = document.getElementById("estado").value;
    let fecha = document.getElementById("fecha").value;

    // VALIDACIÓN
    if(tarea === "" || responsable === "" || prioridad === ""){
        mensaje.textContent = "Todos los campos son obligatorios";
        return;
    }

    if(tarea.length < 5){
        mensaje.textContent = "La tarea debe tener mínimo 5 caracteres";
        return;
    }

    mensaje.textContent = "";

    let nuevaTarea = {
        tarea,
        responsable,
        prioridad,
        estado,
        fecha
    };

    tareas.push(nuevaTarea);

    mostrarTareas();

    formulario.reset();

});

function mostrarTareas(){

    listaTareas.innerHTML = "";

    tareas.forEach(function(t){

        let fila = document.createElement("tr");

        if(t.prioridad === "Alta"){
            fila.classList.add("alta");
        }

        if(t.prioridad === "Media"){
            fila.classList.add("media");
        }

        if(t.prioridad === "Baja"){
            fila.classList.add("baja");
        }

        fila.innerHTML = `
            <td>${t.tarea}</td>
            <td>${t.responsable}</td>
            <td>${t.prioridad}</td>
            <td>${t.estado}</td>
            <td>${t.fecha}</td>
        `;

        listaTareas.appendChild(fila);

    });

}

limpiar.addEventListener("click", function(){

    tareas = [];
    listaTareas.innerHTML = "";

});