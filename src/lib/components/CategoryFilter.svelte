<!-- src/lib/components/CategoryFilter.svelte -->
<script>
  let { 
    categories = [],
    selected = 'all',
    onchange,
    label = 'Filter by category:',
    all_label = 'All Items'
  } = $props();

  function handle_change(event) {
    onchange(event.target.value);
  }
</script>

<div class="filter-section">
  <label for="category-filter">{label}</label>
  <select 
    id="category-filter"
    value={selected}
    onchange={handle_change}
  >
    {#each categories as category}
      <option value={category}>
        {category === 'all' ? all_label : category}
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
    background: #FFF8F0;
    padding: 1rem 2rem;
    border-radius: 30px;
    border: 2px solid #F4A460;
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
  }

  label {
    font-weight: 600;
    color: #4A3728;
  }

  select {
    padding: 0.75rem 1rem;
    border: 2px solid #D2691E;
    border-radius: 20px;
    font-size: 1rem;
    background: white;
    cursor: pointer;
    min-width: 200px;
    color: #4A3728;
    font-family: inherit;
  }

  select:focus {
    outline: none;
    border-color: #8B4513;
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
