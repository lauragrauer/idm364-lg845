<!-- src/lib/components/CategoryFilter.svelte -->
<script>
  let { 
    categories = [],
    selected = 'all',
    onchange = () => {},
    label = 'Filter by category:',
    allLabel = 'All Items'
  } = $props();

  function handleChange(e) {
    onchange(e.target.value);
  }
</script>

<div class="filter-section">
  <label for="category-filter">{label}</label>
  <select 
    id="category-filter"
    value={selected}
    onchange={handleChange}
  >
    {#each categories as category}
      <option value={category}>
        {category === 'all' ? allLabel : category}
      </option>
    {/each}
  </select>
</div>

<style>
  .filter-section {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
    justify-content: center;
    background: var(--bg-primary, #FFF8F0);
    padding: 1rem 2rem;
    border-radius: 30px;
    border: 2px solid var(--primary-lighter, #F4A460);
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
  }

  label {
    font-weight: 600;
    color: var(--text-primary, #4A3728);
  }

  select {
    padding: 0.75rem 1rem;
    border: 2px solid var(--primary-light, #D2691E);
    border-radius: 20px;
    font-size: 1rem;
    background: white;
    cursor: pointer;
    min-width: 200px;
    color: var(--text-primary, #4A3728);
    font-family: inherit;
  }

  select:focus {
    outline: none;
    border-color: var(--primary, #8B4513);
  }

  @media (max-width: 768px) {
    .filter-section {
      flex-direction: column;
      align-items: stretch;
      width: 100%;
      margin: 0 0 2rem 0;
    }

    select {
      width: 100%;
    }
  }
</style>
