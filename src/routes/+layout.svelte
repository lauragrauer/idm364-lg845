<!-- src/routes/+layout.svelte -->
<script>
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import '../styles/global.css';
</script>

<div class="app">
  <Header />
  
  <main>
    <slot />
  </main>

  <Footer />
</div>

<style>
  .app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: var(--color-bg);
  }

  main {
    flex: 1;
    padding: var(--spacing-xl) 0;
  }
</style>
