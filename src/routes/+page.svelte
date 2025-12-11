<!-- src/routes/+page.svelte -->
<script>
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabaseClient.js';
  import ProductCard from '$lib/components/ProductCard.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
  import ErrorMessage from '$lib/components/ErrorMessage.svelte';
  import CategoryFilter from '$lib/components/CategoryFilter.svelte';

  let products = $state([]);
  let loading = $state(true);
  let error = $state(null);
  let selectedCategory = $state('all');

  $effect(() => {
    fetchProducts();
  });

  async function fetchProducts() {
    try {
      loading = true;
      error = null;
      const { data, error: fetchError } = await supabase
        .from('products')
        .select('*')
        .order('name', { ascending: true });

      if (fetchError) throw fetchError;
      products = data;
    } catch (err) {
      error = err.message;
      console.error('Error fetching products:', err);
    } finally {
      loading = false;
    }
  }

  const categories = $derived(() => {
    const cats = [...new Set(products.map(p => p.category))];
    return ['all', ...cats];
  });

  const filteredProducts = $derived(() => {
    if (selectedCategory === 'all') return products;
    return products.filter(p => p.category === selectedCategory);
  });

  function handleCategoryChange(category) {
    selectedCategory = category;
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
        onRetry={fetchProducts}
      />
    {:else}
      <CategoryFilter 
        categories={categories()}
        selected={selectedCategory}
        onchange={handleCategoryChange}
        allLabel="All Plushies 🧸"
      />

      <div class="products-grid">
        {#each filteredProducts() as product (product.id)}
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
    color: var(--text-secondary, #8B7355);
    font-size: 1.25rem;
  }

  @media (max-width: 768px) {
    .products-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
  }
</style>
