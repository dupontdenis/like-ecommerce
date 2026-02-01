import { renderOrderSummary } from "./checkout/orderSummary.js";
import { loadProductsFetch } from "../data/loadProductData.js";
import { cart } from "../data/cart.js";

async function loadPage() {
  try {
    // throw 'error1';

    await loadProductsFetch();

    // cart is initialized from localStorage by the module; wait for products only
    await loadProductsFetch();
    const value = "ok";
  } catch (error) {
    console.log("Unexpected error. Please try again later.");
  }
  // update header cart quantity if present
  try {
    const el = document.querySelector(".js-cart-quantity");
    if (el) {
      const qty = cart.reduce((sum, item) => sum + item.quantity, 0);
      el.innerHTML = qty;
    }
  } catch (e) {
    // ignore DOM errors
  }

  renderOrderSummary();
}
loadPage();
