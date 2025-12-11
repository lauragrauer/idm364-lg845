<!-- src/routes/product/[id]/+page.svelte -->
<script>
  import { page } from '$app/stores';
  import { supabase } from '$lib/supabaseClient.js';
  import { cart } from '$lib/stores/cart.svelte.js';
  import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
  import ErrorMessage from '$lib/components/ErrorMessage.svelte';
  import QuantityInput from '$lib/components/QuantityInput.svelte';
  import Button from '$lib/components/Button.svelte';
  import Notification from '$lib/components/Notification.svelte';

  let product = $state(null);
  let loading = $state(true);
  let error = $state(null);
  let quantity = $state(1);
  let show_notification = $state(false);
  let notification_message = $state('');

  let in_stock = $derived(product?.quantity > 0);

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
    } finally {
      loading = false;
    }
  }

  function handle_quantity_change(new_value) {
    quantity = new_value;
  }

  function add_to_cart() {
    if (!product || !in_stock) return;
    
    for (let i = 0; i < quantity; i++) {
      cart.addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image_url
      });
    }
    
    notification_message = `Added ${quantity} ${product.name}${quantity > 1 ? 's' : ''} to cart!`;
    show_notification = true;
    quantity = 1;
  }

  function close_notification() {
    show_notification = false;
  }

  $effect(() => {
    fetch_product();
  });
</script>

<svelte:head>
  <title>{product?.name || 'Product'} - Rilakkuma Shop</title>
</svelte:head>

<Notification 
  message={notification_message} 
  visible={show_notification} 
  onclose={close_notification} 
/>

<section class="product-page">
  <a href="/" class="back-link">← Back to Shop</a>

  {#if loading}
    <LoadingSpinner message="Loading product..." />
  {:else if error}
    <ErrorMessage message={error} />
  {:else if product}
    <div class="product-layout">
      <div class="product-image">
        <img src={product.image_url} alt={product.name} />
      </div>

      <div class="product-details">
        {#if product.category}
          <span class="category-badge">{product.category}</span>
        {/if}

        <h1>{product.name}</h1>
        <p class="product-price">${product.price.toFixed(2)}</p>
        <p class="product-stock" class:out-of-stock={!in_stock}>
          {in_stock ? `${product.quantity} in stock` : 'Out of stock'}
        </p>

        {#if product.description}
          <p class="product-description">{product.description}</p>
        {/if}

        {#if in_stock}
          <div class="add-to-cart-section">
            <QuantityInput
              value={quantity}
              min={1}
              max={Math.min(10, product.quantity)}
              label="Quantity"
              onchange={handle_quantity_change}
            />
            <Button variant="success" size="large" onclick={add_to_cart}>
              Add to Cart
            </Button>
          </div>
        {/if}

        {#if product.size || product.material}
          <div class="product-specs">
            {#if product.size}
              <div class="spec">
                <span class="spec-label">Size</span>
                <span class="spec-value">{product.size}</span>
              </div>
            {/if}
            {#if product.material}
              <div class="spec">
                <span class="spec-label">Material</span>
                <span class="spec-value">{product.material}</span>
              </div>
            {/if}
          </div>
        {/if}
      </div>
    </div>
  {/if}
</section>

<style>
  .product-page {
    max-width: 1000px;
    margin: 0 auto;
    padding: var(--spacing-xl) var(--spacing-md);
  }

  .back-link {
    display: inline-block;
    margin-bottom: var(--spacing-xl);
    color: var(--color-primary);
    font-size: var(--font-size-md);
    font-weight: 600;
  }

  .back-link:hover {
    text-decoration: underline;
  }

  .product-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-xl);
    align-items: start;
  }

  .product-image img {
    width: 100%;
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-lg);
  }

  .product-details {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }

  .category-badge {
    display: inline-block;
    width: fit-content;
    background: var(--color-bg-highlight);
    color: var(--color-primary);
    padding: var(--spacing-xs) var(--spacing-md);
    border-radius: var(--radius-full);
    font-size: var(--font-size-sm);
    font-weight: 600;
  }

  h1 {
    font-size: var(--font-size-2xl);
  }

  .product-price {
    font-size: var(--font-size-2xl);
    font-weight: bold;
    color: var(--color-primary);
  }

  .product-stock {
    font-size: var(--font-size-md);
    font-weight: 600;
    color: var(--color-success);
  }

  .product-stock.out-of-stock {
    color: var(--color-danger);
  }

  .product-description {
    font-size: var(--font-size-md);
    color: var(--color-text-light);
    line-height: 1.7;
  }

  .add-to-cart-section {
    display: flex;
    gap: var(--spacing-md);
    align-items: center;
    padding: var(--spacing-lg) 0;
  }

  .product-specs {
    display: flex;
    gap: var(--spacing-xl);
    padding-top: var(--spacing-md);
    border-top: 2px solid var(--color-border);
  }

  .spec {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
  }

  .spec-label {
    font-size: var(--font-size-sm);
    color: var(--color-text-muted);
  }

  .spec-value {
    font-size: var(--font-size-md);
    font-weight: 600;
  }

  @media (max-width: 768px) {
    .product-layout {
      grid-template-columns: 1fr;
    }

    .add-to-cart-section {
      flex-direction: column;
      align-items: stretch;
    }
  }
</style>
