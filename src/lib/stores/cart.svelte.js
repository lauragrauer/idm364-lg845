// src/lib/stores/cart.svelte.js

/**
 * Shopping Cart Store
 * Uses Svelte 5 runes for reactive state management
 * Persists cart data to localStorage
 */

// Initialize cart from localStorage if available
function getInitialCart() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('shopping_cart');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Error parsing cart from localStorage:', e);
      }
    }
  }
  return [];
}

class CartStore {
  items = $state(getInitialCart());

  // Computed properties using $derived
  get total() {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  get itemCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  // Add item to cart
  addItem(product, quantity = 1) {
    const existingItem = this.items.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image_url: product.image_url,
        size: product.size,
        quantity: quantity
      });
    }
    
    this.saveToLocalStorage();
  }

  // Update item quantity
  updateQuantity(productId, quantity) {
    const item = this.items.find(item => item.id === productId);
    if (item) {
      if (quantity <= 0) {
        this.removeItem(productId);
      } else {
        item.quantity = quantity;
        this.saveToLocalStorage();
      }
    }
  }

  // Remove item from cart
  removeItem(productId) {
    this.items = this.items.filter(item => item.id !== productId);
    this.saveToLocalStorage();
  }

  // Clear entire cart
  clearCart() {
    this.items = [];
    this.saveToLocalStorage();
  }

  // Save to localStorage
  saveToLocalStorage() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('shopping_cart', JSON.stringify(this.items));
    }
  }
}

// Export singleton instance
export const cart = new CartStore();
