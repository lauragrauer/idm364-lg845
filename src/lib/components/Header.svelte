<!-- src/lib/components/Header.svelte -->
<script>
  import { cart } from '$lib/stores/cart.svelte.js';
</script>

<header>
  <div class="container">
    <nav>
      <a href="/" class="logo">
        <img src="/images/icon.png" alt="Rilakkuma" class="logo-icon" />
        <span class="logo-text">RILAKKUMA SHOP</span>
      </a>
      
      <ul class="nav-links">
        <li><a href="/">SHOP</a></li>
        <li>
          <a href="/cart" class="cart-link">
            CART
            {#if cart.itemCount > 0}
              <span class="cart-badge">{cart.itemCount}</span>
            {/if}
          </a>
        </li>
      </ul>
    </nav>
  </div>
</header>

<style>
  header {
  background: var(--color-header);
  color: white;
  padding: var(--spacing-lg) var(--spacing-md);
  box-shadow: var(--shadow-md);
  position: sticky;
  top: 0;
  z-index: 100;
}

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    color: white;
    font-size: var(--font-size-xl);
    font-weight: bold;
  }

  .logo-icon {
    width: var(--icon-md);
    height: var(--icon-md);
  }

  .nav-links {
    display: flex;
    gap: var(--spacing-xl);
    list-style: none;
    margin: 0;
    padding: 0;
    font-size: var(--font-size-md);
  }

  .nav-links a {
    color: white;
    font-weight: 600;
    transition: opacity 0.3s;
  }

  .nav-links a:hover {
    opacity: 0.8;
  }

  .cart-link {
    position: relative;
    padding-right: var(--spacing-sm);
  }

  .cart-badge {
    position: absolute;
    top: -8px;
    right: -12px;
    background: var(--color-bg-highlight);
    color: var(--color-primary);
    border-radius: 50%;
    min-width: 22px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--font-size-sm);
    font-weight: bold;
  }

  @media (max-width: 768px) {
    .logo-text {
      display: none;
    }

    .nav-links {
      gap: var(--spacing-md);
    }
  }
</style>
