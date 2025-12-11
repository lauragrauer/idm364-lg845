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
        <p>&copy; 2025 Rilakkuma Shop 💕💕💕💕</p>
        <p class="footer-note">Please give these guys a home!</p>
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
    background: #614632;
    color: white;
    padding: 2rem 1rem;
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
  }

  .footer-note {
    font-size: 0.9rem;
    opacity: 0.7;
  }
</style>
