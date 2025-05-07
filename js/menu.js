document.addEventListener("DOMContentLoaded", function () {
  // Cargar el HTML del menú
  fetch("menu.html")
    .then((response) => response.text())
    .then((menuHtml) => {
      document.getElementById("menu-container").innerHTML = menuHtml;

      // Agregar funcionalidad para alternar el menú lateral en pantallas pequeñas
      const toggler = document.querySelector(".navbar-toggler");
      const navbar = document.querySelector(".navbar");
      const menuContainer = document.querySelector("#container-btns");

      if (toggler && navbar) {
        toggler.addEventListener("click", function () {
          navbar.classList.toggle("hidden"); // Alterna la clase 'hidden' para mostrar/ocultar el menú
        });
      }

      // Opcional: Cierra el menú si se hace clic fuera de él en dispositivos móviles
      $("btnMenu").click(function () {
        if (!navbar.contains(event.target) && !toggler.contains(event.target)) {
          navbar.classList.add("hidden");
        }
      });

      // Cargar contenido del menú dinámico
      $.ajax({
        url: localStorage.getItem("baseUrl") + "/usuario/loadMenu",
        method: "GET",
        contentType: "application/json",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        success: function (response) {
          // Verificar si la respuesta contiene el menú
          if (response && response.menu) {
            const menuItems = response.menu;

            var dynamicMenuHTML = "";
            for (let i = 0; i < menuItems.length; i++) {
              const item = menuItems[i];
              dynamicMenuHTML += `<button class="custom-button">${item.text}</button>`;
            }

            if (menuContainer) {
              menuContainer.innerHTML = dynamicMenuHTML;
              console.log("Menú dinámico cargado correctamente.");
            } else {
              console.error("No se encontró el contenedor del menú estático.");
            }
          } else {
            console.error(
              "La respuesta del servidor no contiene un menú válido."
            );
          }
        },
        error: function () {
          alert("Error al cargar el menú dinámico desde el servidor.");
        },
      });

      // Obtener usuario y rol desde localStorage y actualizar el contenido del elemento "Usuario"
      const usuario = localStorage.getItem("usuario");
      const rol = localStorage.getItem("rol");

      if (usuario && rol) {
        const usuarioLabel = document.getElementById("Usuario");
        usuarioLabel.innerHTML = `<strong>${usuario}</strong><br><small>${rol}</small>`;
      }

      if (toggler && navbar) {
        toggler.addEventListener("click", function () {
          navbar.classList.toggle("show");
        });
      }
    })
    .catch((error) => {
      console.error("Error al cargar el menú estático:", error);
    });
});
