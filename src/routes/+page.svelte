<script>
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabaseClient.js';
  import ProductCard from '$lib/components/ProductCard.svelte';

  let products = $state([]);
  let loading = $state(true);
  let error = $state(null);
  let selectedCategory = $state('all');

  $effect(() => {
    async function fetchProducts() {
      try {
        loading = true;
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

    fetchProducts();
  });

  const categories = $derived(() => {
    const cats = [...new Set(products.map(p => p.category))];
    return ['all', ...cats];
  });

  const filteredProducts = $derived(() => {
    if (selectedCategory === 'all') {
      return products;
    }
    return products.filter(p => p.category === selectedCategory);
  });
</script>

<svelte:head>
  <title>Rilakkuma Shop - Kawaii Plushies</title>
  <meta name="description" content="Shop adorable Rilakkuma plushies and collectibles" />
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
</svelte:head>

<div class="page">
  <div class="container">
    <div class="hero">
      <span class="hero-bear">🧸</span>
      <h1>Welcome to Rilakkuma Shop</h1>
      <p>Find your new cuddly friend from our collection of adorable plushies!</p>
    </div>

    {#if loading}
      <div class="loading">
        <div class="spinner"></div>
        <p>Loading plushies... 🐻</p>
      </div>
    {:else if error}
      <div class="error">
        <p>Error loading products: {error}</p>
        <button onclick={() => window.location.reload()}>Try Again</button>
      </div>
    {:else}
      <div class="filter-section">
        <label for="category-filter">Filter by category:</label>
        <select 
          id="category-filter"
          bind:value={selectedCategory}
        >
          {#each categories() as category}
            <option value={category}>
              {category === 'all' ? 'All Plushies 🧸' : category}
            </option>
          {/each}
        </select>
      </div>

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

  .hero {
    text-align: center;
    margin-bottom: 3rem;
    padding: 2rem 0;
  }

  .hero-bear {
    font-size: 4rem;
    display: block;
    margin-bottom: 1rem;
    animation: bounce 2s ease-in-out infinite;
  }

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  .hero h1 {
    font-size: 3rem;
    background: #4A3728;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 1rem;
    font-family: 'Nunito', sans-serif;
  }

  .hero p {
    font-size: 1.25rem;
    color: #8B7355;
  }

  .loading {
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

  .error {
    text-align: center;
    padding: 4rem 0;
    color: #fc8181;
  }

  .error button {
    margin-top: 1rem;
    padding: 0.75rem 1.5rem;
    background: #dd0808;
    color: white;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    font-weight: 600;
  }

  .filter-section {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
    justify-content: center;
    background: #FFF8F0;
    padding: 1rem 2rem;
    border-radius: 30px;
    border: 2px solid #F4A460;
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
  }

  .filter-section label {
    font-weight: 600;
    color: #4A3728;
  }

  .filter-section select {
    padding: 0.75rem 1rem;
    border: 2px solid #D2691E;
    border-radius: 20px;
    font-size: 1rem;
    background: white;
    cursor: pointer;
    min-width: 200px;
    color: #4A3728;
  }

  .filter-section select:focus {
    outline: none;
    border-color: #8B4513;
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
    .hero h1 {
      font-size: 2rem;
    }

    .hero p {
      font-size: 1rem;
    }

    .hero-bear {
      font-size: 3rem;
    }

    .products-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .filter-section {
      flex-direction: column;
      align-items: stretch;
      width: 100%;
      margin: 0 0 2rem 0;
    }

    .filter-section select {
      width: 100%;
    }
  }
</style>
