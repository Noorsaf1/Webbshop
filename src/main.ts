//import { Cart } from "./class.js";
///import bilder from './bilder/*';


class Cart {
    id: number
    name: string
    price: number
    quantity: number
    image: string

    constructor(id: number, name: string, price: number, quantity: number, image: string) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.image = image;
    }

}





let cart: Cart[] = [];


let cartInStorage: string | null = localStorage.getItem('cart')

if (cartInStorage === null) {
    cartInStorage = ''
}

cart = JSON.parse(cartInStorage).map((cartItem: Cart) => {
    return new Cart(
        cartItem.id,
        cartItem.name,
        cartItem.price,
        cartItem.quantity,
        cartItem.image);
});

function loadjs() {

    loadNav();

    loadCart();

}


function loadCart() {

    let totalItems = 0;

    document.getElementById('cart-icon')?.addEventListener('click', function () {
        toggleCartList()
    });

    let cartContainer = document.querySelector('.cart-container');
    cartContainer.innerHTML = '';

    for (let item of cart) {

        totalItems += item.quantity;

        let itemHTML = `
        <div class="cart-item" id="cart-item${item.id}">
          <img src="../bilder/${item.image}" alt="${item.name}" class="cart-item__image">
          <div class="cart-item__details">
            <span id="item-name${item.id}" class="cart-item__name">${item.name}</span>
            <span class="cart-item__price">$${item.price.toFixed(2)}</span>
          </div>
            <label for="quantity">Quantity:</label>
            <input type="number" id="quantity${item.id}" name="quantity" value="${item.quantity}" />
            <button class="cart-item__update-btn" onclick="updateQuantity(event,${item.id})" > Update </button>
            <button class="cart-item__remove-btn" onclick="removeItem(event,${item.id})"> Remove </button>
        </div>
      `;

        // append the itemHTML to the cart
        cartContainer.innerHTML += itemHTML;
    }

    document.querySelector(".cart__total").innerHTML = totalItems;
}

function updateQuantity(event: any, itemId: number) {
    event.preventDefault();
    // Update the item quantity and total price
    cart.find(x => x.id == itemId).quantity = parseInt(document.querySelector('#quantity' + itemId).value);
    updateStorage();
    loadCart();

}

function updateStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function removeItem(event: any, itemId: number) {
    event.preventDefault();
    // Remove the item from the cart
    let cartItem = document.querySelector('#cart-item' + itemId);
    cartItem.remove();

    let index = cart.findIndex(x => x.id == itemId);
    cart.splice(index, 1);
    updateStorage();
    loadCart();
}


function addToCart(id: number, name: string, price: number, image: string) {

    let isInCart = cart.find(x => x.id == id);

    if (isInCart == undefined) {
        let newItem = new Cart(id, name, price, 1, image);
        cart.push(newItem);
    }
    else {
        isInCart.quantity += 1;
    }

    updateStorage();
    loadCart();
}


function toggleCartList() {
    document.getElementById('cart-list')?.classList.toggle("cart-list-view");
}


// document.addEventListener('DOMContentLoaded', loadNav(), false);
// window.onload = "loadNav()";

function loadNav() {

    const navOpen = document.querySelector(".nav__hamburger");
    const navClose = document.querySelector(".close__toggle");
    const menu = document.querySelector(".nav__menu");
    const navContainer = document.querySelector(".nav__menu");

    navOpen.addEventListener("click", () => {
        menu.classList.add("open");
        document.body.classList.add("active");
        navContainer.style.left = "0";
        navContainer.style.width = "30rem";
    });

    navClose.addEventListener("click", () => {
        menu.classList.remove("open");
        document.body.classList.remove("active");
        navContainer.style.left = "-30rem";
        navContainer.style.width = "0";
    });

}