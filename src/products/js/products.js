class Cart {
  constructor(id, name, price, quantity, image) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.image = image;
  }

}

function addToCart(id, name, price, image) {
  let cartItem = new Cart(id, name, price, 1, image);


}