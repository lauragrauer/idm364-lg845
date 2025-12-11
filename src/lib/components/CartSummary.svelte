<!-- src/lib/components/CartSummary.svelte -->
<script>
  import { cart } from '$lib/stores/cart.svelte.js';
  import Button from './Button.svelte';
  import Notification from './Notification.svelte';

  let show_notification = $state(false);
  let notification_message = $state('');

  function clear_cart() {
    cart.clearCart();
    notification_message = 'Cart cleared!';
    show_notification = true;
  }

  function close_notification() {
    show_notification = false;
  }
</script>

<Notification 
  message={notification_message} 
  visible={show_notification} 
  onclose={close_notification} 
/>

<div class="cart-summary">
  <h2>Order Summary</h2>
  
  <div class="summary-row">
    <span>Subtotal ({cart.itemCount} items)</span>
    <span>${cart.total.toFixed(2)}</span>
  </div>
  
  <div class="summary-row">
    <span>Shipping</span>
    <span class="free-shipping">FREE</span>
  </div>
  
  <div class="summary-row total-row">
    <span>Total</span>
    <span class="grand-total">${cart.total.toFixed(2)}</span>
  </div>

  <Button variant="success" full_width={true} size="large">
    Checkout
  </Button>

  <Button variant="danger-outline" full_width={true} onclick={clear_cart}>
    Clear Cart
  </Button>
</div>

<style>
  .cart-summary {
    background: var(--color-bg-card);
    padding: var(--spacing-xl);
    border-radius: var(--radius-xl);
    border: 2px solid var(--color-primary-lighter);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }

  h2 {
    font-size: var(--font-size-xl);
    padding-bottom: var(--spacing-md);
    border-bottom: 2px solid var(--color-border);
  }

  .summary-row {
    display: flex;
    justify-content: space-between;
    font-size: var(--font-size-md);
  }

  .free-shipping {
    color: var(--color-success);
    font-weight: 600;
  }

  .total-row {
    padding-top: var(--spacing-md);
    border-top: 2px solid var(--color-border);
    font-weight: bold;
  }

  .grand-total {
    font-size: var(--font-size-xl);
    color: var(--color-primary);
  }
</style>
