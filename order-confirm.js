document.addEventListener("DOMContentLoaded", () => {
    const timerDisplay = document.getElementById("countdownTimer");
    const orderItemsContainer = document.getElementById("orderItems");
    const orderTotalEl = document.getElementById("orderTotal");

    const order = JSON.parse(localStorage.getItem("cartForConfirmation"));

    if (!order) {
        orderItemsContainer.innerHTML = "<p>No order found.</p>";
        orderTotalEl.textContent = "";
        return;
    }
    order.items.forEach(item => {
        const div = document.createElement("div");
        div.className = "order-item";
        div.innerHTML = `
            <span>${item.name}${item.size ? " (" + item.size + ")" : ""} x${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        `;
        orderItemsContainer.appendChild(div);
    });

    const subtotalDiv = document.createElement("div");
    subtotalDiv.className = "order-item";
    subtotalDiv.innerHTML = `<span>Subtotal</span><span>$${order.subtotal.toFixed(2)}</span>`;
    orderItemsContainer.appendChild(subtotalDiv);

    if (order.discount > 0) {
        const discountDiv = document.createElement("div");
        discountDiv.className = "order-item";
        discountDiv.innerHTML = `<span>Discount</span><span>-$${order.discount.toFixed(2)}</span>`;
        orderItemsContainer.appendChild(discountDiv);
    }

    const totalDiv = document.createElement("div");
    totalDiv.className = "total";
    totalDiv.innerHTML = `Total Paid: $${order.totalPaid.toFixed(2)}`;
    orderTotalEl.appendChild(totalDiv);

    localStorage.removeItem("cartForConfirmation");
    localStorage.removeItem("cartTotal");

    let countdownTime = 15 * 60;
    const timerInterval = setInterval(() => {
        const minutes = Math.floor(countdownTime / 60);
        const seconds = countdownTime % 60;
        timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2,"0")}`;

        if (countdownTime <= 0) {
            clearInterval(timerInterval);
            timerDisplay.textContent = "Ready!";
        } else {
            countdownTime--;
        }
    }, 1000);
});












