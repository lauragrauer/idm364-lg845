<!-- src/lib/components/CartItem.svelte -->
<script>
  import { cart } from '$lib/stores/cart.svelte.js';
  import QuantityInput from './QuantityInput.svelte';
  import Button from './Button.svelte';

  let { item } = $props();

  function updateQuantity(newQuantity) {
    cart.updateQuantity(item.id, newQuantity);
  }

  function removeFromCart() {
    if (confirm(`Remove ${item.name} from cart? 🥺`)) {
      cart.removeItem(item.id);
    }
  }
</script>

<article class="cart-item">
  <div class="item-image">
    <img src={item.image_url} alt={item.name} />
  </div>

  <div class="item-details">
    <h3>{item.name}</h3>
    <p class="item-size">Size: {item.size}</p>
    <p class="item-price">${item.price.toFixed(2)} each</p>
  </div>

  <div class="item-controls">
    <QuantityInput
      id="quantity-{item.id}"
      value={item.quantity}
      onchange={updateQuantity}
    />

    <div class="item-subtotal">
      <strong>Subtotal:</strong>
      <span class="subtotal-amount">${(item.price * item.quantity).toFixed(2)}</span>
    </div>

    <Button variant="danger-outline" size="small" onclick={removeFromCart}>
      🗑️ Remove
    </Button>
  </div>
</article>

<style>
  .cart-item {
    display: grid;
    grid-template-columns: 120px 1fr auto;
    gap: 1.5rem;
    padding: 1.5rem;
    background: var(--bg-primary, #FFF8F0);
    border-radius: 16px;
    box-shadow: 0 2px 8px rgba(139, 69, 19, 0.1);
    align-items: center;
    border: 2px solid var(--primary-lighter, #F4A460);
  }

  .item-image {
    width: 120px;
    height: 120px;
    border-radius: 12px;
    overflow: hidden;
    background: var(--secondary, #FFFACD);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .item-image img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 0.5rem;
  }

  .item-details h3 {
    margin: 0 0 0.5rem 0;
    color: var(--text-primary, #4A3728);
    font-size: 1.25rem;
  }

  .item-size,
  .item-price {
    margin: 0.25rem 0;
    color: var(--text-secondary, #8B7355);
    font-size: 0.875rem;
  }

  .item-price {
    color: var(--primary, #8B4513);
    font-weight: 600;
    font-size: 1rem;
  }

  .item-controls {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: flex-end;
  }

  .item-subtotal {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.25rem;
  }

  .item-subtotal strong {
    font-size: 0.875rem;
    color: #6B5344;
  }

  .subtotal-amount {
    font-size: 1.25rem;
    font-weight: bold;
    color: var(--primary, #8B4513);
  }

  @media (max-width: 768px) {
    .cart-item {
      grid-template-columns: 80px 1fr;
      gap: 1rem;
    }

    .item-image {
      width: 80px;
      height: 80px;
    }

    .item-controls {
      grid-column: 1 / -1;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }

    .item-subtotal {
      align-items: center;
    }
  }
</style>
