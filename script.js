document.addEventListener("DOMContentLoaded", function () {
    const chatbox = document.getElementById("chatbox");
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");

    const VENICE_API_KEY = "qNHgGGkwlhGw_uVLC7Px9hdRpIEaWt1P8DQ2_zIGm8";
    const VENICE_API_URL = "https://api.venice.ai/api/v1/chat/completions"; // Corrected URL

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
                    model: "default", // Venice API uses "default" if you are unsure of the model
                    messages: [{ role: "user", content: message }],
                    venice_parameters: {
                        include_venice_system_prompt: false // Disables Venice's default prompts
                    }
                })
            });

            const data = await response.json();
            console.log("API Response:", data); // Debugging

            if (response.ok) {
                const botReply = data.choices?.[0]?.message?.content || "Sorry, I couldn't understand that.";
                appendMessage("bot", botReply);
            } else {
                appendMessage("bot", `API Error: ${data.error?.message || "Unknown error"}`);
            }
        } catch (error) {
            console.error("Fetch Error:", error);
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
