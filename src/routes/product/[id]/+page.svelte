<!-- src/routes/product/[id]/+page.svelte -->
<script>
  import { page } from '$app/stores';
  import { supabase } from '$lib/supabaseClient.js';
  import { cart } from '$lib/stores/cart.svelte.js';

  let product = $state(null);
  let loading = $state(true);
  let error = $state(null);
  let quantity = $state(1);

  // Fetch product by ID
  $effect(() => {
    async function fetchProduct() {
      try {
        loading = true;
        const { data, error: fetchError } = await supabase
          .from('products')
          .select('*')
          .eq('id', $page.params.id)
          .single();

        if (fetchError) throw fetchError;
        
        product = data;
      } catch (err) {
        error = err.message;
        console.error('Error fetching product:', err);
      } finally {
        loading = false;
      }
    }

    fetchProduct();
  });

  function addToCart() {
    if (product) {
      cart.addItem(product, quantity);
      alert(`Added ${quantity} ${product.name}(s) to cart! 🧸💕`);
      quantity = 1;
    }
  }

  function incrementQuantity() {
    if (product && quantity < product.quantity) {
      quantity++;
    }
  }

  function decrementQuantity() {
    if (quantity > 1) {
      quantity--;
    }
  }
</script>

<svelte:head>
  <title>{product ? product.name : 'Product'} - Rilakkuma Shop</title>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
</svelte:head>

<div class="page">
  <div class="container">
    {#if loading}
      <div class="loading">
        <div class="spinner"></div>
        <p>Loading plushie... 🐻</p>
      </div>
    {:else if error}
      <div class="error">
        <p>Error loading product: {error}</p>
        <a href="/" class="back-link">← Back to Shop</a>
      </div>
    {:else if product}
      <a href="/" class="back-link">← Back to Shop</a>

      <div class="product-detail">
        <div class="product-image">
          <img src={product.image_url} alt={product.name} />
        </div>

        <div class="product-info">
          <span class="product-category">{product.category}</span>
          <h1>{product.name}</h1>
          <p class="product-price">${product.price.toFixed(2)}</p>
          
          <p class="product-description">{product.description}</p>

          <div class="product-specs">
            <div class="spec">
              <strong>Size:</strong>
              <span>{product.size}</span>
            </div>
            <div class="spec">
              <strong>In Stock:</strong>
              <span class:in-stock={product.quantity > 0} class:out-of-stock={product.quantity === 0}>
                {product.quantity > 0 ? `${product.quantity} available` : 'Out of stock'}
              </span>
            </div>
          </div>

          {#if product.quantity > 0}
            <div class="quantity-selector">
              <label for="quantity">Quantity:</label>
              <div class="quantity-controls">
                <button 
                  class="qty-btn"
                  onclick={decrementQuantity}
                  disabled={quantity <= 1}
                >
                  −
                </button>
                <input
                  id="quantity"
                  type="number"
                  min="1"
                  max={product.quantity}
                  bind:value={quantity}
                />
                <button 
                  class="qty-btn"
                  onclick={incrementQuantity}
                  disabled={quantity >= product.quantity}
                >
                  +
                </button>
              </div>
            </div>

            <button class="add-to-cart-btn" onclick={addToCart}>
              🛒 Add to Cart - ${(product.price * quantity).toFixed(2)}
            </button>
          {:else}
            <button class="add-to-cart-btn" disabled>
              Out of Stock 😢
            </button>
          {/if}
        </div>
      </div>
    {:else}
      <div class="error">
        <p>Product not found</p>
        <a href="/" class="back-link">← Back to Shop</a>
      </div>
    {/if}
  </div>
</div>

<style>
  .page {
    padding: 2rem 0;
    font-family: 'Nunito', sans-serif;
  }

  .back-link {
    display: inline-block;
    margin-bottom: 2rem;
    color: #8B4513;
    font-weight: 600;
    transition: transform 0.2s;
    background: #FFFACD;
    padding: 0.5rem 1rem;
    border-radius: 20px;
  }

  .back-link:hover {
    transform: translateX(-5px);
  }

  .loading, .error {
    text-align: center;
    padding: 4rem 0;
  }

  .spinner {
    width: 50px;
    height: 50px;
    border: 4px solid #E8D5C4;
    border-top-color: #8B4513;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .product-detail {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    background: #FFF8F0;
    padding: 2rem;
    border-radius: 20px;
    box-shadow: 0 4px 12px rgba(139, 69, 19, 0.15);
    border: 3px solid #F4A460;
  }

  .product-image {
    width: 100%;
    aspect-ratio: 1;
    border-radius: 16px;
    overflow: hidden;
    background: #FFFACD;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .product-image img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 1rem;
  }

  .product-info {
    display: flex;
    flex-direction: column;
  }

  .product-category {
    color: #8B4513;
    font-size: 0.875rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.5rem;
    background: #FFFACD;
    display: inline-block;
    padding: 0.25rem 1rem;
    border-radius: 20px;
    width: fit-content;
  }

  h1 {
    font-size: 2.5rem;
    color: #4A3728;
    margin-bottom: 1rem;
  }

  .product-price {
    font-size: 2rem;
    font-weight: bold;
    color: #8B4513;
    margin-bottom: 1.5rem;
  }

  .product-description {
    color: #6B5344;
    line-height: 1.8;
    margin-bottom: 2rem;
    font-size: 1.1rem;
  }

  .product-specs {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: #FFFACD;
    border-radius: 12px;
  }

  .spec {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .spec strong {
    color: #4A3728;
  }

  .in-stock {
    color: #48bb78;
    font-weight: 600;
  }

  .out-of-stock {
    color: #fc8181;
    font-weight: 600;
  }

  .quantity-selector {
    margin-bottom: 2rem;
  }

  .quantity-selector label {
    display: block;
    font-weight: 600;
    color: #4A3728;
    margin-bottom: 0.5rem;
  }

  .quantity-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .qty-btn {
    width: 45px;
    height: 45px;
    border: 2px solid #D2691E;
    background: white;
    border-radius: 50%;
    font-size: 1.5rem;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #8B4513;
  }

  .qty-btn:hover:not(:disabled) {
    background: #FFFACD;
    border-color: #8B4513;
  }

  .qty-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .quantity-controls input {
    width: 80px;
    height: 45px;
    text-align: center;
    border: 2px solid #D2691E;
    border-radius: 10px;
    font-size: 1.1rem;
    font-weight: 600;
    color: #4A3728;
  }

  .quantity-controls input:focus {
    outline: none;
    border-color: #8B4513;
  }

  .add-to-cart-btn {
    width: 100%;
    padding: 1.25rem;
    background: linear-gradient(135deg, #8B4513 0%, #D2691E 100%);
    color: white;
    border: none;
    border-radius: 30px;
    font-size: 1.2rem;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .add-to-cart-btn:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(139, 69, 19, 0.4);
  }

  .add-to-cart-btn:disabled {
    background: #cbd5e0;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    .product-detail {
      grid-template-columns: 1fr;
      gap: 2rem;
      padding: 1.5rem;
    }

    h1 {
      font-size: 2rem;
    }

    .product-price {
      font-size: 1.75rem;
    }
  }
</style>
