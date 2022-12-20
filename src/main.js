// import { Cart } from "./class.js";

class Cart {
    constructor(id, name, price, quantity, image) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.image = image;
    }

}

let cart = [];

cart = JSON.parse(localStorage.getItem('cart')).map((cartItem) => {
    return new Cart(
        cartItem.id,
        cartItem.name,
        cartItem.price,
        cartItem.quantity,
        cartItem.image);
});

function loadCart() {


    let cartContainer = document.querySelector('.cart-container');

    for (let item of cart) {

        let itemHTML = `
        <div class="cart-item" id="cart-item${item.id}">
          <img src="${item.image}" alt="${item.name}" class="cart-item__image">
          <div class="cart-item__details">
            <span id="item-name${item.id}" class="cart-item__name">${item.name}</span>
            <span class="cart-item__price">$${item.price.toFixed(2)}</span>
          </div>
            <label for="quantity">Quantity:</label>
            <input type="number" id="quantity${item.id}" name="quantity" value="${item.quantity}" />
            <button class="cart-item__update-btn" onclick="updateQuantity(event,${item.id})" > Update </button>
            <button class="cart-item__remove-btn" onclick="removeItem(${item.id})"> Remove </button>
        </div>
      `;

        // append the itemHTML to the cart
        cartContainer.innerHTML += itemHTML;
    }


}


function updateQuantity(event, itemId) {
    event.preventDefault();
    // Update the item quantity and total price
    cart.find(x => x.id == itemId).quantity = parseInt(document.querySelector('#quantity' + itemId).value);
    updateStorage();

}

function updateStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function removeItem(itemId) {
    // Remove the item from the cart
    let cartItem = document.querySelector('#cart-item' + itemId);
    cartItem.remove();

    let index = cart.findIndex(x => x.id == itemId);
    cart.splice(index, 1);
    updateStorage();
}


function addToCart(id, name, price, image) {

    let newItem = new Cart(id, name, price, 1, image);
    cart.push(newItem);
    updateStorage();
}

