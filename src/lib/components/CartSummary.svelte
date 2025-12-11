<!-- src/lib/components/CartSummary.svelte -->
<script>
  import { cart } from '$lib/stores/cart.svelte.js';
  import Button from './Button.svelte';

  let { onCheckout = () => {}, onClearCart = () => {} } = $props();

  function handleClearCart() {
    if (confirm('Clear all items from cart?')) {
      cart.clearCart();
      onClearCart();
    }
  }
</script>

<aside class="cart-summary">
  <h2>🧾 Order Summary</h2>
  
  <div class="summary-row">
    <span>Items ({cart.itemCount}):</span>
    <span>${cart.total.toFixed(2)}</span>
  </div>

  <div class="summary-row">
    <span>Shipping:</span>
    <span class="free-shipping">FREE 🎉</span>
  </div>

  <div class="summary-row total">
    <strong>Total:</strong>
    <strong class="total-amount">${cart.total.toFixed(2)}</strong>
  </div>

  <Button variant="primary" fullWidth onclick={onCheckout}>
    🛍️ Proceed to Checkout
  </Button>

  <a href="/" class="continue-link">← Continue Shopping</a>

  <Button variant="danger-outline" fullWidth onclick={handleClearCart}>
    🗑️ Clear Cart
  </Button>
</aside>

<style>
  .cart-summary {
    position: sticky;
    top: 100px;
    background: var(--bg-primary, #FFF8F0);
    padding: 2rem;
    border-radius: 20px;
    box-shadow: 0 4px 12px rgba(139, 69, 19, 0.15);
    border: 3px solid var(--primary-lighter, #F4A460);
  }

  .cart-summary h2 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: var(--text-primary, #4A3728);
  }

  .summary-row {
    display: flex;
    justify-content: space-between;
    padding: 0.75rem 0;
    color: #6B5344;
  }

  .free-shipping {
    color: #48bb78;
    font-weight: 600;
  }

  .summary-row.total {
    border-top: 2px dashed var(--border, #E8D5C4);
    margin-top: 1rem;
    padding-top: 1rem;
    font-size: 1.25rem;
  }

  .total-amount {
    color: var(--primary, #8B4513);
  }

  .continue-link {
    display: block;
    text-align: center;
    margin: 1rem 0;
    color: var(--primary, #8B4513);
    font-weight: 600;
    transition: transform 0.2s;
  }

  .continue-link:hover {
    transform: translateX(-5px);
  }

  @media (max-width: 968px) {
    .cart-summary {
      position: static;
    }
  }
</style>
