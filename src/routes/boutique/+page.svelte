<script>
    import H1Title from "$lib/components/titres/h1Title.svelte";
    import H2Title from "$lib/components/titres/h2Title.svelte";
    import BoutonGris from "$lib/components/boutons/boutonGris.svelte";
    import Recherche from '$lib/components/generaux/recherche.svelte';
    import RechercheNoResult from '$lib/components/generaux/rechercheNoResult.svelte';
    import SectionBoutique from "$lib/components/boites/sectionBoutique.svelte";
    import AbonnementsBoutique from "$lib/components/boites/AbonnementsBoutique.svelte";

    export let data;
    const produits = data.produits;

    // Filtrer produits selon leur type
    const formations = produits.filter(produit => produit.type.nom === 'formation');
    const outils = produits.filter(produit => produit.type.nom === 'outil');
    const abonnements = produits.filter(produit => produit.type.nom === 'abonnement');

    // Pour les liens vers les pages détails d'achat d'abonnements
    let idAboExposant = abonnements.find(abonnement => abonnement.nom === 'Abonnement exposant')?.id;
    let idAboOrganisateur = abonnements.find(abonnement => abonnement.nom === 'Abonnement organisateur')?.id;

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
    <div class="grid is-col-min-10">
    {#each formations.filter(produit => produit.nom.toLowerCase().includes(searchQuery.toLowerCase())) as formation}
        <SectionBoutique id={formation.id} photo={formation.photo}, nom={formation.nom}, desc={formation.desc}, prix_a={formation.prix_a}, prix_v={formation.prix_v}></SectionBoutique>
    {/each}
    </div>

    <H2Title title={"Outils et ressources"} />
    <div class="grid is-col-min-10">
    {#each outils.filter(produit => produit.nom.toLowerCase().includes(searchQuery.toLowerCase())) as outil}
        <SectionBoutique id={outil.id} photo={outil.photo}, nom={outil.nom}, desc={outil.desc}, prix_a={outil.prix_a}, prix_v={outil.prix_v}></SectionBoutique>
    {/each}
    </div>

    <H2Title title={"Abonnements"} />
    <div class="grid is-col-min-10">
    {#each abonnements.filter(produit => produit.nom.toLowerCase().includes(searchQuery.toLowerCase())) as abonnement}
        <AbonnementsBoutique lienExposant={`./boutique/${idAboExposant}`} lienOrganisateur={`./boutique/${idAboOrganisateur}`}></AbonnementsBoutique>
    {/each}
    </div>

    <!-- Retirer les 2 boutons lorsque "Valider le panier" vers Étape 1 "Connexion/Création de compte" fonctionnel -->
    <BoutonGris lien={"/creation_compte/exposant"} texte={"Acheter un abonnement exposant"}/>
    <BoutonGris lien={"/creation_compte/organisateur"}  texte={"Acheter un abonnement événement"}/>
{/if}

</div>