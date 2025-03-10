document.addEventListener("DOMContentLoaded", function () {
    // Mostrar sección de publicaciones
    document.getElementById("publicaciones").style.display = "block";

    // Evento para el botón de nueva publicación
    document.getElementById("newPublication").addEventListener("click", function () {
        alert("Formulario para agregar nueva publicación aún no implementado.");
    });
});

// Función para editar una publicación
function editarPublicacion(btn) {
    alert("Función de edición aún no implementada.");
}

// Función para eliminar una publicación
function eliminarPublicacion(btn) {
    if (confirm("¿Seguro que deseas eliminar esta publicación?")) {
        btn.closest("tr").remove();
    }
}
