$(document).ready(function () {
    const token = localStorage.getItem("authToken");

    $.ajax({
        url: localStorage.getItem("baseUrl") + "/formulario/initForm",
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
        success: function (response) {
            llenarCombos(response.combo);
        },
        error: function () {
            alert("Error al cargar datos.");
        }
    });

    function llenarCombos(combo) {
        combo.tipoDocumento.list.forEach(item => {
            $("#tipoDocumento").append(`<option value="${item.codigo}">${item.nombre}</option>`);
        });
        combo.sexo.list.forEach(item => {
            $("#sexo").append(`<option value="${item.codigo}">${item.nombre}</option>`);
        });
        combo.prioridad.list.forEach(item => {
            $("#prioridad").append(`<option value="${item.codigo}">${item.nombre}</option>`);
        });
        combo.medico.list.forEach(item => {
            $("#medico").append(`<option value="${item.codigo}">${item.nombre}</option>`);
        });
    }

    // Calcular edad automáticamente
    $("#fech_nac").on("change", function () {
        const fechaNacimiento = new Date($(this).val());
        const hoy = new Date();
        let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
        const mes = hoy.getMonth() - fechaNacimiento.getMonth();

        if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
            edad--;
        }

        $("#edad").val(edad >= 0 ? edad : 0); // Asegurarse de que la edad no sea negativa
    });

    $("#miFormulario").on("submit", function (e) {
        e.preventDefault();

        let isValid = true;

        // Validar campos requeridos
        $("#miFormulario [required]").each(function () {
            if (!$(this).val().trim()) {
                $(this).addClass("input-error");
                isValid = false;
            } else {
                $(this).removeClass("input-error");
            }
        });

        if (!isValid) {
            alert("Por favor, completa todos los campos obligatorios.");
            return;
        }

        const data = {
            tipoDocumentoCodigo: $("#tipoDocumento").val(),
            numeroDocumento: $("#paciente").val(),
            apPaterno: $("#apPaterno").val(),
            apMaterno: $("#apMaterno").val(),
            nombres: $("#nombres").val(),
            fechaNacimiento: $("#fech_nac").val(),
            edad: parseInt($("#edad").val()),
            sexoCodigo: $("#sexo").val(),
            prioridadCodigo: $("#prioridad").val(),
            historiaClinica: $("#hist_cli").val(),
            fechaTomaMuestra: $("#fech_mue").val(),
            telefono: $("#telef").val(),
            correo: $("#correo").val(),
            direccion: $("#direccion").val(),
            comentario: $("#comentario").val(),
            codigo: $("#codigo").val(),
            cmp: $("#cmp").val(),
            medicoCodigo: $("#medico").val()
        };

        $.ajax({
            url: localStorage.getItem("baseUrl") + "/formulario/saveOrUpdate",
            method: "POST",
            contentType: "application/json",
            headers: { Authorization: `Bearer ${token}` },
            data: JSON.stringify(data),
            success: function () {
                alert("Formulario enviado correctamente.");
                limpiarFormulario();
            },
            error: function () {
                alert("Error al enviar formulario.");
            }
        });
    });

    function limpiarFormulario() {
        $("#miFormulario")[0].reset();
        $("#tipoDocumento").val("").change();
        $("#sexo").val("").change();
        $("#prioridad").val("").change();
        $("#medico").val("").change();
    }
});