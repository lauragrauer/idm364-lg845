<script>
  import { cart } from '$lib/stores/cart.svelte.js';
  
  let { 
    logo_text = 'RILAKKUMA SHOP',
    logo_icon = '🧸'
  } = $props();
</script>

<header>
  <div class="container">
    <nav>
      <a href="/" class="logo">
        <span class="logo-icon">{logo_icon}</span>
        <span class="logo-text">{logo_text}</span>
      </a>
      
      <ul class="nav-links">
        <li><a href="/">SHOP</a></li>
        <li>
          <a href="/cart" class="cart-link">
            CART
            {#if cart.itemCount > 0}
              <span class="cart-badge" aria-label="{cart.itemCount} items in cart">
                {cart.itemCount}
              </span>
            {/if}
          </a>
        </li>
      </ul>
    </nav>
  </div>
</header>

<style>
  header {
    background: #614632;
    color: white;
    padding: 1rem 0.5rem;
    box-shadow: 0 2px 10px rgba(139, 69, 19, 0.3);
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
    color: white;
    font-size: 1.5rem;
    font-weight: bold;
  }

  .logo-icon {
    font-size: 2rem;
  }

  .nav-links {
    display: flex;
    gap: 2rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .nav-links a {
    color: white;
    text-decoration: none;
    font-weight: 500;
    transition: opacity 0.3s;
    position: relative;
  }

  .nav-links a:hover {
    opacity: 0.8;
  }

  .cart-link {
    position: relative;
    padding-right: 0.5rem;
  }

  .cart-badge {
    position: absolute;
    top: -8px;
    right: -12px;
    background: #FFFACD;
    color: #8B4513;
    border-radius: 50%;
    min-width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    font-weight: bold;
    padding: 0 4px;
  }

  @media (max-width: 768px) {
    .logo-text {
      display: none;
    }

    .nav-links {
      gap: 1rem;
    }
  }
</style>
