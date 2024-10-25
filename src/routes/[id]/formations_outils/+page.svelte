<script>
    import H1Title from "$lib/components/titres/h1Title.svelte";
    import H2Title from "$lib/components/titres/h2Title.svelte";
    import Recherche from '$lib/components/generaux/recherche.svelte';
    import RechercheNoResult from '$lib/components/generaux/rechercheNoResult.svelte';
    import BoutonBleu from '$lib/components/boutons/boutonBleu.svelte';

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
                            <img src="{achat.produit.photo}" alt="Photo {achat.produit.nom}"/>
                        </figure>
                        </div>
                
                        <div class="card-content">
                            <div class="content">
                                <div class="content has-text-centered">
                                    <H2Title title={achat.produit.nom} />
                                </div>
                                <div class="tronquer-texte-card">{achat.produit.desc}</div><br>
                                <div class="content has-text-centered">
                                    <BoutonBleu lien={`${achat.produit.url}`} target={"_blank"} fichierNom={achat.produit.nom} texte={'Consulter'} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            {/each}
            </div>
        </div>
    {/if}

</div>