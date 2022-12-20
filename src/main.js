function addToCart() {
    // Add the item to the cart
    // Update the cart total
}
const addToCartBtn = document.getElementById('add-to-cart-btn');
addToCartBtn.addEventListener('click', addToCart);
function addToCart() {
    // Add the item to the cart
    const cartTotal = document.getElementById('cart-total');
    cartTotal.innerHTML = (parseInt(cartTotal.innerHTML) + 1).toString();
}
