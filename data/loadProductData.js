import { formatCurrency } from "../scripts/utils/money.js";

// console.log("loadProductData.js loaded");

export function getProduct(productId) {
  return products.find((p) => p.id === productId);
}

export class Product {
  constructor(productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
  }

  getStarsUrl() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }

  getPrice() {
    // console.log("getPrice for", this.name, "priceCents:", this.priceCents);
    return `€${formatCurrency(this.priceCents)}`;
  }

  extraInfoHTML() {
    return "";
  }
}

export class Clothing extends Product {
  constructor(productDetails) {
    super(productDetails);
    this.sizeChartLink = productDetails.sizeChartLink;
  }

  extraInfoHTML() {
    return `\n      <a href="${this.sizeChartLink}" target="_blank">\n        Size chart\n      </a>\n    `;
  }
}

export let products = [];

// callback-style loader removed — use `loadProductsFetch()`

export async function loadProductsFetch() {
  try {
    const res = await fetch("./backend/products.json");
    if (!res.ok) {
      throw new Error(`Failed to fetch products.json: ${res.status}`);
    }
    const data = await res.json();
    console.info("Loaded products from: ./backend/products.json");
    products = data.map((productDetails) => {
      if (productDetails.type === "clothing") {
        return new Clothing(productDetails);
      }
      return new Product(productDetails);
    });
  } catch (err) {
    console.error("Failed to load products:", err);
    throw err;
  }
}
