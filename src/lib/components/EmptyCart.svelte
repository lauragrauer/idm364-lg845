<script>
</script>

<div class="empty-cart">
  <img src="/images/icon.png" alt="Rilakkuma" class="empty-icon" />
  <h2>Your cart is empty</h2>
  <p>Add some adorable plushies to get started!</p>
  <a href="/" class="continue-shopping">Continue Shopping</a>
</div>

<style>
  .empty-cart {
    text-align: center;
    padding: var(--spacing-xl);
    background: var(--color-bg-card);
    border-radius: var(--radius-xl);
    border: 3px dashed var(--color-primary-lighter);
  }

  .empty-icon {
    width: var(--icon-xl);
    height: var(--icon-xl);
    margin-bottom: var(--spacing-md);
  }

  h2 {
    font-size: var(--font-size-xl);
    margin-bottom: var(--spacing-sm);
  }

  p {
    color: var(--color-text-muted);
    font-size: var(--font-size-md);
    margin-bottom: var(--spacing-xl);
  }

  .continue-shopping {
    display: inline-block;
    padding: var(--spacing-md) var(--spacing-xl);
    background: var(--color-header);
    color: white;
    border-radius: var(--radius-full);
    font-size: var(--font-size-md);
    font-weight: 600;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .continue-shopping:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }
</style>
