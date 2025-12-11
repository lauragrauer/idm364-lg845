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
    border-radius: 25px;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  .btn:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  /* Sizes */
  .btn-small {
    padding: 0.5rem 1rem;
    font-size: 1rem;
  }

  .btn-medium {
    padding: 0.75rem 1.5rem;
    font-size: 1.25rem;
  }

  .btn-large {
    padding: 1.25rem 2rem;
    font-size: 1.5rem;
  }

  /* Variants */
  .btn-primary {
    background: #48bb78;
    color: white;
    border: none;
  }

  .btn-primary:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(139, 69, 19, 0.4);
  }

  .btn-secondary {
    background: #614632;
    color: white;
    border: none;
  }

  .btn-secondary:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(139, 69, 19, 0.4);
  }

  .btn-danger {
    background: #fc8181;
    color: white;
    border: none;
  }

  .btn-danger:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(252, 129, 129, 0.4);
  }

  .btn-danger-outline {
    background: transparent;
    color: #fc8181;
    border: 2px solid #fc8181;
  }

  .btn-danger-outline:hover:not(:disabled) {
    background: #fc8181;
    color: white;
  }

  .btn-success {
    background: #48bb78;
    color: white;
    border: none;
  }

  .btn-success:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(72, 187, 120, 0.4);
  }

  .full-width {
    width: 100%;
  }

  .btn:active:not(:disabled) {
    transform: translateY(0);
  }
</style>
