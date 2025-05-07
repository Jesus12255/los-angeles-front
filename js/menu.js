document.addEventListener("DOMContentLoaded", function () {
    console.log("Cargando el menú...");
    fetch("menu.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("menu-container").innerHTML = data;

            // Obtener usuario y rol desde localStorage
            const usuario = localStorage.getItem("usuario");
            const rol = localStorage.getItem("rol");

            // Actualizar el contenido del elemento "Usuario"
            if (usuario && rol) {
                const usuarioLabel = document.getElementById("Usuario");
                usuarioLabel.innerHTML = `<strong>${usuario}</strong><br><small>${rol}</small>`;
            }
        })
        .catch(error => console.error("Error al cargar el menú:", error));
});