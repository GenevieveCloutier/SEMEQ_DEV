<script>
    import H1Title from '$lib/components/titres/h1Title.svelte';
    import Recherche from '$lib/components/generaux/recherche.svelte';
    import RechercheNoResult from '$lib/components/generaux/rechercheNoResult.svelte';

    let searchQuery = '';

    export let data;
    const events = data.events;

    import { onMount } from "svelte";

    onMount(()=>{
        const actives = document.querySelectorAll('a.is-active');
        actives.forEach((x)=>x.classList.remove('is-active'));
    document.getElementById('appelsCandidatures').classList.add('is-active')
    });
</script>

<div class="block">

<H1Title title="Appels de candidatures"></H1Title>

<Recherche bind:searchQuery typeRecherche="un événement" />

<div>
    {#if !events}
        <section class="section">
            <p class="title"> Désolé  <span class="icon is-large"><i class="fa-regular fa-face-sad-tear fa-xl"></i></span></p>
            <p class="subtitle">Il n'y a aucun appel de candidature en cours.</p>
        </section>
    {/if}

    {#if events.filter(event => event.nom.toLowerCase().includes(searchQuery.toLowerCase())).length === 0}
        <RechercheNoResult />
    {:else}
    <table class="table is-striped is-fullwidth">
        <thead>
            <tr>
                <th>ÉVÉNEMENTS</th>
                <th>RÉGION</th>
                <th>VILLE</th>
                <th>DATE DE DÉBUT</th>
                <th>DATE DE FIN</th>
                <th>POSTULER</th>
                <th>DATE LIMITE POUR POSTULER</th>
            </tr>
        </thead>
        <tbody>
            {#each events.filter(event => event.nom.toLowerCase().includes(searchQuery.toLowerCase())) as event}
            <tr>
                <td>{event.nom || "Inconnu"}</td>
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
                <td>{event.fin_cand || "Inconnu"}</td>
            </tr>
            {/each}
        </tbody>
    </table>
    {/if}
</div>

</div>