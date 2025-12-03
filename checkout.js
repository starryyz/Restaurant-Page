// Retrieve cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let total = 0;
const summaryBox = document.getElementById('orderSummary');
summaryBox.innerHTML = '';

// Populate order summary
cart.forEach(item => {
    const p = document.createElement('p');
    p.innerHTML = `<span>${item.name} x${item.quantity}</span><span>$${(item.price * item.quantity).toFixed(2)}</span>`;
    summaryBox.appendChild(p);
    total += item.price * item.quantity;
});

const totalP = document.createElement('p');
totalP.innerHTML = `<strong>Total</strong><strong>$${total.toFixed(2)}</strong>`;
summaryBox.appendChild(totalP);

// Function called when user clicks "Place Order"
function placeOrder() {
    // Validate card number
    const cardInput = document.querySelector('input[placeholder="xxxx xxxx xxxx xxxx"]').value.trim();
    if (cardInput === '' || !/^\d{5}$/.test(cardInput.replace(/\s+/g, ''))) {
        alert('Please enter a valid 5-digit card number.');
        return;
    }

    // Store cart and total in localStorage for confirmation page
    localStorage.setItem('cartForConfirmation', JSON.stringify(cart));
    localStorage.setItem('cartTotal', total.toFixed(2));

    // Clear cart for next order
    localStorage.removeItem('cart');

    // Redirect to confirmation page
    window.location.href = 'order-confirmation.html';
}

// Attach event listener to button
document.querySelector('.checkout-btn').addEventListener('click', placeOrder);


