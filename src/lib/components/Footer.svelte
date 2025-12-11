<script>
  let { 
    icon = '🧸',
    text = '© 2025 Rilakkuma Shop 💕💕💕💕',
    note = 'Please give these guys a home!'
  } = $props();
</script>

<footer>
  <div class="container">
    <div class="footer-content">
      <span class="footer-bear">{icon}</span>
      <p>{text}</p>
      <p class="footer-note">{note}</p>
    </div>
  </div>
</footer>

<style>
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
