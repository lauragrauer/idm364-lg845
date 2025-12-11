<!-- src/routes/+page.svelte -->
<script>
  import { supabase } from '$lib/supabaseClient.js';
  import ProductCard from '$lib/components/ProductCard.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
  import ErrorMessage from '$lib/components/ErrorMessage.svelte';
  import CategoryFilter from '$lib/components/CategoryFilter.svelte';

  let products = $state([]);
  let loading = $state(true);
  let error = $state(null);
  let selected_category = $state('all');

  // $derived should be a simple expression, NOT a function
  const categories = $derived(['all', ...new Set(products.map(p => p.category))]);
  
  const filtered_products = $derived(
    selected_category === 'all' 
      ? products 
      : products.filter(p => p.category === selected_category)
  );

  $effect(() => {
    fetch_products();
  });

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
      console.error('Error fetching products:', err);
    } finally {
      loading = false;
    }
  }

  function handle_category_change(category) {
    selected_category = category;
  }
</script>

<svelte:head>
  <title>Rilakkuma Shop - Kawaii Plushies</title>
  <meta name="description" content="Shop adorable Rilakkuma plushies and collectibles" />
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
</svelte:head>

<div class="page">
  <div class="container">
    <Hero />

    {#if loading}
      <LoadingSpinner message="Loading plushies... 🐻" />
    {:else if error}
      <ErrorMessage 
        message="Error loading products: {error}" 
        on_retry={fetch_products}
      />
    {:else}
      <CategoryFilter 
        categories={categories}
        selected={selected_category}
        onchange={handle_category_change}
        all_label="All Plushies 🧸"
      />

      <div class="products-grid">
        {#each filtered_products as product (product.id)}
          <ProductCard {product} />
        {:else}
          <p class="no-products">No plushies found in this category. 😢</p>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style>
  .page {
    padding: 2rem 0;
  }

  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
  }

  .no-products {
    grid-column: 1 / -1;
    text-align: center;
    padding: 4rem 0;
    color: #8B7355;
    font-size: 1.25rem;
  }

  @media (max-width: 768px) {
    .products-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
  }
</style>
