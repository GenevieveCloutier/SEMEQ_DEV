<script>
    import H1Title from "$lib/components/titres/h1Title.svelte";
    import H2Title from "$lib/components/titres/h2Title.svelte";
    import Recherche from '$lib/components/generaux/recherche.svelte';
    import RechercheNoResult from '$lib/components/generaux/rechercheNoResult.svelte';

    export let data;
    const achats = data.achats;

    // Barre de recherche
    let searchQuery = '';

    // Filtrage par type
    const types = data.types;
    let selectionType = '';
    let filteredAchats = achats;

    function filtrerType() {
        filteredAchats = achats;

        if (selectionType) {
            filteredAchats = filteredAchats.filter(achat => achat.produit.type.id === selectionType);
        }
    }

    import { onMount } from "svelte";

    onMount(()=>{
        const actives = document.querySelectorAll('a.is-active');
        actives.forEach((x)=>x.classList.remove('is-active'));
        document.getElementById('formationsOutils').classList.add('is-active')
    });
</script>

<div class="container is-fluid">

    <H1Title title={"Mes formations et outils"} />

    <div class="columns mx-2">
        <div class="column is-three-quarters">
            <Recherche bind:searchQuery typeRecherche="une formation ou un outil" />
        </div>
        <div class="column is-one-quarter">
            <!-- Filtre de type de produit -->
            <div class="field is-grouped is-grouped-right">
                <div class="field is-horizontal">
                    <div class="field-label">
                        <label for="type" class="label">Type</label>
                    </div>
                    <div class="field-body">
                        <div class="field is-small">
                            <div class="controle">
                                <div class="select">
                                    <select id="selectionType" bind:value={selectionType}>
                                        <option value="">---</option>
                                        {#each types as type}
                                            <option value={type.id}>{type.nom}</option>
                                        {/each}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="field is-small">
                            <button class="button" on:click={filtrerType}> <span class="icon is-small"><i class="fa fa-filter"></i></span> </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    {#if filteredAchats.filter(achat =>
        achat.produit.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
        achat.produit.desc.toLowerCase().includes(searchQuery.toLowerCase())
    ).length === 0}
            <RechercheNoResult />
    {:else}
        <div class="fixed-grid is-col-min-10 has-1-cols-mobile has-2-cols-tablet has-3-cols-desktop has-4-cols-widescreen has-4-cols-fullhd">
            <div class="grid">
            {#each filteredAchats.filter(achat =>
                achat.produit.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
                achat.produit.desc.toLowerCase().includes(searchQuery.toLowerCase())
            ) as achat}        
                <div class="cell">
                    <div class="card">
                        <div class="card-image">
                        <figure class="image is-1by1">
                            <img src="{`/${achat.produit.photo}`}" alt="Photo {achat.produit.nom}"/>
                        </figure>
                        </div>
                
                        <div class="card-content">
                            <div class="content has-text-centered">
                                <H2Title title={achat.produit.nom} />
                            </div>
                            <div class="content tronquer-desc-3lignes" id="test">{achat.produit.desc}</div>
                        </div>
                        <footer class="card-footer">
                            <a href={`${achat.produit.url}`} target="_blank" download={achat.produit.nom} id="btnConsulter" class="button is-fullwidth">Consulter</a>
                        </footer>
                    </div>
                </div>
            {/each}
            </div>
        </div>
    {/if}

</div>

<style>
    #btnConsulter {
		background-color: #184287;
		border-radius: 0.75rem;
		color: white;
	}

    .cell {
        display: flex;          /* Égaliser la hauteur des cell d'une même ligne */
        flex-direction: column; /* Égaliser la hauteur des cell d'une même ligne */
    }
    
    .card {
        background-color: #d9d9d9;
        padding: 0.25rem;
        height: 100%;           /* Égaliser la hauteur des card d'une même ligne */
        display: flex;          /* Égaliser la hauteur des card d'une même ligne */
        flex-direction: column; /* Égaliser la hauteur des card d'une même ligne */
    }

    .card-footer {
        margin-top: auto; /* Coller en bas de card */
    }

    /* Limiter la taille de la zone de texte des descriptions de produits sur 3 lignes */
    .tronquer-desc-3lignes {
            display: -webkit-box;
            line-clamp: 3;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
    }
</style>