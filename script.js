document.addEventListener("DOMContentLoaded", function () {
    const chatbox = document.getElementById("chatbox");
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");

    const VENICE_API_KEY = "qNHgGGkwlhGw_uVLC7Px9hdRpIEaWt1P8DQ2_zIGm8";
    const VENICE_API_URL = "https://api.venice.ai/api/v1/chat/completions"; 

    const BASESCAN_API_KEY = "DQXFFXNH55YHE8ZUNN59WRJS3RYIZTTKUT";
    const BASESCAN_API_URL = "https://api.basescan.org/api";
    const wallets = [
        "0x0000cf1eDaF40a9350F2B649e19D811B05DBF138",
        "0xDB1630447B80B557369e1c96dF10102c3C309D71",
        "0x61650b819483ABaAC50358CAf2ca10A3B978288A"
    ];

    let stockHoldings = [];

    function appendMessage(sender, message) {
        const messageElement = document.createElement("div");
        messageElement.classList.add(sender === "user" ? "user-message" : "bot-message");
        messageElement.textContent = message;
        chatbox.appendChild(messageElement);
        chatbox.scrollTop = chatbox.scrollHeight;
    }

    async function fetchTokenBalances() {
        let tokenList = [];

        for (const wallet of wallets) {
            try {
                const response = await fetch(`${BASESCAN_API_URL}?module=account&action=tokenlist&address=${wallet}&apikey=${BASESCAN_API_KEY}`);
                const data = await response.json();

                if (data.status === "1") {
                    data.result.forEach(token => {
                        tokenList.push(token.symbol);
                    });
                }
            } catch (error) {
                console.error("Error fetching token balances:", error);
            }
        }

        return [...new Set(tokenList)]; // Remove duplicates
    }

    async function checkTokens(message) {
        const lowerMsg = message.toLowerCase();
        const tokens = await fetchTokenBalances();

        for (let token of tokens) {
            if (lowerMsg.includes(token.toLowerCase())) {
                return `Yes, I hold ${token}.`;
            }
        }
        return "No, I do not hold that token.";
    }

    function addStock() {
        const stockInput = document.getElementById("stock-input").value.trim().toUpperCase();
        if (stockInput && !stockHoldings.includes(stockInput)) {
            stockHoldings.push(stockInput);
            updateStockUI();
        }
    }

    function updateStockUI() {
        const stockList = document.getElementById("stock-list");
        stockList.innerHTML = stockHoldings.map(stock => `<li>${stock}</li>`).join("");
    }

    function checkStocks(message) {
        const lowerMsg = message.toLowerCase();
        for (let stock of stockHoldings) {
            if (lowerMsg.includes(stock.toLowerCase())) {
                return `Yes, I hold ${stock}.`;
            }
        }
        return "No, I do not hold that stock.";
    }

    async function sendMessage() {
        const message = userInput.value.trim();
        if (message === "") return;

        appendMessage("user", message);
        userInput.value = "";

        if (message.toLowerCase().includes("do you hold")) {
            const tokenReply = await checkTokens(message);
            appendMessage("bot", tokenReply);
            return;
        }

        if (message.toLowerCase().includes("stock")) {
            const stockReply = checkStocks(message);
            appendMessage("bot", stockReply);
            return;
        }

        try {
            const response = await fetch(VENICE_API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${VENICE_API_KEY}`
                },
                body: JSON.stringify({
                    model: "default",
                    messages: [{ role: "user", content: message }],
                    venice_parameters: {
                        include_venice_system_prompt: false
                    }
                })
            });

            const data = await response.json();
            console.log("API Response:", data);

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
