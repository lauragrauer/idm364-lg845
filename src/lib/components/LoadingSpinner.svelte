<script>
  let { message = 'Loading...' } = $props();
</script>

<div class="loading">
  <img src="/images/icon.png" alt="Loading" class="loading-icon" />
  {#if message}
    <p>{message}</p>
  {/if}
</div>

<style>
  .loading {
    text-align: center;
    padding: var(--spacing-xl) 0;
  }

  .loading-icon {
    width: var(--icon-lg);
    height: var(--icon-lg);
    margin-bottom: var(--spacing-md);
    animation: bounce 1s ease-in-out infinite;
  }

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-15px); }
  }

  p {
    color: var(--color-text-muted);
    font-size: var(--font-size-lg);
  }
</style>
