<script>
  let { 
    icon = '🧸',
    title = 'Welcome to Rilakkuma Shop',
    subtitle = 'Find your new cuddly friend from our collection of adorable plushies!'
  } = $props();
</script>

<section class="hero">
  <span class="hero-icon">{icon}</span>
  <h1>{title}</h1>
  <p>{subtitle}</p>
</section>

<style>
  .hero {
    text-align: center;
    margin-bottom: 3rem;
    padding: 2rem 0;
  }

  .hero-icon {
    font-size: 4rem;
    display: block;
    margin-bottom: 1rem;
    animation: bounce 2s ease-in-out infinite;
  }

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  h1 {
    font-size: 3rem;
    color: #4A3728;
    margin-bottom: 1rem;
    font-family: 'Nunito', sans-serif;
  }

  p {
    font-size: 1.25rem;
    color: #8B7355;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }

    p {
      font-size: 1rem;
    }

    .hero-icon {
      font-size: 3rem;
    }
  }
</style>
