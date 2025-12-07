// cart.js (updated)
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

function formatMoney(n) {
    return `$${n.toFixed(2)}`;
}

function getPendingReward() {
    return JSON.parse(localStorage.getItem("pendingReward")) || null;
}

function clearPendingReward() {
    localStorage.removeItem("pendingReward");
    // keep redeemedRewards history intact
}

function updateCart() {
    const cartList = document.getElementById('cartList');
    const totalEl = document.getElementById('cartTotal');
    const searchEl = document.getElementById('cartSearch');
    const search = (searchEl && searchEl.value ? searchEl.value.toLowerCase() : '');

    if (!cartList || !totalEl) return;

    cartList.innerHTML = '';
    let subtotal = 0;

    cart
        .filter(item => item.name.toLowerCase().includes(search))
        .forEach((item, index) => {
            subtotal += item.price * item.quantity;

            let li = document.createElement('li');
            li.classList.add('cart-item');
            li.innerHTML = `
                <span>${item.name}${item.size ? " (" + item.size + ")" : ""} x${item.quantity} - ${formatMoney(item.price * item.quantity)}</span>
                <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
            `;
            cartList.appendChild(li);
        });

    // Apply pending reward if exists
    const pending = getPendingReward();
    let discount = 0;
    if (pending && pending.applied !== true) {
        discount = parseFloat(pending.discountAmount || 0);
    }

    let total = Math.max(subtotal - discount, 0);
    totalEl.textContent = total.toFixed(2);

    // Show reward summary in cart UI (optional element #rewardSummary)
    const rewardSummary = document.getElementById('rewardSummary');
    if (rewardSummary) {
        if (pending && pending.applied !== true) {
            rewardSummary.innerHTML = `
                <div class="applied-reward">
                    <strong>Pending Reward:</strong> ${pending.name} — ${formatMoney(discount)} off
                    <button id="removeRewardBtn">Remove</button>
                </div>
            `;
            document.getElementById('removeRewardBtn').addEventListener('click', () => {
                clearPendingReward();
                updateCart();
            });
        } else {
            rewardSummary.innerHTML = '';
        }
    }

    // ensure cart counter uses menu's function or local update
    const cartCounter = document.getElementById('cartCounter');
    if (cartCounter) {
        const count = cart.reduce((s, it) => s + (it.quantity || 0), 0);
        cartCounter.innerText = count;
    }
}

function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    updateCart();
}

document.addEventListener('DOMContentLoaded', () => {
    const menuSearch = document.getElementById('menuSearch');
    if (menuSearch) {
        menuSearch.addEventListener('input', function () {
            const search = this.value.toLowerCase();
            document.querySelectorAll('.menu .menu-items .item').forEach(item => {
                item.style.display = item.textContent.toLowerCase().includes(search) ? 'flex' : 'none';
            });
        });
    }

    const cartSearch = document.getElementById('cartSearch');
    if (cartSearch) cartSearch.addEventListener('input', updateCart);

    const menu = document.getElementById('menuSidebar');
    const toggleBtn = document.getElementById('menuToggle');
    if (toggleBtn && menu) {
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
    }

    // When cart page loads, update cart and show pending reward if any
    updateCart();
});


