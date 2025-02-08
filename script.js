document.addEventListener("DOMContentLoaded", function () {
    const chatbox = document.getElementById("chatbox");
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");

    async function sendMessage(message) {
        const response = await fetch("https://your-eliza-app.vercel.app/api/chat", { 
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message })
        });
        const data = await response.json();
        return data.reply;
    }

    sendBtn.addEventListener("click", async () => {
        const message = userInput.value.trim();
        if (!message) return;

        chatbox.innerHTML += `<div class="user-message">${message}</div>`;
        userInput.value = "";

        const botReply = await sendMessage(message);
        chatbox.innerHTML += `<div class="bot-message">${botReply}</div>`;
    });
});
