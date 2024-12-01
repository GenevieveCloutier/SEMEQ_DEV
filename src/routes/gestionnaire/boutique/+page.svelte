<script>
    import H1Title from "$lib/components/titres/h1Title.svelte";
    import H2Title from "$lib/components/titres/h2Title.svelte";
    import Recherche from '$lib/components/generaux/recherche.svelte';
    import RechercheNoResult from '$lib/components/generaux/rechercheNoResult.svelte';
    import SectionBoutique from "$lib/components/boites/sectionBoutique.svelte";
    import SectionAbonnement from "$lib/components/boites/sectionAbonnement.svelte";
	import { onMount } from "svelte";
    
    export let data;
    const produits = data.produits;

    onMount(()=>{
        const actives = document.querySelectorAll('a.is-active');
        actives.forEach((x)=>x.classList.remove('is-active'));
    document.getElementById('boutique').classList.add('is-active')
    });

    // Filtrer produits selon leur type
    const formations = produits.filter(produit => produit.type.nom === 'Formation');
    const outils = produits.filter(produit => produit.type.nom === 'Outil');
    const abonnements = produits.filter(produit => produit.type.nom === 'Abonnement');

    // Barre de recherche
    let searchQuery = '';
</script>

<H1Title title={"Tous les items de la boutique"} />

<div class="container is-fluid">

    <Recherche bind:searchQuery typeRecherche="une formation, un outil ou une ressource" />

    {#if searchQuery != ""} <!-- Affichage uniquement résultats de recherche -->

        {#if produits.filter(produit =>
            produit.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
            produit.desc.toLowerCase().includes(searchQuery.toLowerCase())
        ).length === 0}
            <RechercheNoResult />
        {/if}

        <div class="fixed-grid is-col-min-10 has-2-cols-mobile has-3-cols-tablet has-4-cols-desktop has-4-cols-widescreen has-5-cols-fullhd">
            <div class="grid">
                {#each produits.filter(produit =>
                    produit.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    produit.desc.toLowerCase().includes(searchQuery.toLowerCase())
                ) as item}
                    {#if item.type.nom == 'Abonnement'}
                    <SectionAbonnement id={item.id} photo={`/${item.photo}`} nom={item.nom} desc={item.desc} prix={item.prix_a} prix_sup={item.prix_v}/>
                    {:else}
                    <SectionBoutique id={item.id} photo={`/${item.photo}`} nom={item.nom} desc={item.desc} prix_a={item.prix_a} prix_v={item.prix_v}/>
                    {/if}
                {/each}
            </div>
        </div>
    {:else} <!-- Affichage de tous les produits par type -->    
    <div class="block" id="abonnements">
        <H2Title title={"Abonnements"} />
        {#if abonnements.length === 0}
            Aucun abonnement disponible pour le moment.
        {:else}
            <div class="fixed-grid is-col-min-10 has-2-cols-mobile has-3-cols-tablet has-4-cols-desktop has-4-cols-widescreen has-5-cols-fullhd">
                <div class="grid">
                {#each abonnements as abonnement}
                <SectionAbonnement id={abonnement.id} photo={`/${abonnement.photo}`} nom={abonnement.nom} desc={abonnement.desc} prix={abonnement.prix_a} prix_sup={abonnement.prix_v}/>
                {/each}
                </div>
            </div>
        {/if}
    </div>
    

        <div class="block" id="formations">
            <H2Title title={"Formations"} />
            {#if formations.length === 0}
                Aucune formation disponible pour le moment.
            {:else}
                <div class="fixed-grid is-col-min-10 has-2-cols-mobile has-3-cols-tablet has-4-cols-desktop has-4-cols-widescreen has-5-cols-fullhd">
                    <div class="grid">
                    {#each formations as formation}
                        <SectionBoutique id={formation.id} photo={`/${formation.photo}`} nom={formation.nom} desc={formation.desc} prix_a={formation.prix_a} prix_v={formation.prix_v}></SectionBoutique>
                    {/each}
                    </div>
                </div>
            {/if}
        </div>

        <div class="block" id="outils">
            <H2Title title={"Outils et ressources"} />
            {#if outils.length === 0}
                Aucun outil disponible pour le moment.
            {:else}
                <div class="fixed-grid is-col-min-10 has-2-cols-mobile has-3-cols-tablet has-4-cols-desktop has-4-cols-widescreen has-5-cols-fullhd">
                    <div class="grid">
                    {#each outils as outil}
                        <SectionBoutique id={outil.id} photo={`/${outil.photo}`} nom={outil.nom} desc={outil.desc} prix_a={outil.prix_a} prix_v={outil.prix_v}></SectionBoutique>
                    {/each}
                    </div>
                </div>
            {/if}
        </div>
    {/if}

</div>