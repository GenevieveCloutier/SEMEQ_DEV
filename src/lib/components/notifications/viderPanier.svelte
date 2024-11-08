<script>
	import { fly } from "svelte/transition";
	import { deleteUserCart } from "../../outils/formHandlers";

    export let utilisateur_id;
    let confirmation = false;
</script>

<button class="button is-danger" on:click|preventDefault={()=>{confirmation = !confirmation}}>Vider le panier</button>

{#if confirmation}
<div class="box has-text-centered popup" in:fly={{y:200, duration: 1500}} out:fly={{y:-200, duration: 1500}}>
    <p>Confirmer la suppression?</p>
    <p class="help">Cette action est irréversible et videra entièrement votre panier.</p>
    <div class="block">
        <button class="button" on:click|preventDefault={()=>{confirmation = !confirmation}}>Retour</button>
        <button class="button is-danger" on:click|preventDefault={deleteUserCart(utilisateur_id)}>Confirmer</button>
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