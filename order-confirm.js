document.addEventListener("DOMContentLoaded", () => {
    let timerDisplay = document.getElementById("countdownTimer");
    let orderItemsContainer = document.getElementById("orderItems");
    let orderTotalEl = document.getElementById("orderTotal");

    let order = JSON.parse(localStorage.getItem("cartForConfirmation"));

    if (!order) {
        orderItemsContainer.innerHTML = "<p>No order found.</p>";
        orderTotalEl.textContent = "";
        return;
    }
    order.items.forEach(item => {
        let div = document.createElement("div");
        div.className = "order-item";
        div.innerHTML = `
            <span>${item.name}${item.size ? " (" + item.size + ")" : ""} x${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        `;
        orderItemsContainer.appendChild(div);
    });

    let subtotalDiv = document.createElement("div");
    subtotalDiv.className = "order-item";
    subtotalDiv.innerHTML = `<span>Subtotal</span><span>$${order.subtotal.toFixed(2)}</span>`;
    orderItemsContainer.appendChild(subtotalDiv);

    if (order.discount > 0) {
        let discountDiv = document.createElement("div");
        discountDiv.className = "order-item";
        discountDiv.innerHTML = `<span>Discount</span><span>-$${order.discount.toFixed(2)}</span>`;
        orderItemsContainer.appendChild(discountDiv);
    }

    let totalDiv = document.createElement("div");
    totalDiv.className = "total";
    totalDiv.innerHTML = `Total Paid: $${order.totalPaid.toFixed(2)}`;
    orderTotalEl.appendChild(totalDiv);

     function saveOrderToLogs(order) {
        let logs = JSON.parse(localStorage.getItem("systemLogs")) || [];

        logs.push({
            timestamp: new Date().toLocaleString(),
            activity: `New Order Placed | Total: $${order.totalPaid.toFixed(2)} | Items: ${order.items.length}`
        });

        localStorage.setItem("systemLogs", JSON.stringify(logs));
    }

    function saveOrderToOrders(order) {
        let allOrders = JSON.parse(localStorage.getItem("customerOrders")) || [];

        let orderEntry = {
            id: Date.now(),
            timestamp: new Date().toLocaleString(),
            items: order.items,
            subtotal: order.subtotal,
            discount: order.discount,
            totalPaid: order.totalPaid
        };

        allOrders.push(orderEntry);
        localStorage.setItem("customerOrders", JSON.stringify(allOrders));
    }

    saveOrderToLogs(order);
    saveOrderToOrders(order);

    localStorage.removeItem("cartForConfirmation");
    localStorage.removeItem("cartTotal");

    let countdownTime = 15 * 60;
    let timerInterval = setInterval(() => {
        let minutes = Math.floor(countdownTime / 60);
        let seconds = countdownTime % 60;
        timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2,"0")}`;

        if (countdownTime <= 0) {
            clearInterval(timerInterval);
            timerDisplay.textContent = "Ready!";
        } else {
            countdownTime--;
        }
    }, 1000);
});












