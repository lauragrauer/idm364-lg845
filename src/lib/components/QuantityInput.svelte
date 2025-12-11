<!-- src/lib/components/QuantityInput.svelte -->
<script>
  let { 
    id = '',
    value = 1,
    min = 1,
    max = 99,
    label = 'Quantity:',
    show_label = true,
    onchange = () => {}
  } = $props();

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
  {#if show_label}
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
      -
    </button>
    
    <input
      {id}
      type="number"
      {min}
      {max}
      {value}
      readonly
      aria-label={label}
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
    font-size: 1rem;
    color: #6B5344;
  }

  .quantity-wrapper {
    display: flex;
    align-items: center;
    gap: 0;
    border: 2px solid #D2691E;
    border-radius: 10px;
    overflow: hidden;
  }

  .qty-btn {
    width: 36px;
    height: 36px;
    background: #FFF5EB;
    border: none;
    font-size: 1.5rem;
    font-weight: 600;
    color: #8B4513;
    cursor: pointer;
    transition: background 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .qty-btn:hover:not(:disabled) {
    background: #F4A460;
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
    border-left: 2px solid #D2691E;
    border-right: 2px solid #D2691E;
    font-size: 1rem;
    text-align: center;
    color: #4A3728;
    background: white;
    cursor: default;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
</style>