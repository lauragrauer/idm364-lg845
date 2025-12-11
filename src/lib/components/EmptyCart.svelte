<script>
  let { 
    icon = '🧸', 
    title = 'Your cart is empty',
    message = 'Add some adorable plushies to get started!',
    link_href = '/',
    link_text = 'Continue Shopping'
  } = $props();
</script>

<div class="empty-cart">
  <div class="empty-icon">{icon}</div>
  <h2>{title}</h2>
  <p>{message}</p>
  <a href={link_href} class="continue-shopping">{link_text}</a>
</div>

<style>
  .empty-cart {
    text-align: center;
    padding: 4rem 2rem;
    background: #FFF8F0;
    border-radius: 20px;
    border: 3px dashed #F4A460;
  }

  .empty-icon {
    font-size: 6rem;
    margin-bottom: 1rem;
  }

  .empty-cart h2 {
    color: #4A3728;
    margin-bottom: 0.5rem;
  }

  .empty-cart p {
    color: #8B7355;
    margin-bottom: 2rem;
  }

  .continue-shopping {
    display: inline-block;
    padding: 1rem 2rem;
    background: #614632;
    color: white;
    border-radius: 30px;
    font-weight: 600;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .continue-shopping:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(139, 69, 19, 0.4);
  }
</style>
