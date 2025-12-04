const cart = JSON.parse(localStorage.getItem('cartForConfirmation')) || [];
const orderItemsContainer = document.getElementById('orderItems');

let total = 0;

cart.forEach(item => {
    const div = document.createElement('div');
    div.className = 'order-item';
    div.innerHTML = `
        <span>${item.name} x${item.quantity}</span>
        <span>$${(item.price * item.quantity).toFixed(2)}</span>
    `;
    orderItemsContainer.appendChild(div);

    total += item.price * item.quantity;
});

document.getElementById('orderTotal').textContent =
    `Total Paid: $${total.toFixed(2)}`;

localStorage.removeItem('cartForConfirmation');
localStorage.removeItem('cartTotal');

let countdownTime = 15 * 60;
const timerDisplay = document.getElementById("countdownTimer");

function updateTimer() {
    let minutes = Math.floor(countdownTime / 60);
    let seconds = countdownTime % 60;

    timerDisplay.textContent =
        `${minutes}:${seconds.toString().padStart(2, "0")}`;

    if (countdownTime > 0) {
        countdownTime--;
    } else {
        clearInterval(timerInterval);
        timerDisplay.textContent = "Expired";
    }
}

const timerInterval = setInterval(updateTimer, 1000);
updateTimer();








