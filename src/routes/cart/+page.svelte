<!-- src/routes/cart/+page.svelte -->
<script>
  import { cart } from '$lib/stores/cart.svelte.js';
  import CartItem from '$lib/components/CartItem.svelte';
</script>

<svelte:head>
  <title>Shopping Cart - Rilakkuma Shop</title>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
</svelte:head>

<div class="page">
  <div class="container">
    <h1>🛒 Shopping Cart</h1>

    {#if cart.items.length === 0}
      <div class="empty-cart">
        <div class="empty-icon">🧸</div>
        <h2>Your cart is empty</h2>
        <p>Add some adorable plushies to get started!</p>
        <a href="/" class="continue-shopping">Continue Shopping</a>
      </div>
    {:else}
      <div class="cart-layout">
        <div class="cart-items">
          {#each cart.items as item (item.id)}
            <CartItem {item} />
          {/each}
        </div>

        <div class="cart-summary">
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

          <button class="checkout-btn">
            🛍️ Proceed to Checkout
          </button>

          <a href="/" class="continue-link">← Continue Shopping</a>

          <button class="clear-cart-btn" onclick={() => {
            if (confirm('Clear all items from cart?')) {
              cart.clearCart();
            }
          }}>
            🗑️ Clear Cart
          </button>
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  .page {
    padding: 2rem 0;
    min-height: calc(100vh - 200px);
    font-family: 'Nunito', sans-serif;
  }

  h1 {
    font-size: 2.5rem;
    color: #4A3728;
    margin-bottom: 2rem;
  }

  .empty-cart {
    text-align: center;
    padding: 4rem 2rem;
    background: #FFF8F0;
    border-radius: 20px;
    border: 3px dashed #F4A460;
  }

  .empty-icon {
    font-size: 6rem;
    margin-bottom: 1rem;
  }

  .empty-cart h2 {
    color: #4A3728;
    margin-bottom: 0.5rem;
  }

  .empty-cart p {
    color: #8B7355;
    margin-bottom: 2rem;
  }

  .continue-shopping {
    display: inline-block;
    padding: 1rem 2rem;
    background: #614632;
    color: white;
    border-radius: 30px;
    font-weight: 600;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .continue-shopping:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(139, 69, 19, 0.4);
  }

  .cart-layout {
    display: grid;
    grid-template-columns: 1fr 400px;
    gap: 2rem;
    align-items: start;
  }

  .cart-items {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .cart-summary {
    position: sticky;
    top: 100px;
    background: #FFF8F0;
    padding: 2rem;
    border-radius: 20px;
    box-shadow: 0 4px 12px rgba(139, 69, 19, 0.15);
    border: 3px solid #F4A460;
  }

  .cart-summary h2 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: #4A3728;
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
    border-top: 2px dashed #E8D5C4;
    margin-top: 1rem;
    padding-top: 1rem;
    font-size: 1.25rem;
  }

  .total-amount {
    color: #8B4513;
  }

  .checkout-btn {
    width: 100%;
    padding: 1.25rem;
    margin-top: 1.5rem;
    background: #48bb78;
    color: white;
    border: none;
    border-radius: 30px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .checkout-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(139, 69, 19, 0.4);
  }

  .continue-link {
    display: block;
    text-align: center;
    margin-top: 1rem;
    color: #8B4513;
    font-weight: 600;
    transition: transform 0.2s;
  }

  .continue-link:hover {
    transform: translateX(-5px);
  }

  .clear-cart-btn {
    width: 100%;
    padding: 0.75rem;
    margin-top: 1rem;
    background: transparent;
    color: #fc8181;
    border: 2px solid #fc8181;
    border-radius: 25px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }

  .clear-cart-btn:hover {
    background: #fc8181;
    color: white;
  }

  @media (max-width: 968px) {
    .cart-layout {
      grid-template-columns: 1fr;
    }

    .cart-summary {
      position: static;
    }
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }
  }
</style>
