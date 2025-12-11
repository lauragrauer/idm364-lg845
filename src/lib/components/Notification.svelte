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
    <img src="/images/icon.png" alt="" class="notification-icon" />
    <span class="notification-message">{message}</span>
    <button class="notification-close" onclick={onclose}>x</button>
  </div>
{/if}

<style>
  .notification {
    position: fixed;
    top: 100px;
    right: 20px;
    background: var(--color-header);
    color: white;
    padding: var(--spacing-md) var(--spacing-lg);
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    box-shadow: var(--shadow-lg);
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
    width: var(--icon-sm);
    height: var(--icon-sm);
  }

  .notification-message {
    font-size: var(--font-size-md);
    font-weight: 600;
  }

  .notification-close {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    opacity: 0.7;
    font-size: var(--font-size-lg);
    padding: 0;
    margin-left: var(--spacing-sm);
  }

  .notification-close:hover {
    opacity: 1;
  }
</style>
