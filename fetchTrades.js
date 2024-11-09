async function fetchRecentTrades(address) {
    const apiURL = `https://api.basescan.org/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=desc&apikey=958TN5XYU2MSUCEE4A1GKPY2B39SKH6XDQ`;

    try {
        const response = await fetch(apiURL);
        const data = await response.json();

        if (data.status === "1") {
            const trades = data.result.slice(0, 5); // Displaying 5 most recent trades
            const tradesInfo = trades.map(trade => `
                <div class="trade">
                    <p><strong>Hash:</strong> ${trade.hash}</p>
                    <p><strong>Value:</strong> ${trade.value / 1e18} ETH</p>
                    <p><strong>Timestamp:</strong> ${new Date(trade.timeStamp * 1000).toLocaleString()}</p>
                </div>
            `).join("");
            document.getElementById("trades-info").innerHTML = tradesInfo;
        } else {
            document.getElementById("trades-info").innerText = "No recent trades found or an error occurred.";
        }
    } catch (error) {
        console.error("Error fetching trades:", error);
        document.getElementById("trades-info").innerText = "Error loading recent trades.";
    }
}

fetchRecentTrades("0x0000cf1eDaF40a9350F2B649e19D811B05DBF138");
