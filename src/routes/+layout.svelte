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
<img class="footer-bear" src="/images/cow-rilakkuma.jpg" alt="Rilakkuma" />
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
    background: #D2691E;
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
  }

  .footer-note {
    font-size: 0.9rem;
    opacity: 0.7;
  }
</style>
