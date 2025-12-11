<!-- src/lib/components/Notification.svelte -->
<script>
  let { 
    message = '',
    visible = false,
    duration = 3000,
    onclose = () => {}
  } = $props();

  $effect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onclose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  });
</script>

{#if visible}
  <div class="notification">
    <span class="notification-icon">🧸</span>
    <span class="notification-message">{message}</span>
    <button class="notification-close" onclick={onclose}>x</button>
  </div>
{/if}

<style>
  .notification {
    position: fixed;
    top: 100px;
    right: 20px;
    background: #4A3728;
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 12px;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    z-index: 1000;
    animation: slide-in 0.3s ease;
  }

  @keyframes slide-in {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  .notification-icon {
    font-size: 1.5rem;
  }

  .notification-message {
    font-weight: 600;
  }

  .notification-close {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    opacity: 0.7;
    font-size: 1rem;
    padding: 0;
    margin-left: 0.5rem;
  }

  .notification-close:hover {
    opacity: 1;
  }
</style>
