<script>
  import { erreur } from "../../outils/formHandlers";
  

  function supprimerNotification(event) {
    event.target.parentNode.remove();
  }
  $: if ($erreur) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    }
</script>

<div class="block">
    {#if $erreur}
    <div class="notification is-danger has-text-centered">
        <button class="delete" on:click={supprimerNotification}></button>
        <p>{$erreur}</p>
    </div>
    {/if}
</div>