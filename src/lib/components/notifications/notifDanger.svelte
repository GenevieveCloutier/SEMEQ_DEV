<script>
    export let erreur

  function supprimerNotification(event) {
    event.target.parentNode.remove();
  }
</script>

<div class="block">
    {#if erreur}
    <div class="notification is-danger has-text-centered">
        <button class="delete" on:click={supprimerNotification}></button>
        <p>{erreur}</p>
    </div>
    {/if}
</div>