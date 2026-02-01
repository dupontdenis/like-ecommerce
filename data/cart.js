export let cart;

loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem("cart"));

  if (!cart) {
    // start with an empty cart when nothing is saved in storage
    cart = [];
  }
}

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  // determine quantity to add by looking for the product's quantity <select>
  let qtyToAdd = 1;

  // try to read quantity from DOM
  try {
    const addButton = document.querySelector(
      `[data-product-id="${productId}"]`,
    );
    if (addButton) {
      const container = addButton.closest(".product-container");
      const select = container ? container.querySelector("select") : null;
      if (select) {
        const parsed = parseInt(select.value, 10);
        if (!Number.isNaN(parsed) && parsed > 0) qtyToAdd = parsed;
      }
    }
  } catch (e) {
    // DOM might not be available in some contexts; fall back to 1
    console.error("Could not read quantity select for product", productId, e);
  }

  if (matchingItem) {
    matchingItem.quantity += qtyToAdd;
  } else {
    cart.push({
      productId: productId,
      quantity: qtyToAdd,
      deliveryOptionId: "1",
    });
  }

  saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}

<<<<<<< HEAD
// loadCart removed: cart is persisted in localStorage and initialized
// via `loadFromStorage()` at module load time. If code paths still
// expect `loadCart(callback)`, update callers to rely on `cart` directly
// or await any product data loading before rendering.
=======
export function loadCart(fun) {
  (async () => {
    try {
      const res = await fetch("./data/cart.json");
      if (!res.ok) {
        throw new Error(`Network response was not ok: ${res.status}`);
      }
      const body = await res.text();
      console.log(body);
      if (typeof fun === "function") fun();
    } catch (err) {
      console.error("Failed to load cart:", err);
    }
  })();
}
>>>>>>> e76ee8ab7610c90d65321dc830fa7ff12181e473
