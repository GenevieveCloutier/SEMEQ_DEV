<script>
    export let success
</script>

<div class="container has-text-centered">
    {#if success}
    <div class="notification is-success">
        <button class="delete"></button>
        <p>{success}</p>
    </div>
    {/if}
</div>