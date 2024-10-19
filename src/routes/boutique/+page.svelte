<script>
    import H1Title from "$lib/components/titres/h1Title.svelte";
    import H2Title from "$lib/components/titres/h2Title.svelte";
    import BoutonGris from "$lib/components/boutons/boutonGris.svelte";
    import Recherche from '$lib/components/generaux/recherche.svelte';
    import RechercheNoResult from '$lib/components/generaux/rechercheNoResult.svelte';

    export let data;
    const produits = data.produits;

    // Filtrer produits selon leur type
    const formations = produits.filter(produit => produit.type.nom === 'formation');
    const outils = produits.filter(produit => produit.type.nom === 'outil');
    const abonnements = produits.filter(produit => produit.type.nom === 'abonnement');

    // Barre de recherche
    let searchQuery = '';
</script>

<div class="block">

<H1Title title={"Boutique"} />

<Recherche bind:searchQuery typeRecherche="une formation, un outil ou un abonnement" />

{#if produits.filter(produit => produit.nom.toLowerCase().includes(searchQuery.toLowerCase())).length === 0}
    <RechercheNoResult />
{:else}
    <H2Title title={"Formations"} />
    {#each formations.filter(produit => produit.nom.toLowerCase().includes(searchQuery.toLowerCase())) as formation}
        <li>{formation.nom}</li>
    {/each}

    <H2Title title={"Outils et ressources"} />
    {#each outils.filter(produit => produit.nom.toLowerCase().includes(searchQuery.toLowerCase())) as outil}
        <li>{outil.nom}</li>
    {/each}

    <H2Title title={"Abonnements"} />
    {#each abonnements.filter(produit => produit.nom.toLowerCase().includes(searchQuery.toLowerCase())) as abonnement}
        <li>{abonnement.nom}</li>
    {/each}
{/if}

<br><br>
<BoutonGris lien={"/creation_compte/exposant"} texte={"Acheter un abonnement exposant"}/>
<BoutonGris lien={"/creation_compte/organisateur"}  texte={"Acheter un abonnement événement"}/>

</div>