<script>
    import H1Title from "$lib/components/titres/h1Title.svelte";
    import BoutonGris from "$lib/components/boutons/boutonGris.svelte";
    import Recherche from '$lib/components/generaux/recherche.svelte';
    import RechercheNoResult from '$lib/components/generaux/rechercheNoResult.svelte';

    export let data;
    const produits = data.produits;

    // Barre de recherche
    let searchQuery = '';
</script>

<div class="block">

<H1Title title={"Boutique"} />

<Recherche bind:searchQuery typeRecherche="une formation, un outil ou un abonnement" />

<div>
    {#if produits}
        <RechercheNoResult />
    {:else}
    {#each produits as produit}
        {produit.nom}
    {/each}
    {/if}
</div>


<BoutonGris lien={"/creation_compte/exposant"} texte={"Acheter un abonnement exposant"}/>
<BoutonGris lien={"/creation_compte/organisateur"}  texte={"Acheter un abonnement événement"}/>

</div>