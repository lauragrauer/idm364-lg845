<script>
</script>

<section class="hero">
  <img src="/images/icon.png" alt="Rilakkuma" class="hero-icon" />
  <h1>Welcome to Rilakkuma Shopp</h1>
  <p>Find your new cuddly friend from our collection of adorable plushies!</p>
</section>

<style>
  .hero {
    text-align: center;
    margin-bottom: var(--spacing-xl);
    padding: var(--spacing-xl) 0;
  }

  .hero-icon {
    width: var(--icon-xl);
    height: var(--icon-xl);
    margin-bottom: var(--spacing-md);
    animation: bounce 2s ease-in-out infinite;
  }

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  h1 {
    font-size: var(--font-size-3xl);
    margin-bottom: var(--spacing-md);
  }

  p {
    font-size: var(--font-size-lg);
    color: var(--color-text-muted);
  }

  @media (max-width: 768px) {
    h1 {
      font-size: var(--font-size-2xl);
    }

    .hero-icon {
      width: var(--icon-lg);
      height: var(--icon-lg);
    }
  }
</style>
