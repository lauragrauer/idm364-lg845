<!-- src/lib/components/LoadingSpinner.svelte -->
<script>
  let { 
    message = 'Loading...',
    size = 'medium'
  } = $props();

  const sizes = {
    small: { spinner: 30, border: 3 },
    medium: { spinner: 50, border: 4 },
    large: { spinner: 70, border: 5 }
  };
</script>

<div class="loading">
  <div 
    class="spinner"
    style="
      width: {sizes[size].spinner}px; 
      height: {sizes[size].spinner}px;
      border-width: {sizes[size].border}px;
    "
  ></div>
  {#if message}
    <p>{message}</p>
  {/if}
</div>

<style>
  .loading {
    text-align: center;
    padding: 4rem 0;
  }

  .spinner {
    border-style: solid;
    border-color: #E8D5C4;
    border-top-color: #8B4513;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  p {
    color: #8B7355;
    font-size: 1rem;
  }
</style>
