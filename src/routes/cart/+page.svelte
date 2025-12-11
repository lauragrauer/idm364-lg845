<script>
  import { cart } from '$lib/stores/cart.svelte.js';
  import EmptyCart from '$lib/components/EmptyCart.svelte';
  import CartItem from '$lib/components/CartItem.svelte';
  import CartSummary from '$lib/components/CartSummary.svelte';
</script>

<svelte:head>
  <title>Shopping Cart - Rilakkuma Shop</title>
</svelte:head>

<section class="cart-page">
  <h1>Shopping Cart</h1>

  {#if cart.items.length === 0}
    <EmptyCart />
  {:else}
    <div class="cart-layout">
      <div class="cart-items">
        {#each cart.items as item (item.id)}
          <CartItem {item} />
        {/each}
      </div>
      <aside class="cart-sidebar">
        <CartSummary />
      </aside>
    </div>
  {/if}
</section>

<style>
  .cart-page {
    max-width: 1200px;
    margin: 0 auto;
    padding: var(--spacing-xl) var(--spacing-md);
  }

  h1 {
    font-size: var(--font-size-2xl);
    margin-bottom: var(--spacing-xl);
    text-align: center;
  }

  .cart-layout {
    display: grid;
    grid-template-columns: 1fr 350px;
    gap: var(--spacing-xl);
    align-items: start;
  }

  .cart-items {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }

  @media (max-width: 900px) {
    .cart-layout {
      grid-template-columns: 1fr;
    }

    .cart-sidebar {
      order: -1;
    }
  }
</style>
