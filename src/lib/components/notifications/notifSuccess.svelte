<script>
    export let success

  function supprimerNotification(event) {
    event.target.parentNode.remove();
  }
</script>

<div class="block">
    {#if success}
    <div class="notification is-success has-text-centered">
        <button class="delete" on:click={supprimerNotification}></button>
        <p>{success}</p>
    </div>
    {/if}
</div>