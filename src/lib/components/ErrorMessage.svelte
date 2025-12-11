<!-- src/lib/components/ErrorMessage.svelte -->
<script>
  import Button from './Button.svelte';

  let { 
    message = 'Something went wrong',
    showRetry = true,
    retryText = 'Try Again',
    onRetry = () => window.location.reload()
  } = $props();
</script>

<div class="error">
  <div class="error-icon">😿</div>
  <p class="error-message">{message}</p>
  {#if showRetry}
    <Button variant="danger" onclick={onRetry}>
      {retryText}
    </Button>
  {/if}
</div>

<style>
  .error {
    text-align: center;
    padding: 4rem 2rem;
    background: var(--bg-primary, #FFF8F0);
    border-radius: 20px;
    border: 3px dashed var(--danger, #fc8181);
  }

  .error-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
  }

  .error-message {
    color: var(--danger, #fc8181);
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
  }
</style>
