<!-- src/lib/components/ErrorMessage.svelte -->
<script>
  let { message = 'Something went wrong' } = $props();
</script>

<div class="error">
  <p>{message}</p>
</div>

<style>
  .error {
    text-align: center;
    padding: var(--spacing-xl);
    background: #FFF0F0;
    border: 2px solid var(--color-danger);
    border-radius: var(--radius-md);
  }

  p {
    color: var(--color-danger);
    font-size: var(--font-size-lg);
    font-weight: 600;
  }
</style>
