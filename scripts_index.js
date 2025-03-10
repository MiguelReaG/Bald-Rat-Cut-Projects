document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.getElementById("sidebar");
    const toggleSidebarBtn = document.getElementById("toggleSidebar");
    const sidebarTexts = document.querySelectorAll(".sidebar-text");

    if (toggleSidebarBtn) {
        toggleSidebarBtn.addEventListener("click", function () {
            sidebar.classList.toggle("w-64");
            sidebar.classList.toggle("w-20");
            sidebar.classList.toggle("sidebar-collapsed");

            // Alternar la visibilidad del texto en el sidebar
            sidebarTexts.forEach(span => {
                span.classList.toggle("hidden");
            });

            // Accesibilidad
            const isExpanded = sidebar.classList.contains("w-64");
            sidebar.setAttribute("aria-expanded", isExpanded);
        });
    }
});

// Función para cargar dinámicamente las secciones dentro del index.html
async function loadPage(page) {
    const pageTitle = document.getElementById("page-title");
    const content = document.getElementById("dynamic-content");
    const scriptContainer = document.getElementById("dynamic-scripts");

    if (!pageTitle || !content) {
        console.error("Error: No se encontró el contenedor principal.");
        return;
    }

    pageTitle.innerText = page.charAt(0).toUpperCase() + page.slice(1);

    try {
        const response = await fetch(`${page}.html`, { cache: "no-cache" });
        if (!response.ok) throw new Error(`Error ${response.status}: No se pudo cargar ${page}.html`);

        const data = await response.text();
        content.innerHTML = data;

        // Limpiar scripts anteriores
        if (scriptContainer) {
            scriptContainer.innerHTML = "";  // Elimina scripts previos para evitar conflictos
        }

        // Esperar un poco antes de ejecutar scripts específicos de la página
        setTimeout(() => {
            ejecutarScriptsDinamicos(page);
        }, 100);
    } catch (error) {
        content.innerHTML = `<p class='text-red-500'>Error al cargar la sección: ${error.message}</p>`;
        console.error("Error al cargar la página:", error);
    }
}

// Función para ejecutar scripts específicos por sección
function ejecutarScriptsDinamicos(page) {
    console.log(`🔄 Cargando funcionalidad de la sección: ${page}...`);

    switch (page) {
        case "chat":
            cargarScript("scripts_chat.js", () => {
                esperarFuncion("iniciarChat", () => {
                    console.log("✅ Ejecutando iniciarChat()...");
                    iniciarChat();
                });
            });
            break;

        case "proyectos":
            cargarScript("scripts_proyectos.js", () => {
                esperarFuncion("cargarProyectos", () => {
                    cargarProyectos();
                });
            });
            break;

        case "evaluaciones":
            cargarScript("scripts_evaluaciones.js", () => {
                esperarFuncion("iniciarEvaluaciones", () => {
                    iniciarEvaluaciones();
                });
            });
            break;

        default:
            console.log(`ℹ No se requiere script adicional para la sección: ${page}.`);
    }
}

// Función para cargar un script si no está ya cargado
function cargarScript(src, callback) {
    let scriptContainer = document.getElementById("dynamic-scripts");

    if (!scriptContainer) {
        console.error("❌ Error: #dynamic-scripts no encontrado, creando contenedor.");
        scriptContainer = document.createElement("div");
        scriptContainer.id = "dynamic-scripts";
        document.body.appendChild(scriptContainer);
    }

    if (document.querySelector(`script[src="${src}"]`)) {
        console.log(`ℹ El script ${src} ya está cargado.`);
        if (callback) callback();
        return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => {
        console.log(`✅ Script cargado: ${src}`);
        if (callback) callback();
    };
    script.onerror = () => console.error(`❌ Error al cargar el script: ${src}`);

    scriptContainer.appendChild(script);
}

// Función para esperar a que una función esté disponible antes de ejecutarla
function esperarFuncion(nombreFuncion, callback, intentos = 10, intervalo = 200) {
    let intentosRestantes = intentos;

    function verificar() {
        if (typeof window[nombreFuncion] === "function") {
            console.log(`✅ ${nombreFuncion} está listo.`);
            callback();
        } else {
            intentosRestantes--;
            if (intentosRestantes > 0) {
                setTimeout(verificar, intervalo);
            } else {
                console.error(`❌ Error: ${nombreFuncion} no está disponible después de ${intentos * intervalo}ms`);
            }
        }
    }

    verificar();
}
