<script>
  let { 
    variant = 'primary',
    size = 'medium',
    full_width = false,
    disabled = false,
    type = 'button',
    onclick,
    children
  } = $props();
</script>

<button
  {type}
  {disabled}
  class="btn btn-{variant} btn-{size}"
  class:full-width={full_width}
  {onclick}
>
  {@render children?.()}
</button>

<style>
  .btn {
    font-family: inherit;
    font-weight: 600;
    border-radius: var(--radius-full);
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-sm);
  }

  .btn:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  /* Sizes */
  .btn-small {
    padding: var(--spacing-sm) var(--spacing-md);
    font-size: var(--font-size-sm);
  }

  .btn-medium {
    padding: var(--spacing-md) var(--spacing-lg);
    font-size: var(--font-size-md);
  }

  .btn-large {
    padding: var(--spacing-lg) var(--spacing-xl);
    font-size: var(--font-size-lg);
  }

  /* Variants */
  .btn-primary,
  .btn-success {
    background: var(--color-success);
    color: white;
    border: none;
  }

  .btn-primary:hover:not(:disabled),
  .btn-success:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }

  .btn-secondary {
    background: var(--color-header);
    color: white;
    border: none;
  }

  .btn-secondary:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }

  .btn-danger {
    background: var(--color-danger);
    color: white;
    border: none;
  }

  .btn-danger:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(252, 129, 129, 0.4);
  }

  .btn-danger-outline {
    background: transparent;
    color: var(--color-danger);
    border: 2px solid var(--color-danger);
  }

  .btn-danger-outline:hover:not(:disabled) {
    background: var(--color-danger);
    color: white;
  }

  .full-width {
    width: 100%;
  }

  .btn:active:not(:disabled) {
    transform: translateY(0);
  }
</style>
