// ===============================
// SELECCIÓN DE ELEMENTOS
// ===============================

// getElementById()
const titulo = document.getElementById("titulo");
const nombre = document.getElementById("nombre");
const imagen = document.getElementById("imagen");
const nivel = document.getElementById("nivel");
const progreso = document.getElementById("progreso");

const btnCambiar =
document.getElementById("btnCambiar");

const btnColor =
document.getElementById("btnColor");

const btnReset =
document.getElementById("btnReset");

// querySelector()
const estado =
document.querySelector(".estado");

const tarjeta =
document.querySelector(".tarjeta");

const body =
document.querySelector("body");

const lista =
document.querySelector("#lista");


// ===============================
// VARIABLES
// ===============================

let contador = 1;

let porcentaje = 10;

let modoOscuro = true;


// ===============================
// EVENTO 1
// CAMBIAR USUARIO
// ===============================

btnCambiar.addEventListener("click", function(){

    contador++;

    porcentaje += 10;

    if(porcentaje > 100){
        porcentaje = 10;
    }

    nombre.textContent =
    "Usuario #" + contador;

    estado.textContent =
    "Estado: En línea";

    nivel.textContent =
    "Nivel: " + contador;

    progreso.style.width =
    porcentaje + "%";

    imagen.src =
    "https://picsum.photos/400/220?random=" + contador;

    tarjeta.style.transform =
    "rotate(1deg) scale(1.02)";

    setTimeout(function(){

        tarjeta.style.transform =
        "rotate(0deg) scale(1)";

    },300);

    const item =
    document.createElement("li");

    item.textContent =
    "Se cambió al Usuario #" + contador;

    lista.appendChild(item);

});


// ===============================
// EVENTO 2
// CAMBIAR COLORES
// ===============================

btnColor.addEventListener("click", function(){

    if(modoOscuro){
        
        body.style.background =
        "linear-gradient(135deg,#000000,#014daa)";

        tarjeta.style.background =
        "#ecf0f1";

        titulo.textContent =
        "MODO OSCURO ACTIVADO";

        modoOscuro = false;

    }else{

        body.style.background =
        "linear-gradient(135deg,#ffffff,#014daa)";

        tarjeta.style.background =
        "white";

        titulo.textContent =
        "CENTRO DE CONTROL DOM";

        modoOscuro = true;

    }

    const item =
    document.createElement("li");

    item.textContent =
    "El tema visual fue modificado";

    lista.appendChild(item);

});


// ===============================
// EVENTO 3
// REINICIAR
// ===============================

btnReset.addEventListener("click", function(){

    contador = 1;

    porcentaje = 10;

    nombre.textContent =
    "Usuario Invitado";

    estado.textContent =
    "Estado: Desconectado";

    nivel.textContent =
    "Nivel: 1";

    progreso.style.width =
    "10%";

    imagen.src =
    "https://picsum.photos/400/220?random=1";

    titulo.textContent =
    "CENTRO DE CONTROL DOM";

    lista.innerHTML = "";

    tarjeta.style.background =
    "white";

    body.style.background =
    "linear-gradient(135deg,#141e30,#243b55)";

});