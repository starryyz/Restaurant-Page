let cart = JSON.parse(localStorage.getItem('cart')) || [];
let total = 0;
const summaryBox = document.getElementById('orderSummary');
summaryBox.innerHTML = '';

cart.forEach(item => {
    const p = document.createElement('p');
    p.innerHTML = `
        <span>${item.name} x${item.quantity}</span>
        <span>$${(item.price * item.quantity).toFixed(2)}</span>
    `;
    summaryBox.appendChild(p);

    total += item.price * item.quantity;
});

const totalP = document.createElement('p');
totalP.innerHTML = `<strong>Total</strong><strong>$${total.toFixed(2)}</strong>`;
summaryBox.appendChild(totalP);

const cardInput = document.getElementById('cardNumber');
cardInput.addEventListener('input', function(){
    let value = this.value.replace(/\D/g,'').slice(0,5);
    let formatted = value;
    if(value.length > 2){
        formatted = value.slice(0,2) + '-' + value.slice(2,4);
        if(value.length === 5) formatted += '-' + value.slice(4);
    }
    this.value = formatted;
});

const expInput = document.getElementById('expDate');
expInput.addEventListener('input', function(){
    let value = this.value.replace(/\D/g,'').slice(0,4);
    if(value.length > 2){
        value = value.slice(0,2) + '/' + value.slice(2);
    }
    this.value = value;
});

const cvvInput = document.getElementById('cvv');
cvvInput.addEventListener('input', function(){
    this.value = this.value.replace(/\D/g,'').slice(0,3);
});

function placeOrder() {
    const street = document.getElementById('street');
    const city = document.getElementById('city');
    const state = document.getElementById('state');
    const zip = document.getElementById('zip');

    let valid = true;

    [street, city, state, zip, cardInput, expInput, cvvInput].forEach(field =>
        field.classList.remove('invalid')
    );

    [street, city, state, zip].forEach(field => {
        if(field.value.trim() === '') {
            field.classList.add('invalid');
            valid = false;
        }
    });

    if(cardInput.value.length < 7) { cardInput.classList.add('invalid'); valid = false; }
    if(expInput.value.length < 5) { expInput.classList.add('invalid'); valid = false; }
    if(cvvInput.value.length < 3) { cvvInput.classList.add('invalid'); valid = false; }

    if(!valid) return;

    localStorage.setItem('cartForConfirmation', JSON.stringify(cart));
    localStorage.setItem('cartTotal', total.toFixed(2));

    localStorage.removeItem('cart');

    window.location.href = 'order-confirmation.html';
}

document.querySelector('.checkout-btn').addEventListener('click', placeOrder);
