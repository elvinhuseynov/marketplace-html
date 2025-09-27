const products = [
  {
    id: 1,
    name: "Galaxy Watch",
    price: 399.99,
    description: "A smart watch for a smarter life.",
    image: "images/product1.jpg",
  },
  {
    id: 2,
    name: "Pixel Buds",
    price: 279.0,
    description: "High-quality audio, anywhere you go.",
    image: "images/product2.jpg",
  },
  {
    id: 3,
    name: "Chrono-Keyboard",
    price: 125.5,
    description: "Type through time with this keyboard.",
    image: "images/product3.jpg",
  },
];

let cart = JSON.parse(localStorage.getItem("cart") || "[]");
const cartCount = document.getElementById("cart-count");

const addToCart = (id) => {
  const product = products.find((product) => product.id === id);
  const existingProduct = cart.find((element) => element.id === product.id);
  if (existingProduct) return;

  cart.push(product);

  cartCount.textContent = cart.length;
  console.log(cart);
  localStorage.setItem("cart", JSON.stringify(cart));
};

const removeFromCart = (id) => {
  cart = cart.filter((product) => product.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  cartCount.textContent = cart.length;
  const cartContainer = document.getElementById("cart-items-container");
  const totalPrice = document.getElementById("total-price");
  let total = 0;
  cartContainer.innerHTML = ``;

  cart.forEach((product) => {
    total += product.price;
    cartCount.textContent = cart.length;
    const cartDiv = document.createElement("div");
    cartContainer.appendChild(cartDiv);
    cartDiv.className = "cart-item";

    cartDiv.innerHTML = `  <img src='${product.image}' alt="${product.description}">
                     <h3>${product.name}</h3>
                     <p class="cart-item-price">${product.price}</p>
                 </div>
                 <button class="remove-btn" onClick="removeFromCart(${product.id})">Remove</button>`;
  });
  totalPrice.textContent = `Total: $${total}`;
};

document.addEventListener("DOMContentLoaded", () => {
  const productContainer = document.getElementById("product-container");
  const cartContainer = document.getElementById("cart-items-container");

  const localProducts = JSON.parse(localStorage.getItem("cart")) ?? [];
  let total = 0;
  if (productContainer) {
    cartCount.textContent = localProducts.length;
    products.forEach((product) => {
      const productDiv = document.createElement("div");
      productContainer.appendChild(productDiv);
      productDiv.className = "product-card";
      productDiv.innerHTML = ` <img src="${product.image}" alt="${product.description}">
    <h2>${product.name}</h2>
    <p class="description">${product.description}</p>
     <p class="price">$${product.price}</p>
     <button onClick='addToCart(${product.id})' class="add-to-cart-btn">Add to Cart</button>`;
    });
  }
  if (cartContainer && !!localStorage.getItem("cart")) {
    const totalPrice = document.getElementById("total-price");
    localProducts.forEach((product) => {
      total += product.price;
      cartCount.textContent = localProducts.length;
      const cartDiv = document.createElement("div");
      cartContainer.appendChild(cartDiv);
      cartDiv.className = "cart-item";

      cartDiv.innerHTML = `  <img src='${product.image}' alt="${product.description}">
                     <h3>${product.name}</h3>
                     <p class="cart-item-price">${product.price}</p>
                 </div>
                 <button class="remove-btn" onClick="removeFromCart(${product.id})">Remove</button>`;
    });
    totalPrice.textContent = `Total: $${total}`;
  }
});
