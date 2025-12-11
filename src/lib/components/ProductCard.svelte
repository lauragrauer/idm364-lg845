<script>
  import { cart } from '$lib/stores/cart.svelte.js';
  import Button from './Button.svelte';
  import Notification from './Notification.svelte';

  let { product } = $props();

  let show_notification = $state(false);
  let notification_message = $state('');

  let in_stock = $derived(product.quantity > 0);

  function add_to_cart() {
    cart.addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image_url
    });
    notification_message = `${product.name} added to cart!`;
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

<div class="product-card">
  <a href="/product/{product.id}" class="product-link">
    <div class="image-container">
      <img src={product.image_url} alt={product.name} />
      {#if product.category}
        <span class="category-badge">{product.category}</span>
      {/if}
    </div>
    
    <div class="product-info">
      <h3>{product.name}</h3>
      <p class="product-price">${product.price.toFixed(2)}</p>
      <p class="product-stock" class:out-of-stock={!in_stock}>
        {in_stock ? `${product.quantity} in stock` : 'Out of stock'}
      </p>
    </div>
  </a>

  <Button 
    variant="success" 
    full_width={true}
    disabled={!in_stock}
    onclick={add_to_cart}
  >
    {in_stock ? 'Add to Cart' : 'Out of Stock'}
  </Button>
</div>

<style>
  .product-card {
    background: var(--color-bg-card);
    border-radius: var(--radius-xl);
    border: 2px solid var(--color-primary-lighter);
    overflow: hidden;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .product-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }

  .product-link {
    display: block;
    color: inherit;
  }

  .image-container {
    position: relative;
    aspect-ratio: 1;
    overflow: hidden;
  }

  .image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
  }

  .product-card:hover img {
    transform: scale(1.05);
  }

  .category-badge {
    position: absolute;
    top: var(--spacing-sm);
    left: var(--spacing-sm);
    background: var(--color-bg-highlight);
    color: var(--color-primary);
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: var(--radius-full);
    font-size: var(--font-size-sm);
    font-weight: 600;
  }

  .product-info {
    padding: var(--spacing-md);
  }

  h3 {
    font-size: var(--font-size-lg);
    margin-bottom: var(--spacing-xs);
  }

  .product-price {
    font-size: var(--font-size-xl);
    font-weight: bold;
    color: var(--color-primary);
    margin-bottom: var(--spacing-xs);
  }

  .product-stock {
    font-size: var(--font-size-md);
    color: var(--color-success);
    font-weight: 600;
  }

  .product-stock.out-of-stock {
    color: var(--color-danger);
  }

  .product-card :global(.btn) {
    border-radius: 0 0 var(--radius-lg) var(--radius-lg);
  }
</style>
