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

            <div class="field is-small">
                <button class="button is-small" on:click={filtrerLieux}> <span class="icon is-small"><i class="fa fa-filter"></i></span> </button>
            </div>
        </div>
    </div>
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
                <th class="has-text-centered">POSTULER</th>
                <th>LIMITE POUR POSTULER</th>
                <th class="has-text-centered">DÉTAILS</th>
            </tr>
        </thead>
        <tbody>
            {#each filteredEvents.filter(event => event.nom.toLowerCase().includes(searchQuery.toLowerCase())) as event}
            <tr >
                <td>{event.nom}</td>
                <td>{event.ville.region.nom || "Inconnue"}</td>
                <td>{event.ville.nom || "Inconnue"}</td>
                <td>{event.debut_even}</td>
                <td>{event.fin_even}</td>
                <td class="has-text-centered">
                    {#if event.form_cand}   <!-- Formulaire appel de candidatures -->
                        <a href="{event.form_cand}" target="_blank" class="button is-small" style="background-color: #053682; color:white">Postuler</a>
                    {:else if event.courriel}   <!-- Courriel pour information ou inscription -->
                        <a href="mailto:{event.courriel}" class="button is-small" style="background-color: #053682; color:white">Postuler</a>
                    {:else}
                        <p>Méthode inconnue</p>
                    {/if}
                </td>
                <td>{event.fin_cand}</td>
                <td class="is-flex is-justify-content-center has-text-centered">
                    <a href="/repertoire_evenements/{event.id}" target="_blank" class="button is-small" style="background-color: #053682; color:white">Fiche de l'événement</a>

                    <!-- {#if event.utilisateur.abonne}
                        <button on:click={() => window.location = `./repertoire_evenements/${event.id}`} alt="Détails de l'événement">
                            <span class="icon"><i class="button fa-solid fa-magnifying-glass"></i></span>
                        </button>
                    {:else if event.site}
                        <figure class="image is-32x32">
                            <a href="{event.site}" target="blank"><img src="/src/lib/img/app/site_web.svg" alt="Site web de l'événement"></a>
                        </figure>
                    {:else if event.fb_even}
                        <figure class=" image is-32x32">
                            <a href="{event.fb_even}" target="blank"><img src="/src/lib/img/app/facebook.svg" alt="Page facebook de l'événement"></a>
                        </figure>
                    {:else if event.insta_even}
                        <figure class=" image is-32x32">
                            <a href="{event.insta_even}" target="blank"><img src="/src/lib/img/app/insta.svg" alt="Compte Instagram"></a>
                        </figure>
                    {:else if event.tiktok_even}
                        <figure class=" image is-32x32">
                            <a href="{event.tiktok_even}" target="blank"><img src="/src/lib/img/app/tiktok.svg" alt="Compte Tiktok"></a>
                        </figure>
                    {:else}
                        <figure class=" image is-32x32">
                            <img src="/src/lib/img/app/non_disponible.svg" alt="Aucun lien disponible">
                        </figure>
                    {/if} -->
                </td>
            </tr>
            {/each}
        </tbody>
    </table>
    {/if}
</div>

</div>