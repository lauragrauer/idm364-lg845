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

  get total() {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  get itemCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

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

  removeItem(productId) {
    this.items = this.items.filter(item => item.id !== productId);
    this.saveToLocalStorage();
  }


  clearCart() {
    this.items = [];
    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('shopping_cart', JSON.stringify(this.items));
    }
  }
}

export const cart = new CartStore();
