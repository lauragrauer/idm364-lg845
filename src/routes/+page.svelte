<!-- src/routes/+page.svelte -->
<script>
  import Hero from '$lib/components/Hero.svelte';
  import CategoryFilter from '$lib/components/CategoryFilter.svelte';
  import ProductCard from '$lib/components/ProductCard.svelte';

  let { data } = $props();

  let selected_category = $state('all');
  let categories = $derived([...new Set(data.products.map(p => p.category))]);
  let filtered_products = $derived(
    selected_category === 'all' 
      ? data.products 
      : data.products.filter(p => p.category === selected_category)
  );

  function handle_category_select(category) {
    selected_category = category;
  }
</script>

<svelte:head>
  <title>Rilakkuma Shop - Adorable Plushies</title>
</svelte:head>

<Hero />

<section class="products-section">
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
