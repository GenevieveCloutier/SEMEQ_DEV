<script>
    export let erreur
</script>

<div class="container has-text-centered">
    {#if erreur}
    <div class="notification is-danger">
        <p>{erreur}</p>
    </div>
    {/if}
</div>