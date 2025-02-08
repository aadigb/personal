document.addEventListener("DOMContentLoaded", function () {
    const chatbox = document.getElementById("chatbox");
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");

    const VENICE_API_KEY = "qNHgGGkwlhGw_uVLC7Px9hdRpIEaWt1P8DQ2_zIGm8";
    const VENICE_API_URL = "https://api.venice.ai/v1/chat/completions";

    function appendMessage(sender, message) {
        const messageElement = document.createElement("div");
        messageElement.classList.add(sender === "user" ? "user-message" : "bot-message");
        messageElement.textContent = message;
        chatbox.appendChild(messageElement);
        chatbox.scrollTop = chatbox.scrollHeight;
    }

    async function sendMessage() {
        const message = userInput.value.trim();
        if (message === "") return;

        appendMessage("user", message);
        userInput.value = "";

        try {
            const response = await fetch(VENICE_API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${VENICE_API_KEY}`
                },
                body: JSON.stringify({
                    model: "gpt-4",
                    messages: [{ role: "user", content: message }]
                })
            });

            const data = await response.json();
            const botReply = data.choices[0]?.message?.content || "Sorry, I couldn't understand that.";
            appendMessage("bot", botReply);
        } catch (error) {
            console.error("Error:", error);
            appendMessage("bot", "Error connecting to Venice AI.");
        }
    }

    sendBtn.addEventListener("click", sendMessage);
    userInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });
});
