//nobody touch this i was abt to pull my hair out doing this
let MAX_DAYS = 30; //max amount of days the logs are kept in
function cleanOldLogs() {
    let logs = JSON.parse(localStorage.getItem("systemLogs")) || [];
    let now = Date.now();
    let limit = 1000 * 60 * 60 * 24 * MAX_DAYS;

    let filtered = logs.filter(log => {
        return now - new Date(log.timestamp).getTime() <= limit;
    });

    localStorage.setItem("systemLogs", JSON.stringify(filtered));
}

function displayLogs() {
    cleanOldLogs();

    let logs = JSON.parse(localStorage.getItem("systemLogs")) || [];

    let allBox = document.getElementById("allLogs");
    let allHTML = "";

    logs.forEach(log => {
        let entry = `
            <div class="logEntry">
                <div class="timestamp">${log.timestamp}</div>
                <div>${log.activity}</div>
            </div>
        `;

        allHTML += entry;
    });

    allBox.innerHTML = allHTML || "<p>No logs.</p>";
}

function currentOrders() {
    let box = document.getElementById("ordersBox");

    box.style.display = box.style.display === "none" ? "block" : "none";

    if (box.style.display === "block") {
        displayOrders();
    }
}

function displayOrders() {
    let orders = JSON.parse(localStorage.getItem("customerOrders")) || [];
    let box = document.getElementById("ordersBox");

    if (!orders.length) {
        box.innerHTML = "<p>No customer orders.</p>";
        return;
    }

    let html = "";
    orders.forEach(order => {
        html += `
            <div class="logEntry">
                <div class="timestamp">${order.timestamp}</div>
                <div><strong>Items:</strong></div>
                ${order.items.map(i => `
                    <div> - ${i.quantity}× ${i.name}${i.size ? " ("+i.size+")" : ""}</div>
                `).join("")}
                <div><strong>Subtotal:</strong> $${order.subtotal.toFixed(2)}</div>
                <div><strong>Discount:</strong> $${order.discount.toFixed(2)}</div>
                <div><strong>Total Paid:</strong> $${order.totalPaid.toFixed(2)}</div>
            </div>
        `;
    });

    box.innerHTML = html;
}

setInterval(displayLogs, 3000);
window.addEventListener("load", displayLogs);