document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.querySelector("form");
    const fecha = document.getElementById("fecha");

    const campos = {
        nombre: document.getElementById("nombre"),
        correo: document.getElementById("correo"),
        telefono: document.getElementById("telefono"),
        direccion: document.getElementById("direccion"),
        puesto: document.getElementById("puesto"),
        estudios: document.getElementById("estudios"),
        experiencia: document.getElementById("experiencia"),
        habilidades: document.getElementById("habilidades"),
        disponibilidad: document.getElementById("disponibilidad"),
        cv: document.getElementById("cv"),
        mensaje: document.getElementById("mensaje")
    };

    iniciarPagina();

    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();
        limpiarErrores();

        const datos = obtenerDatos();
        const camposVacios = buscarCamposVacios(datos);

        if (camposVacios.length > 0) {
            mostrarMensaje("Por favor completa todos los campos obligatorios.", "error");
            marcarErrores(camposVacios);
            return;
        }

        if (!correoValido(datos.correo)) {
            mostrarMensaje("Ingresa un correo electrónico válido.", "error");
            marcarErrores(["correo"]);
            return;
        }

        if (!telefonoValido(datos.telefono)) {
            mostrarMensaje("Ingresa un número de teléfono válido.", "error");
            marcarErrores(["telefono"]);
            return;
        }

        if (!archivoValido(datos.cv)) {
            mostrarMensaje("El currículum debe ser PDF, DOC o DOCX.", "error");
            marcarErrores(["cv"]);
            return;
        }

        mostrarResumen(datos);
        mostrarMensaje("Solicitud enviada correctamente.", "exito");
        formulario.reset();
        actualizarFecha();
    });

    function iniciarPagina() {
        formulario.setAttribute("novalidate", "novalidate");
        actualizarFecha();
        crearMensajeEstado();
        crearResumen();
    }

    function actualizarFecha() {
        const fechaActual = new Date();

        fecha.value = fechaActual.toLocaleDateString("es-SV", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    }

    function obtenerDatos() {
        return {
            nombre: campos.nombre.value.trim(),
            correo: campos.correo.value.trim(),
            telefono: campos.telefono.value.trim(),
            direccion: campos.direccion.value.trim(),
            puesto: campos.puesto.options[campos.puesto.selectedIndex].text,
            puestoValor: campos.puesto.value,
            estudios: campos.estudios.options[campos.estudios.selectedIndex].text,
            estudiosValor: campos.estudios.value,
            experiencia: campos.experiencia.value.trim(),
            habilidades: campos.habilidades.value.trim(),
            disponibilidad: campos.disponibilidad.options[campos.disponibilidad.selectedIndex].text,
            disponibilidadValor: campos.disponibilidad.value,
            cv: campos.cv.files[0] ? campos.cv.files[0].name : "",
            mensaje: campos.mensaje.value.trim()
        };
    }

    function buscarCamposVacios(datos) {
        const obligatorios = [
            "nombre",
            "correo",
            "telefono",
            "direccion",
            "experiencia",
            "habilidades",
            "cv"
        ];

        const vacios = obligatorios.filter(function (campo) {
            return datos[campo] === "";
        });

        if (datos.puestoValor === "") vacios.push("puesto");
        if (datos.estudiosValor === "") vacios.push("estudios");
        if (datos.disponibilidadValor === "") vacios.push("disponibilidad");

        return vacios;
    }

    function correoValido(correo) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
    }

    function telefonoValido(telefono) {
        return telefono.replace(/\D/g, "").length >= 8;
    }

    function archivoValido(nombreArchivo) {
        return /\.(pdf|doc|docx)$/i.test(nombreArchivo);
    }

    function marcarErrores(listaCampos) {
        listaCampos.forEach(function (campo) {
            campos[campo].classList.add("campo-error");
        });

        campos[listaCampos[0]].focus();
    }

    function limpiarErrores() {
        Object.values(campos).forEach(function (campo) {
            campo.classList.remove("campo-error");
        });
    }

    function crearMensajeEstado() {
        const mensaje = document.createElement("p");
        mensaje.id = "mensajeEstado";
        mensaje.setAttribute("aria-live", "polite");
        formulario.appendChild(mensaje);
    }

    function mostrarMensaje(texto, tipo) {
        const mensajeEstado = document.getElementById("mensajeEstado");
        mensajeEstado.textContent = texto;
        mensajeEstado.className = tipo === "error" ? "mensaje-error" : "mensaje-exito";
    }

    function crearResumen() {
        const resumen = document.createElement("section");
        resumen.id = "resumenSolicitud";
        resumen.innerHTML = `
            <h2>Información registrada</h2>
            <p>Aquí aparecerán los datos cuando envíes la solicitud.</p>
        `;

        formulario.closest("section").after(resumen);
    }

    function mostrarResumen(datos) {
        const resumen = document.getElementById("resumenSolicitud");

        resumen.innerHTML = `
            <h2>Información registrada</h2>
            <p><strong>Nombre:</strong> ${limpiarTexto(datos.nombre)}</p>
            <p><strong>Correo:</strong> ${limpiarTexto(datos.correo)}</p>
            <p><strong>Teléfono:</strong> ${limpiarTexto(datos.telefono)}</p>
            <p><strong>Ciudad / Dirección:</strong> ${limpiarTexto(datos.direccion)}</p>
            <p><strong>Puesto:</strong> ${limpiarTexto(datos.puesto)}</p>
            <p><strong>Estudios:</strong> ${limpiarTexto(datos.estudios)}</p>
            <p><strong>Disponibilidad:</strong> ${limpiarTexto(datos.disponibilidad)}</p>
            <p><strong>Currículum:</strong> ${limpiarTexto(datos.cv)}</p>
            <p><strong>Experiencia:</strong> ${limpiarTexto(datos.experiencia)}</p>
            <p><strong>Habilidades:</strong> ${limpiarTexto(datos.habilidades)}</p>
            <p><strong>Mensaje adicional:</strong> ${limpiarTexto(datos.mensaje || "Sin mensaje adicional")}</p>
            <p><strong>Fecha:</strong> ${limpiarTexto(fecha.value)}</p>
        `;
    }

    function limpiarTexto(texto) {
        const elemento = document.createElement("div");
        elemento.textContent = texto;
        return elemento.innerHTML;
    }
});