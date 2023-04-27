// Select all the Add to Cart buttons
const addButtons = document.querySelectorAll('.add-to-cart');

// Initialize cart
let cart = [];

// Add click event listener to each Add to Cart button
addButtons.forEach(button => {
  button.addEventListener('click', addToCart);
});

// Function to add product to cart
function addToCart(event) {
  // Get the product details
  const product = event.target.parentElement;
  const name = product.querySelector('h2').innerText;
  const price = parseFloat(product.querySelector('.price').innerText.slice(1));
  const quantity = parseInt(product.querySelector('input[type="number"]').value);

  // Add the product to the cart array
  cart.push({
    name,
    price,
    quantity
  });

  // Update cart count
  const cartCount = document.querySelector('.cart');
  cartCount.innerText = `Cart (${cart.length})`;

  // Show success message
  alert(`${name} added to cart!`);
}

// Add click event listener to cart button
const cartButton = document.querySelector('.cart');
cartButton.addEventListener('click', showCart);

// Function to show cart
function showCart() {
  // Create cart HTML
  let cartHTML = '';
  cart.forEach(product => {
    cartHTML += `
      <div>
        <p>${product.name} - ${product.quantity} x $${product.price}</p>
        <button class="remove">Remove</button>
      </div>
    `;
  });
  if (cart.length === 0) {
    cartHTML = '<p>Your cart is empty</p>';
  }
  cartHTML += `
    <p>Total: $${calculateTotal()}</p>
    <button class="checkout">Checkout</button>
  `;

  // Create cart popup window
  const cartPopup = document.createElement('div');
  cartPopup.classList.add('cart-popup');
  cartPopup.innerHTML = cartHTML;

  // Add click event listener to Remove buttons
  const removeButtons = cartPopup.querySelectorAll('.remove');
  removeButtons.forEach(button => {
    button.addEventListener('click', removeFromCart);
  });

  // Add click event listener to Checkout button
  const checkoutButton = cartPopup.querySelector('.checkout');
  checkoutButton.addEventListener('click', checkout);

  // Add cart popup to page
  document.body.appendChild(cartPopup);
}

// Function to calculate cart total
function calculateTotal() {
  let total = 0;
  cart.forEach(product => {
    total += product.price * product.quantity;
  });
  return total.toFixed(2);
}

// Function to remove product from cart
function removeFromCart(event) {
  const product = event.target.parentElement;
  const name = product.querySelector('p').innerText.split(' - ')[0];
  cart = cart.filter(product => product.name !== name);
  product.remove();
  const cartCount = document.querySelector('.cart');
  cartCount.innerText = `Cart (${cart.length})`;
}

// Function to checkout
function checkout() {
  alert(`Thank you for your purchase! Your total is $${calculateTotal()}`);
  cart = [];
  const cartCount = document.querySelector('.cart');
  cartCount.innerText = `Cart (${cart.length})`;
  const cartPopup = document.querySelector('.cart-popup');
  cartPopup.remove();
}