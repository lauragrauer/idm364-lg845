<script>
  import { supabase } from '$lib/supabaseClient.js';
  import Hero from '$lib/components/Hero.svelte';
  import CategoryFilter from '$lib/components/CategoryFilter.svelte';
  import ProductCard from '$lib/components/ProductCard.svelte';
  import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
  import ErrorMessage from '$lib/components/ErrorMessage.svelte';

  let products = $state([]);
  let loading = $state(true);
  let error = $state(null);
  let selected_category = $state('all');

  let categories = $derived([...new Set(products.map(p => p.category))]);
  let filtered_products = $derived(
    selected_category === 'all' 
      ? products 
      : products.filter(p => p.category === selected_category)
  );

  async function fetch_products() {
    try {
      loading = true;
      error = null;
      const { data, error: fetch_error } = await supabase
        .from('products')
        .select('*')
        .order('name', { ascending: true });

      if (fetch_error) throw fetch_error;
      products = data;
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  }

  function handle_category_select(category) {
    selected_category = category;
  }

  $effect(() => {
    fetch_products();
  });
</script>

<svelte:head>
  <title>Rilakkuma Shop - Adorable Plushies</title>
</svelte:head>

<Hero />

<section class="products-section">
  {#if loading}
    <LoadingSpinner message="Loading plushies..." />
  {:else if error}
    <ErrorMessage message="Error loading products: {error}" />
  {:else}
    <CategoryFilter 
      {categories} 
      selected={selected_category} 
      onselect={handle_category_select} 
    />

    <div class="products-grid">
      {#each filtered_products as product (product.id)}
        <ProductCard {product} />
      {/each}
    </div>

    {#if filtered_products.length === 0}
      <p class="no-products">No products found in this category.</p>
    {/if}
  {/if}
</section>

<style>
  .products-section {
    padding: 0 var(--spacing-md) var(--spacing-xl);
  }

  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: var(--spacing-xl);
    max-width: 1200px;
    margin: 0 auto;
  }

  .no-products {
    text-align: center;
    color: var(--color-text-muted);
    font-size: var(--font-size-lg);
    padding: var(--spacing-xl);
  }
</style>
