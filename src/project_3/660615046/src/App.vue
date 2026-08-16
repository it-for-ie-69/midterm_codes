<script setup>
import { ref, computed } from "vue";

const products = ref([
  {
    id: 1,
    name: "MacBook Pro",
    price: 1999,
    category: "Electronics",
    emoji: "💻",
  },
  {
    id: 2,
    name: "AirPods Pro",
    price: 249,
    category: "Electronics",
    emoji: "🎧",
  },
  {
    id: 3,
    name: "Mechanical Keyboard",
    price: 150,
    category: "Accessories",
    emoji: "⌨️",
  },
  {
    id: 4,
    name: "Gaming Mouse",
    price: 80,
    category: "Accessories",
    emoji: "🖱️",
  },
  { id: 5, name: "Coffee Mug", price: 20, category: "Home", emoji: "☕" },
  { id: 6, name: "Desk Plant", price: 35, category: "Home", emoji: "🪴" },
  { id: 7, name: "Running Shoes", price: 120, category: "Sports", emoji: "👟" },
  {
    id: 8,
    name: "Smart Watch",
    price: 399,
    category: "Electronics",
    emoji: "⌚",
  },
]);

const cart = ref([]);
const searchQuery = ref("");

const filteredProducts = computed(() => {
  if (!searchQuery.value) return products.value;
  const query = searchQuery.value.toLowerCase();
  return products.value.filter(
    (product) =>
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query),
  );
});

const cartTotal = computed(() => {
  return cart.value.reduce((total, item) => total + item.price, 0);
});

const addToCart = (product) => {
  cart.value.push({ ...product, cartId: Date.now() + Math.random() });
};

const removeFromCart = (cartId) => {
  cart.value = cart.value.filter((item) => item.cartId !== cartId);
};

const checkout = () => {
  alert(`Checkout successful!`);
  cart.value = [];
};
</script>

<template>
  <div class="app-container">
    <header class="header glass-panel">
      <h1>🛍️ Vue Store</h1>
      <p>Premium tech & lifestyle products.</p>
    </header>

    <div class="layout">
      <main class="store-section">
        <div class="search-bar glass-panel">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search products by name or category..."
          />
        </div>

        <div
          v-if="filteredProducts.length === 0"
          class="empty-state glass-panel"
        >
          <h3>No products found</h3>
          <p>Try adjusting your search criteria.</p>
        </div>

        <div v-else class="product-grid">
          <div
            v-for="product in filteredProducts"
            :key="product.id"
            class="product-card glass-panel"
          >
            <div class="product-emoji">{{ product.emoji }}</div>
            <div class="product-info">
              <span class="category-badge">{{ product.category }}</span>
              <h3 class="product-name">{{ product.name }}</h3>
              <p class="product-price">${{ product.price }}</p>
            </div>
            <button @click="addToCart(product)" class="btn-primary">
              Add to Cart
            </button>
          </div>
        </div>
      </main>

      <aside class="cart-section">
        <div class="cart-card glass-panel">
          <h2>🛒 Shopping Cart</h2>

          <div v-if="cart.length === 0" class="empty-cart">
            Your cart is currently empty.
          </div>

          <div v-else>
            <ul class="cart-list">
              <li v-for="item in cart" :key="item.cartId" class="cart-item">
                <span class="cart-emoji">{{ item.emoji }}</span>
                <div class="cart-details">
                  <span class="cart-name">{{ item.name }}</span>
                  <span class="cart-price">${{ item.price }}</span>
                </div>
                <button
                  @click="removeFromCart(item.cartId)"
                  class="btn-icon"
                  title="Remove"
                >
                  ❌
                </button>
              </li>
            </ul>

            <div class="cart-summary">
              <div class="total-row">
                <span>Total:</span>
                <span class="total-price">${{ cartTotal }}</span>
              </div>
              <button @click="checkout" class="btn-checkout">Checkout</button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>
