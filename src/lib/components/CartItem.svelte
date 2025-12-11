<!-- src/lib/components/CartItem.svelte -->
<script>
  import { cart } from '$lib/stores/cart.svelte.js';

  let { item } = $props();

  function updateQuantity(newQuantity) {
    cart.updateQuantity(item.id, parseInt(newQuantity));
  }

  function removeFromCart() {
    if (confirm(`Remove ${item.name} from cart? 🥺`)) {
      cart.removeItem(item.id);
    }
  }
</script>

<div class="cart-item">
  <div class="item-image">
    <img src={item.image_url} alt={item.name} />
  </div>

  <div class="item-details">
    <h3>{item.name}</h3>
    <p class="item-size">Size: {item.size}</p>
    <p class="item-price">${item.price.toFixed(2)} each</p>
  </div>

  <div class="item-controls">
    <div class="quantity-control">
      <label for="quantity-{item.id}">Quantity:</label>
      <input
        id="quantity-{item.id}"
        type="number"
        min="1"
        max="99"
        value={item.quantity}
        oninput={(e) => updateQuantity(e.target.value)}
      />
    </div>

    <div class="item-subtotal">
      <strong>Subtotal:</strong>
      <span class="subtotal-amount">${(item.price * item.quantity).toFixed(2)}</span>
    </div>

    <button class="remove-btn" onclick={removeFromCart}>
      🗑️ Remove
    </button>
  </div>
</div>

<style>
  .cart-item {
    display: grid;
    grid-template-columns: 120px 1fr auto;
    gap: 1.5rem;
    padding: 1.5rem;
    background: #FFF8F0;
    border-radius: 16px;
    box-shadow: 0 2px 8px rgba(139, 69, 19, 0.1);
    align-items: center;
    border: 2px solid #F4A460;
  }

  .item-image {
    width: 120px;
    height: 120px;
    border-radius: 12px;
    overflow: hidden;
    background: #FFFACD;
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
    color: #4A3728;
    font-size: 1.25rem;
  }

  .item-size,
  .item-price {
    margin: 0.25rem 0;
    color: #8B7355;
    font-size: 0.875rem;
  }

  .item-price {
    color: #8B4513;
    font-weight: 600;
    font-size: 1rem;
  }

  .item-controls {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: flex-end;
  }

  .quantity-control {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .quantity-control label {
    font-size: 0.875rem;
    color: #6B5344;
  }

  .quantity-control input {
    width: 70px;
    padding: 0.5rem;
    border: 2px solid #D2691E;
    border-radius: 10px;
    font-size: 1rem;
    text-align: center;
    color: #4A3728;
  }

  .quantity-control input:focus {
    outline: none;
    border-color: #8B4513;
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
    color: #8B4513;
  }

  .remove-btn {
    background: transparent;
    color: #fc8181;
    border: 2px solid #fc8181;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }

  .remove-btn:hover {
    background: #fc8181;
    color: white;
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
