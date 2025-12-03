let cart = JSON.parse(localStorage.getItem('cart')) || [];

function renderCart() {
    const list = document.getElementById('cartList');
    list.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)} <button onclick="removeFromCart(${index})">Remove</button>`;
        list.appendChild(li);
        total += item.price * item.quantity;
    });
    document.getElementById('cartTotal').textContent = total.toFixed(2);
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('cartTotal', total.toFixed(2));
}

function addToCart(name, price) {
    let existing = cart.find(item => item.name === name);
    if (existing) existing.quantity++;
    else cart.push({ name, price, quantity: 1 });
    renderCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    renderCart();
}

function goToCheckout() {
    window.location.href = 'checkout.html';
}

renderCart();