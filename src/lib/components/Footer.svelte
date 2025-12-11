<!-- src/lib/components/Footer.svelte -->
<script>
</script>

<footer>
  <div class="container">
    <div class="footer-content">
      <img src="/images/icon.png" alt="Rilakkuma" class="footer-icon" />
      <p>© 2025 Rilakkuma Shop</p>
      <p class="footer-note">Please give these guys a home!</p>
    </div>
  </div>
</footer>

<style>
  footer {
    background: var(--color-header);
    color: white;
    padding: var(--spacing-xl) var(--spacing-md);
    text-align: center;
    margin-top: var(--spacing-xl);
  }

  .footer-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-sm);
  }

  .footer-icon {
    width: var(--icon-md);
    height: var(--icon-md);
  }

  footer p {
    font-size: var(--font-size-md);
  }

  .footer-note {
    opacity: 0.7;
  }
</style>
