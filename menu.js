let selectedItem = '';
let selectedPrice = 0;
const popup = document.getElementById('popup');
const popupTitle = document.getElementById('popup-title');
const confirmAddBtn = document.getElementById('confirmAddBtn');

document.addEventListener('DOMContentLoaded', () => {
    if (confirmAddBtn) {
        confirmAddBtn.addEventListener('click', addToCartFromPopup);
    }
});

function openPopup(itemName) {
    selectedItem = itemName;

    const cards = document.querySelectorAll('.menu-card');
    let foundPrice = null;
    cards.forEach(card => {
        const titleEl = card.querySelector('h3');
        if (titleEl && titleEl.innerText.trim() === itemName) {
            const priceEl = card.querySelector('.price');
            if (priceEl) {
                const txt = priceEl.innerText.replace('$', '').trim();
                const p = parseFloat(txt);
                if (!isNaN(p)) foundPrice = p;
            }
        }
    });

    selectedPrice = foundPrice !== null ? foundPrice : 0;

    if (popupTitle) popupTitle.innerText = itemName;

    // reset size selection
    document.querySelectorAll("input[name='size']").forEach(r => r.checked = false);

    if (popup) popup.style.display = 'flex';
}

function closePopup() {
    if (popup) popup.style.display = 'none';
}

function addToCartFromPopup() {
    const sizeRadio = document.querySelector("input[name='size']:checked");
    if (!sizeRadio) {
        alert("Please select a size");
        return;
    }
    const size = sizeRadio.value;

    let price = selectedPrice;
    if (size === 'Large') price += 2.49;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const exist = cart.find(it => it.name === selectedItem && it.size === size);

    if (exist) {
        exist.quantity = (exist.quantity || 1) + 1;
    } else {
        cart.push({
            name: selectedItem,
            size: size,
            price: price,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(selectedItem + " (" + size + ") added to cart!");
    closePopup();
}
