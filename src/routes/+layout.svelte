<!-- src/routes/+layout.svelte -->
<script>
  import Header from '$lib/components/Header.svelte';
  import '../styles/global.css';
</script>

<div class="app">
  <Header />
  
  <main>
    <slot />
  </main>

  <footer>
    <div class="container">
      <div class="footer-content">
        <span class="footer-bear">🧸</span>
        <p>&copy; 2024 Rilakkuma Shop. Made with 💕</p>
        <p class="footer-note">All plushies are looking for a loving home!</p>
      </div>
    </div>
  </footer>
</div>

<style>
  .app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: #FFF5EB;
  }

  main {
    flex: 1;
    padding: 2rem 0;
  }

  footer {
    background: linear-gradient(135deg, #8B4513 0%, #D2691E 50%, #F4A460 100%);
    color: white;
    padding: 2rem 0;
    text-align: center;
    margin-top: 4rem;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .footer-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  .footer-bear {
    font-size: 2rem;
  }

  footer p {
    margin: 0;
    opacity: 0.9;
  }

  .footer-note {
    font-size: 0.875rem;
    opacity: 0.7;
  }
</style>
