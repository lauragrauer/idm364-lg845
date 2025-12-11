<!-- src/lib/components/QuantityInput.svelte -->
<script>
  let { 
    value = 1,
    min = 1,
    max = 99,
    label = 'Quantity',
    onchange = () => {}
  } = $props();

  function decrement() {
    if (value > min) {
      onchange(value - 1);
    }
  }

  function increment() {
    if (value < max) {
      onchange(value + 1);
    }
  }
</script>

<div class="quantity-input" role="group" aria-label={label}>
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
    type="text"
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

<style>
  .quantity-input {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
  }

  .qty-btn {
    width: 36px;
    height: 36px;
    border: 2px solid var(--color-primary-lighter);
    background: var(--color-bg-card);
    color: var(--color-primary);
    border-radius: var(--radius-sm);
    cursor: pointer;
    font-size: var(--font-size-lg);
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
  }

  .qty-btn:hover:not(:disabled) {
    background: var(--color-primary);
    color: white;
  }

  .qty-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  input {
    width: 50px;
    height: 36px;
    text-align: center;
    border: 2px solid var(--color-primary-lighter);
    border-radius: var(--radius-sm);
    font-size: var(--font-size-md);
    font-weight: 600;
    color: var(--color-text);
    background: white;
    cursor: default;
  }
</style>
