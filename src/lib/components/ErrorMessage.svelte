<!-- src/lib/components/ErrorMessage.svelte -->
<script>
  import Button from './Button.svelte';

  let { 
    message = 'Something went wrong',
    show_retry = true,
    retry_text = 'Try Again',
    on_retry = () => window.location.reload()
  } = $props();
</script>

<div class="error">
  <div class="error-icon">😿</div>
  <p class="error-message">{message}</p>
  {#if show_retry}
    <Button variant="danger" onclick={on_retry}>
      {retry_text}
    </Button>
  {/if}
</div>

<style>
  .error {
    text-align: center;
    padding: 4rem 2rem;
    background: #FFF8F0;
    border-radius: 20px;
    border: 3px dashed #fc8181;
  }

  .error-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
  }

  .error-message {
    color: #fc8181;
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
  }
</style>
