document.addEventListener('DOMContentLoaded', () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;
    const summaryBox = document.getElementById('orderSummary');
    const cardInput = document.getElementById('cardNumber');
    const expInput = document.getElementById('expDate');
    const cvvInput = document.getElementById('cvv');
    const cardInfo = document.getElementById('cardInfoSection');
    const applePay = document.getElementById('applePayOption');
    let selectedPayment = null;

    function getPendingReward() {
        return JSON.parse(localStorage.getItem('pendingReward')) || null;
    }

    summaryBox.innerHTML = '';
    cart.forEach(item => {
        const p = document.createElement('p');
        p.innerHTML = `
            <span>${item.name}${item.size ? " (" + item.size + ")" : ""} x${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        `;
        summaryBox.appendChild(p);
        total += item.price * item.quantity;
    });

    const totalP = document.createElement('p');
    totalP.innerHTML = `<strong>Subtotal</strong><strong>$${total.toFixed(2)}</strong>`;
    summaryBox.appendChild(totalP);

    const pending = getPendingReward();
    let discount = 0;
    if (pending && pending.applied !== true) {
        discount = parseFloat(pending.discountAmount || 0);
        const discP = document.createElement('p');
        discP.innerHTML = `<strong>Reward Discount</strong><strong>-$${discount.toFixed(2)}</strong>`;
        summaryBox.appendChild(discP);
    }

    const finalTotalP = document.createElement('p');
    finalTotalP.innerHTML = `<strong>Total</strong><strong>$${Math.max(total - discount, 0).toFixed(2)}</strong>`;
    summaryBox.appendChild(finalTotalP);

    if (cardInput) {
        cardInput.addEventListener('input', function(){
            let value = this.value.replace(/\D/g, '').slice(0, 5);
            let formatted = "";
            if (value.length > 0) formatted = value.slice(0, 2);
            if (value.length >= 3) formatted += "-" + value.slice(2, 4);
            if (value.length === 5) formatted += "-" + value.slice(4);
            this.value = formatted;
        });
    }

    if (expInput) {
        expInput.addEventListener('input', function(){
            let value = this.value.replace(/\D/g,'').slice(0,4);
            if(value.length > 2) value = value.slice(0,2) + '/' + value.slice(2);
            this.value = value;
        });
    }

    if (cvvInput) {
        cvvInput.addEventListener('input', function(){
            this.value = this.value.replace(/\D/g,'').slice(0,3);
        });
    }

    function placeOrder() {
        const street = document.getElementById('street');
        const city = document.getElementById('city');
        const state = document.getElementById('state');
        const zip = document.getElementById('zip');

        let valid = true;
        [street, city, state, zip, cardInput, expInput, cvvInput].forEach(field => {
            if (field) field.classList.remove('invalid');
        });

        [street, city, state, zip].forEach(field => {
            if(field && field.value.trim() === '') {
                field.classList.add('invalid');
                valid = false;
            }
        });

        if(selectedPayment !== 'applePay'){
            if(cardInput && cardInput.value.length < 7) { cardInput.classList.add('invalid'); valid = false; }
            if(expInput && expInput.value.length < 5) { expInput.classList.add('invalid'); valid = false; }
            if(cvvInput && cvvInput.value.length < 3) { cvvInput.classList.add('invalid'); valid = false; }
        }

        if(!valid) return;

        const pendingReward = getPendingReward();
        const appliedReward = (pendingReward && pendingReward.applied !== true) ? pendingReward : null;
        const discountAmount = appliedReward ? parseFloat(appliedReward.discountAmount || 0) : 0;
        const totalPaid = Math.max(total - discountAmount, 0);

        const cartForConfirmation = {
            items: cart,
            subtotal: total,
            discount: discountAmount,
            totalPaid: totalPaid,
            appliedReward: appliedReward ? { name: appliedReward.name, cost: appliedReward.cost } : null,
            paymentMethod: selectedPayment
        };

        localStorage.setItem('cartForConfirmation', JSON.stringify(cartForConfirmation));
        localStorage.setItem('cartTotal', totalPaid.toFixed(2));
        localStorage.removeItem('cart');

        if (appliedReward) {
            appliedReward.applied = true;
            localStorage.setItem('pendingReward', JSON.stringify(appliedReward));
        }
        window.location.href = 'order-confirmation.html';
    }

    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) checkoutBtn.addEventListener('click', () => {
        selectedPayment = null; 
        placeOrder();
    });

    const paymentOptions = document.querySelectorAll('.payment-option');
    paymentOptions.forEach(option => {
        option.addEventListener('click', () => {
            paymentOptions.forEach(o => o.classList.remove('selected'));
            option.classList.add('selected');

            if(option === applePay){
                selectedPayment = 'applePay';
                cardInfo.style.display = "none";
                setTimeout(placeOrder, 1000); 
            } else {
                selectedPayment = option.id; 
                cardInfo.style.display = "block";
            }
        });
    });
});



