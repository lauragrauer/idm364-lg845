<!-- src/lib/components/ProductCard.svelte -->
<script>
  import { cart } from '$lib/stores/cart.svelte.js';
  import Button from './Button.svelte';

  let { product } = $props();

  function add_to_cart() {
    cart.addItem(product);
    alert(`${product.name} added to cart! 🧸`);
  }
</script>

<article class="product-card">
  <a href="/product/{product.id}" class="product-link">
    <div class="product-image">
      <img src={product.image_url} alt={product.name} />
    </div>
    
    <div class="product-info">
      <h3>{product.name}</h3>
      <p class="product-category">{product.category}</p>
      <p class="product-description">{product.description}</p>
      
      <div class="product-details">
        <span class="product-size">Size: {product.size}</span>
        <span class="product-stock" class:out-of-stock={product.quantity === 0}>
          {product.quantity > 0 ? `${product.quantity} in stock` : 'Out of stock'}
        </span>
      </div>
    </div>
  </a>
  
  <div class="product-footer">
    <span class="product-price">${product.price.toFixed(2)}</span>
    <Button 
      variant={product.quantity > 0 ? 'success' : 'secondary'}
      onclick={add_to_cart}
      disabled={product.quantity === 0}
    >
      {product.quantity > 0 ? 'Add to Cart 🛒' : 'Out of Stock'}
    </Button>
  </div>
</article>

<style>
  .product-card {
    background: #FFF8F0;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(139, 69, 19, 0.15);
    transition: transform 0.3s, box-shadow 0.3s;
    display: flex;
    flex-direction: column;
    height: 100%;
    border: 2px solid #F4A460;
  }

  .product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(139, 69, 19, 0.25);
  }

  .product-link {
    text-decoration: none;
    color: inherit;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .product-image {
    width: 100%;
    height: 280px;
    overflow: hidden;
    background: #FFFACD;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .product-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
  }

  .product-card:hover .product-image img {
    transform: scale(1.05);
  }

  .product-info {
    padding: 1.25rem;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.25rem;
    color: #4A3728;
    font-weight: 800;
  }

  .product-category {
    color: #8B4513;
    font-size: 0.875rem;
    font-weight: 600;
    margin: 0 0 0.5rem 0;
    text-transform: uppercase;
    background: #FFFACD;
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    width: fit-content;
  }

  .product-description {
    color: #8B7355;
    font-size: 0.875rem;
    margin: 0 0 1rem 0;
    flex: 1;
    line-height: 1.5;
  }

  .product-details {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: #6B5344;
  }

  .product-stock {
    color: #48bb78;
    font-weight: 600;
  }

  .product-stock.out-of-stock {
    color: #fc8181;
  }

  .product-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.25rem;
    border-top: 2px dashed #E8D5C4;
    background: #FFF5EB;
  }

  .product-price {
    font-size: 1.5rem;
    font-weight: bold;
    color: #8B4513;
  }

  @media (max-width: 768px) {
    .product-image {
      height: 220px;
    }

    h3 {
      font-size: 1.1rem;
    }

    .product-footer {
      flex-direction: column;
      gap: 1rem;
    }

    .product-footer :global(.btn) {
      width: 100%;
    }
  }
</style>
