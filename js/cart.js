// Shopping Cart Functionality
document.addEventListener('DOMContentLoaded', function() {
    let cart = [];
    const cartItems = document.getElementById('cart-items');
    const cartTotalPrice = document.getElementById('cart-total-price');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    // Add to cart functionality
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const product = this.dataset.product;
            const price = parseFloat(this.dataset.price);
            
            // Check if product already exists in cart
            const existingItem = cart.find(item => item.product === product);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    product: product,
                    price: price,
                    quantity: 1
                });
            }
            
            updateCartDisplay();
        });
    });

    // Update cart display
    function updateCartDisplay() {
        if (!cartItems) return;
        
        cartItems.innerHTML = '';
        let total = 0;
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-info">
                    <div class="product-name">${item.product}</div>
                    <div class="product-price">₱${item.price.toFixed(2)}</div>
                    <div class="quantity-controls">
                        <button class="quantity-btn minus" data-product="${item.product}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn plus" data-product="${item.product}">+</button>
                    </div>
                </div>
                <div class="cart-item-total">
                    <span>₱${itemTotal.toFixed(2)}</span>
                    <button class="remove-item" data-product="${item.product}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            
            cartItems.appendChild(cartItem);
        });
        
        if (cartTotalPrice) {
            cartTotalPrice.textContent = `₱${total.toFixed(2)}`;
        }
    }

    // Cart item controls
    cartItems.addEventListener('click', function(e) {
        // Find the closest button element
        const button = e.target.closest('button');
        if (!button) return;

        const product = button.dataset.product;
        
        if (button.classList.contains('remove-item')) {
            cart = cart.filter(item => item.product !== product);
        } else if (button.classList.contains('quantity-btn')) {
            const item = cart.find(item => item.product === product);
            if (button.classList.contains('plus')) {
                item.quantity += 1;
            } else if (button.classList.contains('minus')) {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    cart = cart.filter(item => item.product !== product);
                }
            }
        }
        
        updateCartDisplay();
    });
}); 