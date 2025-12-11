<script>
  import { cart } from '$lib/stores/cart.svelte.js';
  import QuantityInput from './QuantityInput.svelte';
  import Button from './Button.svelte';
  import Notification from './Notification.svelte';

  let { item } = $props();

  let show_notification = $state(false);
  let notification_message = $state('');

  let item_total = $derived(item.price * item.quantity);

  function update_quantity(new_quantity) {
    cart.updateQuantity(item.id, new_quantity);
  }

  function remove_item() {
    const item_name = item.name;
    cart.removeItem(item.id);
    notification_message = `${item_name} removed from cart`;
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

<div class="cart-item">
  <img src={item.image} alt={item.name} class="item-image" />
  
  <div class="item-details">
    <h3>{item.name}</h3>
    <p class="item-price">${item.price.toFixed(2)} each</p>
  </div>

  <div class="item-quantity">
    <QuantityInput 
      value={item.quantity}
      min={1}
      max={10}
      label="Item quantity"
      onchange={update_quantity}
    />
  </div>

  <div class="item-total">
    <span class="total-label">Total:</span>
    <span class="total-amount">${item_total.toFixed(2)}</span>
  </div>

  <Button variant="danger-outline" size="small" onclick={remove_item}>
    Remove
  </Button>
</div>

<style>
  .cart-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-lg);
    padding: var(--spacing-lg);
    background: var(--color-bg-card);
    border-radius: var(--radius-lg);
    border: 2px solid var(--color-primary-lighter);
  }

  .item-image {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: var(--radius-md);
  }

  .item-details {
    flex: 1;
  }

  .item-details h3 {
    font-size: var(--font-size-lg);
    margin-bottom: var(--spacing-xs);
  }

  .item-price {
    color: var(--color-text-muted);
    font-size: var(--font-size-md);
  }

  .item-total {
    text-align: right;
  }

  .total-label {
    display: block;
    font-size: var(--font-size-sm);
    color: var(--color-text-muted);
  }

  .total-amount {
    font-size: var(--font-size-xl);
    font-weight: bold;
    color: var(--color-primary);
  }

  @media (max-width: 768px) {
    .cart-item {
      flex-wrap: wrap;
    }

    .item-image {
      width: 80px;
      height: 80px;
    }

    .item-details {
      flex: 1 1 calc(100% - 100px);
    }

    .item-quantity,
    .item-total {
      flex: 1;
    }
  }
</style>
