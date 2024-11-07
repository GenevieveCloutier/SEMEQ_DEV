<script>
	import { fly } from "svelte/transition";
	import Retour from "../generaux/retour.svelte";
	import { handleUserDelete } from "../../outils/formHandlers";

    export let id;
    let confirmation = false;
</script>

<button class="button is-danger" on:click|preventDefault={()=>{confirmation = !confirmation}}>Supprimer mon compte</button>


{#if confirmation}
<div class="box has-text-centered popup" in:fly={{y:200, duration: 1500}} out:fly={{y:-200, duration: 1500}}>
    <p>Voulez vous vraiment supprimer votre compte?</p>
    <p class="help">Cette action est irréversible et entraîneras la suppression de toutes vos données</p>
    <div class="block">
        <button class="button" on:click|preventDefault={()=>{confirmation = !confirmation}}>Retour</button>
        <button class="button is-danger" on:click|preventDefault={handleUserDelete(id)}> Confirmer la suppression</button>
    </div>
</div>
{/if}


<style>
    .popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999; /* Mettre un z-index élevé pour être au-dessus de tout */
}
</style>