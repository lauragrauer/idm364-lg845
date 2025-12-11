<!-- src/lib/components/CategoryFilter.svelte -->
<script>
  let { 
    categories = [],
    selected = 'all',
    onselect = () => {}
  } = $props();
</script>

<div class="filter-container">
  <button 
    class="filter-btn" 
    class:active={selected === 'all'}
    onclick={() => onselect('all')}
  >
    All
  </button>
  {#each categories as category}
    <button 
      class="filter-btn"
      class:active={selected === category}
      onclick={() => onselect(category)}
    >
      {category}
    </button>
  {/each}
</div>

<style>
  .filter-container {
    display: flex;
    gap: var(--spacing-sm);
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: var(--spacing-xl);
  }

  .filter-btn {
    padding: var(--spacing-sm) var(--spacing-lg);
    border: 2px solid var(--color-primary-lighter);
    background: var(--color-bg-card);
    color: var(--color-text);
    border-radius: var(--radius-full);
    cursor: pointer;
    font-size: var(--font-size-md);
    font-weight: 600;
    transition: all 0.2s;
  }

  .filter-btn:hover {
    background: var(--color-primary-lighter);
    color: white;
  }

  .filter-btn.active {
    background: var(--color-primary);
    border-color: var(--color-primary);
    color: white;
  }
</style>
