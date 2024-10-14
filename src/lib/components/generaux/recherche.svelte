<script>
    export let searchQuery
    export let typeRecherche
</script>

<div class="field">
    <div class="control block">
        <input class="input" type="text" name="recherche" placeholder="Rechercher {typeRecherche}..." bind:value={searchQuery} />
    </div>
</div>
<br>