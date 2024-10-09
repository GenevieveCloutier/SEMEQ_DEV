<script>  
    import { page } from '$app/stores';
    let notfound = null; 
    if($page.status === 404)
        notfound = true;
    
  </script>
  
  {#if notfound}
  
  <h1 class="title has-text-centered">{$page.status} <br>
    Oups, cette page n'existe pas...</h1>
    <h2 class="subtitle has-text-centered">Pour le moment</h2>
    {:else}
    <h1 class="title has-text-centered">{$page.status}: {$page.message}</h1>
  {/if}
  <div class="has-text-centered">
    <a href="/" class="button">Retour à l'accueil</a>
  </div>