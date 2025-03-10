window.iniciarChat = function() {
    console.log("✅ Chat inicializado correctamente");

    const chatBox = document.getElementById("chat-box");
    const chatInput = document.getElementById("chat-input");
    const sendBtn = document.getElementById("send-btn");
    const attachImgBtn = document.getElementById("attach-img");
    const imageInput = document.getElementById("image-input");
    const typingIndicator = document.getElementById("typing-indicator");

    if (!chatBox || !chatInput || !sendBtn) {
        console.error("❌ Error: No se encontraron los elementos del chat.");
        return;
    }

    function addMessage(text, type, imgSrc = null) {
        if (!chatBox) return;

        const messageContainer = document.createElement("div");
        messageContainer.classList.add("message", type);

        if (imgSrc) {
            const imageElement = document.createElement("img");
            imageElement.src = imgSrc;
            imageElement.classList.add("chat-image");
            messageContainer.appendChild(imageElement);
        }

        if (text) {
            const textElement = document.createElement("p");
            textElement.innerText = text;
            messageContainer.appendChild(textElement);
        }

        const timestamp = document.createElement("div");
        timestamp.classList.add("timestamp");
        timestamp.innerText = new Date().toLocaleTimeString();
        messageContainer.appendChild(timestamp);

        chatBox.appendChild(messageContainer);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function sendMessage() {
        const messageText = chatInput.value.trim();
        if (messageText === "") return;

        addMessage(messageText, "sent");
        chatInput.value = "";
        typingIndicator.classList.add("hidden");
    }

    function sendImage(file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            addMessage("", "sent", event.target.result);
        };
        reader.readAsDataURL(file);
    }

    sendBtn.addEventListener("click", sendMessage);

    chatInput.addEventListener("keypress", function(event) {
        typingIndicator.classList.remove("hidden");
        if (event.key === "Enter") {
            event.preventDefault();
            sendMessage();
        }
    });

    attachImgBtn.addEventListener("click", function() {
        imageInput.click();
    });

    imageInput.addEventListener("change", function(event) {
        if (event.target.files.length > 0) {
            sendImage(event.target.files[0]);
        }
    });

    chatInput.addEventListener("paste", function(event) {
        const items = (event.clipboardData || event.originalEvent.clipboardData).items;
        for (let item of items) {
            if (item.kind === "file" && item.type.startsWith("image/")) {
                const blob = item.getAsFile();
                sendImage(blob);
            }
        }
    });
};

// Si el chat ya está cargado en el DOM, inicializarlo de inmediato
if (document.getElementById("chat-box")) {
    window.iniciarChat();
}
