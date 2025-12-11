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
    background: #FFF5EB;
  }

  main {
    flex: 1;
    padding: 2rem 0;
  }
</style>
