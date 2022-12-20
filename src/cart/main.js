let cart = [
  {
    id: 1,
    name: 'Item 1',
    price: 10,
    quantity: 1,
    image: 'item-1.jpg',
  },
  {
    id: 2,
    name: 'Item 2',
    price: 20,
    quantity: 5,
    image: 'item-2.jpg',
  },
];

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
          <button class="cart-item__update-btn" onclick="updateQuantity(${item.id})" > Update </button>
          <button class="cart-item__remove-btn" onclick="removeItem(${item.id})"> Remove </button>
      </div>
    `;

    // append the itemHTML to the cart
    cartContainer.innerHTML += itemHTML;
  }


}


function updateQuantity(itemId) {
  //event.preventDefault();
  // Update the item quantity and total price
  let itemName = document.querySelector('#item-name' + itemId);
  let itemQuantity = document.querySelector('#quantity' + itemId);

  alert(itemName.innerHTML + " : " + itemQuantity.value)

}

function removeItem(itemId) {
  // Remove the item from the cart
  let cartItem = document.querySelector('#cart-item' + itemId);
  cartItem.remove();
}



