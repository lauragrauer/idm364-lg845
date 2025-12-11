<script>
  import { page } from '$app/stores';
  import { supabase } from '$lib/supabaseClient.js';
  import { cart } from '$lib/stores/cart.svelte.js';
  import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
  import ErrorMessage from '$lib/components/ErrorMessage.svelte';
  import QuantityInput from '$lib/components/QuantityInput.svelte';
  import Button from '$lib/components/Button.svelte';

  let product = $state(null);
  let loading = $state(true);
  let error = $state(null);
  let quantity = $state(1);

  $effect(() => {
    fetch_product();
  });

  async function fetch_product() {
    try {
      loading = true;
      error = null;
      
      const { data, error: fetch_error } = await supabase
        .from('products')
        .select('*')
        .eq('id', $page.params.id)
        .single();

      if (fetch_error) throw fetch_error;
      product = data;
    } catch (err) {
      error = err.message;
      console.error('Error fetching product:', err);
    } finally {
      loading = false;
    }
  }

  function add_to_cart() {
    if (product) {
      cart.addItem(product, quantity);
      alert(`Added ${quantity} ${product.name}(s) to cart! 🧸💕`);
      quantity = 1;
    }
  }

  function handle_quantity_change(new_quantity) {
    quantity = new_quantity;
  }
</script>

<svelte:head>
  <title>{product ? product.name : 'Product'} - Rilakkuma Shop</title>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
</svelte:head>

<div class="page">
  <div class="container">
    {#if loading}
      <LoadingSpinner message="Loading plushie... 🐻" />
    {:else if error}
      <ErrorMessage 
        message="Error loading product: {error}" 
        show_retry={false}
      />
      <a href="/" class="back-link">← Back to Shop</a>
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
              <QuantityInput
                id="product-quantity"
                value={quantity}
                min={1}
                max={product.quantity}
                label="Quantity:"
                onchange={handle_quantity_change}
              />
            </div>

            <Button variant="success" size="large" full_width={true} onclick={add_to_cart}>
              🛒 Add to Cart - ${(product.price * quantity).toFixed(2)}
            </Button>
          {:else}
            <Button variant="secondary" size="large" full_width={true} disabled={true}>
              Out of Stock 😢
            </Button>
          {/if}
        </div>
      </div>
    {:else}
      <ErrorMessage 
        message="Product not found" 
        show_retry={false}
      />
      <a href="/" class="back-link">← Back to Shop</a>
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
