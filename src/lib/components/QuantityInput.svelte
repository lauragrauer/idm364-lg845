<!-- src/lib/components/QuantityInput.svelte -->
<script>
  let { 
    id = '',
    value = 1,
    min = 1,
    max = 99,
    label = 'Quantity:',
    showLabel = true,
    onchange = () => {}
  } = $props();

  function handleInput(e) {
    const newValue = parseInt(e.target.value) || min;
    const clampedValue = Math.max(min, Math.min(max, newValue));
    onchange(clampedValue);
  }

  function increment() {
    if (value < max) {
      onchange(value + 1);
    }
  }

  function decrement() {
    if (value > min) {
      onchange(value - 1);
    }
  }
</script>

<div class="quantity-control">
  {#if showLabel}
    <label for={id}>{label}</label>
  {/if}
  
  <div class="quantity-wrapper">
    <button 
      type="button" 
      class="qty-btn" 
      onclick={decrement}
      disabled={value <= min}
      aria-label="Decrease quantity"
    >
      −
    </button>
    
    <input
      {id}
      type="number"
      {min}
      {max}
      {value}
      oninput={handleInput}
      aria-label={!showLabel ? label : undefined}
    />
    
    <button 
      type="button" 
      class="qty-btn" 
      onclick={increment}
      disabled={value >= max}
      aria-label="Increase quantity"
    >
      +
    </button>
  </div>
</div>

<style>
  .quantity-control {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .quantity-control label {
    font-size: 0.875rem;
    color: #6B5344;
  }

  .quantity-wrapper {
    display: flex;
    align-items: center;
    gap: 0;
    border: 2px solid var(--primary-light, #D2691E);
    border-radius: 10px;
    overflow: hidden;
  }

  .qty-btn {
    width: 36px;
    height: 36px;
    background: var(--bg-secondary, #FFF5EB);
    border: none;
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--primary, #8B4513);
    cursor: pointer;
    transition: background 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .qty-btn:hover:not(:disabled) {
    background: var(--primary-lighter, #F4A460);
    color: white;
  }

  .qty-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  input {
    width: 50px;
    padding: 0.5rem 0;
    border: none;
    border-left: 2px solid var(--primary-light, #D2691E);
    border-right: 2px solid var(--primary-light, #D2691E);
    font-size: 1rem;
    text-align: center;
    color: var(--text-primary, #4A3728);
    background: white;
    -moz-appearance: textfield;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input:focus {
    outline: none;
    background: var(--secondary, #FFFACD);
  }
</style>
