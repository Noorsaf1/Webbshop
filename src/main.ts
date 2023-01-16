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
    let totalPrice = 0;

    document.getElementById('cart-icon')?.addEventListener('click', function () {
        toggleCartList()
    });

    let cartContainer = document.querySelector('.cart-container');
    cartContainer.innerHTML = '';

    for (let item of cart) {

        totalItems += item.quantity;
        totalPrice += item.price * item.quantity;

        let itemHTML = `
        <div class="cart-item" id="cart-item${item.id}">
         <div class="img-div"> <img src="${item.image}" alt="${item.name}" class="cart-item__image"> </div>
          <div class="cart-item__details">
            <span id="item-name${item.id}" class="cart-item__name">${item.name}</span>
            <span class="cart-item__price">$${item.price.toFixed(2)}</span>
          <div class="quantity-div">
            <label for="quantity">Quantity:</label>
            <input type="number" id="quantity${item.id}" name="quantity" value="${item.quantity}" min="1"/>
            <button class="cart-item__update-btn" onclick="updateQuantity(event,${item.id})" > <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path d="M370.72 133.28C339.458 104.008 298.888 87.962 255.848 88c-77.458.068-144.328 53.178-162.791 126.85-1.344 5.363-6.122 9.15-11.651 9.15H24.103c-7.498 0-13.194-6.807-11.807-14.176C33.933 94.924 134.813 8 256 8c66.448 0 126.791 26.136 171.315 68.685L463.03 40.97C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.749zM32 296h134.059c21.382 0 32.09 25.851 16.971 40.971l-41.75 41.75c31.262 29.273 71.835 45.319 114.876 45.28 77.418-.07 144.315-53.144 162.787-126.849 1.344-5.363 6.122-9.15 11.651-9.15h57.304c7.498 0 13.194 6.807 11.807 14.176C478.067 417.076 377.187 504 256 504c-66.448 0-126.791-26.136-171.315-68.685L48.97 471.03C33.851 486.149 8 475.441 8 454.059V320c0-13.255 10.745-24 24-24z"/></svg> </button>
            </div>
            <button class="cart-item__remove-btn" onclick="removeItem(event,${item.id})"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"/></svg> </button>
        </div>
        </div>
      `;

        // append the itemHTML to the cart
        cartContainer.innerHTML += itemHTML;
    }

    cartContainer.innerHTML += '<div class="total"><span>Total: </span><span>$' + totalPrice + '</span></div>'

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