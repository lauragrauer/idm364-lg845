<!-- src/routes/cart/+page.svelte -->
<script>
  import { cart } from '$lib/stores/cart.svelte.js';
  import CartItem from '$lib/components/CartItem.svelte';
  import CartSummary from '$lib/components/CartSummary.svelte';
  import EmptyCart from '$lib/components/EmptyCart.svelte';
</script>

<svelte:head>
  <title>Shopping Cart - Rilakkuma Shop</title>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
</svelte:head>

<div class="page">
  <div class="container">
    <h1>🛒 Shopping Cart</h1>

    {#if cart.items.length === 0}
      <EmptyCart />
    {:else}
      <div class="cart-layout">
        <div class="cart-items">
          {#each cart.items as item (item.id)}
            <CartItem {item} />
          {/each}
        </div>

        <CartSummary />
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

  @media (max-width: 968px) {
    .cart-layout {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }
  }
</style>
