<script>
  import { page } from '$app/stores';
  let isNotFound = $page.status === 404;
  let serverProblem = $page.status === 500;
  let accessForbidden = $page.status === 403;
</script>

{#if isNotFound}
  <h1 class="title has-text-centered">{$page.status} <br>
      Oups, cette page n'existe pas...</h1>
  <h2 class="subtitle has-text-centered">Pour le moment</h2>
{:else if serverProblem}
  <h1 class="title has-text-centered">Erreur {$page.status}</h1>
  <h2 class="subtitle has-text-centered">Ce n'est pas vous, c'est notre serveur qui a de la difficulté</h2>
{:else if accessForbidden}
  <h1 class="title has-text-centered">Erreur {$page.status}</h1>
  <h2 class="subtitle has-text-centered">{$page.error?.message}</h2>
{:else}
  <h1 class="title has-text-centered">Erreur {$page.status}: {$page.error?.message}</h1>
{/if}
<div class="has-text-centered">
  <a href="/" class="button">Retour à l'accueil</a>
</div>