document.addEventListener("DOMContentLoaded", function () {
    const username = localStorage.getItem("username") || "Usuario";
    const userRole = localStorage.getItem("user_role");

    console.log("Usuario almacenado:", username);  // 🔍 Depuración
    console.log("Rol almacenado:", userRole);  // 🔍 Depuración

    if (!userRole) {
        window.location.href = "default_dashboard.html";  // Redirigir si no hay rol
        return;
    }

    document.getElementById("username").textContent = username;
    document.getElementById("role").textContent = "Rol: " + userRole;

    // ✅ Redirigir según el rol
    switch (userRole) {
        case 'admin':
            window.location.href = 'admin_dashboard.html';
            break;
        case 'professor':
            window.location.href = 'professor_dashboard.html';
            break;
        case 'student':
            window.location.href = 'student_dashboard.html';
            break;
        default:
            window.location.href = 'default_dashboard.html';
    }
});
