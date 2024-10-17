<script>
    import H1Title from '$lib/components/titres/h1Title.svelte';
    import Recherche from '$lib/components/generaux/recherche.svelte';
    import RechercheNoResult from '$lib/components/generaux/rechercheNoResult.svelte';

    export let data;
    const events = data.events;

    // Barre de recherche
    let searchQuery = '';

    // Filtrage des villes et régions
    const regions = data.regions;
    const villes = data.villes;
    let selectionRegion = '';
    let selectionVille = '';

    // Événements filtrés selon la ville et/ou la région choisie
    let filteredEvents = events;

    function filtrerLieux() {
        filteredEvents = events;

        if (selectionRegion) {
            filteredEvents = filteredEvents.filter(event => event.ville.region.id === selectionRegion);
        }

        if (selectionVille) {
            filteredEvents = filteredEvents.filter(event => event.ville.nom === selectionVille);
        }
    }

    // Mettre en évidence le lien actif dans menu latéral utilisateur
    import { onMount } from "svelte";

    onMount(()=>{
        const actives = document.querySelectorAll('a.is-active');
        actives.forEach((x)=>x.classList.remove('is-active'));
        document.getElementById('appelsCandidatures').classList.add('is-active')
    });
</script>

<div class="block">

<H1Title title={"Appels de candidatures"} />

<!-- Filtres des villes et régions -->
<div class="field is-grouped is-grouped-right">
    <div class="field is-horizontal">
        <div class="field-body">
            <div class="field is-small">
                <div class="controle">
                    <div class="select is-small">
                        <select id="selectionRegion" bind:value={selectionRegion}>
                            <option value="">Toutes les régions</option>
                            {#each regions as region}
                                <option value={region.id}>{region.nom}</option>
                            {/each}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="field is-horizontal">
        <div class="field-body">
            <div class="field is-small">
                <div class="controle">
                    <div class="select is-small">
                        <select id="selectionVille" bind:value={selectionVille}>
                            <option value="">Toutes les villes</option>
                            {#each villes as ville}
                                <option value={ville.nom}>{ville.nom} ({ville.region.nom})</option>
                            {/each}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="field is-horizontal"><button class="button is-small" on:click={filtrerLieux}> <span class="icon is-small"><i class="fa fa-filter"></i></span> </button></div>
</div>

<Recherche bind:searchQuery typeRecherche="un événement" />


<div>
    {#if filteredEvents.filter(event => event.nom.toLowerCase().includes(searchQuery.toLowerCase())).length === 0}
        <RechercheNoResult />
    {:else}
    <table class="table is-striped is-fullwidth">
        <thead>
            <tr class="has-text-centered">
                <th>ÉVÉNEMENTS</th>
                <th>RÉGION</th>
                <th>VILLE</th>
                <th>DATE DE DÉBUT</th>
                <th>DATE DE FIN</th>
                <th>POSTULER</th>
                <th>LIMITE POUR POSTULER</th>
            </tr>
        </thead>
        <tbody>
            {#each filteredEvents.filter(event => event.nom.toLowerCase().includes(searchQuery.toLowerCase())) as event}
            <tr>
                <td>{event.nom}</td>
                <td>{event.ville.region.nom || "Inconnue"}</td>
                <td>{event.ville.nom || "Inconnue"}</td>
                <td>{event.debut_even || "Inconnu"}</td>
                <td>{event.fin_even || "Inconnu"}</td>
                <td>
                    {#if event.form_cand}   <!-- Formulaire appel de candidatures -->
                        <a href="{event.form_cand}" target="_blank" class="button" style="background-color: #053682; color:white">Postuler</a>
                    {:else if event.courriel}   <!-- Courriel pour information ou inscription -->
                        <a href="mailto:{event.courriel}" class="button" style="background-color: #053682; color:white">Postuler</a>
                    {:else if event.fb_even}    <!-- Événement Facebook -->
                        <a href="{event.fb_even}" target="_blank" class="button" style="background-color: #053682; color:white">Postuler</a>
                    {:else if event.site}   <!-- Site Web ou page Facebook événement -->
                        <a href="{event.site}" target="_blank" class="button" style="background-color: #053682; color:white">Postuler</a>
                    {:else}     <!-- Aucune information -->
                        <p>Méthode inconnue</p>
                    {/if}
                </td>
                <td>{event.fin_cand}</td>
            </tr>
            {/each}
        </tbody>
    </table>
    {/if}
</div>

</div>