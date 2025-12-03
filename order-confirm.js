// Retrieve cart and total from localStorage
const cart = JSON.parse(localStorage.getItem('cartForConfirmation')) || [];
const orderItemsContainer = document.getElementById('orderItems');
let total = 0;

cart.forEach(item => {
    const div = document.createElement('div');
    div.className = 'order-item';
    div.innerHTML = `<span>${item.name} x${item.quantity}</span><span>$${(item.price * item.quantity).toFixed(2)}</span>`;
    orderItemsContainer.appendChild(div);
    total += item.price * item.quantity;
});

// Display total
document.getElementById('orderTotal').textContent = `Total Paid: $${total.toFixed(2)}`;

// Clear confirmation storage
localStorage.removeItem('cartForConfirmation');
localStorage.removeItem('cartTotal');
