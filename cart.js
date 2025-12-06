let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price = 0, size = null) {
    let existingItem = cart.find(item => item.name === name && item.size === size);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price, quantity: 1, size });
    }

    saveCart();
    updateCart();
}
function addUpgrade() {
    let regularDrink = cart.find(item => item.name === "Drink" && (!item.size || item.size === "Regular"));
    if (regularDrink) {
        regularDrink.size = "Large";
        regularDrink.price += 2.79;
    } else {
        cart.push({ name: "Drink", size: "Large", price: 6.50 + 2.79, quantity: 1 });
    }
    saveCart();
    updateCart();
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCart() {
    const cartList = document.getElementById('cartList');
    const totalEl = document.getElementById('cartTotal');
    const search = document.getElementById('cartSearch').value.toLowerCase();

    cartList.innerHTML = '';
    let total = 0;

    cart
        .filter(item => item.name.toLowerCase().includes(search))
        .forEach((item, index) => {
            total += item.price * item.quantity;

            let li = document.createElement('li');
            li.classList.add('cart-item');
            li.innerHTML = `
                <span>${item.name}${item.size ? " (" + item.size + ")" : ""} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</span>
                <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
            `;
            cartList.appendChild(li);
        });

    totalEl.textContent = total.toFixed(2);
}

function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    updateCart();
}

document.getElementById('menuSearch').addEventListener('input', function () {
    const search = this.value.toLowerCase();
    document.querySelectorAll('.menu .menu-items .item').forEach(item => {
        item.style.display = item.textContent.toLowerCase().includes(search) ? 'flex' : 'none';
    });
});

document.getElementById('cartSearch').addEventListener('input', updateCart);

const menu = document.getElementById('menuSidebar');
const toggleBtn = document.getElementById('menuToggle');

toggleBtn.addEventListener('click', () => {
    menu.classList.toggle('open');

    if (menu.classList.contains('open')) {
        toggleBtn.classList.remove('closed');
        toggleBtn.textContent = '⮜';
    } else {
        toggleBtn.classList.add('closed');
        toggleBtn.textContent = '⮞';
    }
});
updateCart();


