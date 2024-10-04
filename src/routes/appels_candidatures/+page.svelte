<script>
    import H1Title from '$lib/components/titres/h1Title.svelte';
    import Recherche from '$lib/components/generaux/recherche.svelte';
    import RechercheNoResult from '$lib/components/generaux/rechercheNoResult.svelte';

    export let data;

    const events = data.events;
</script>

<div class="block">

<H1Title title="Appels de candidatures"></H1Title>

<div>
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
            {#each events as event}
            <tr>
                <td>{event.nom || "Inconnu"}</td>
                <td></td>
                <td>{event.ville.nom || "Inconnu"}</td>
                <td>{event.debut_even || "Inconnu"}</td>
                <td>{event.fin_even || "Inconnu"}</td>
                <td>
                    {#if event.form_cand}   <!-- Formulaire appel de candidatures -->
                        <a href="{event.form_cand}" class="button" style="background-color: #053682; color:white">Postuler</a>
                    {:else if event.courriel}   <!-- Courriel pour information ou inscription -->
                        <a href="mailto:{event.courriel}" class="button" style="background-color: #053682; color:white">Postuler</a>
                    {:else if event.fb_even}    <!-- Événement Facebook -->
                        <a href="{event.fb_even}" class="button" style="background-color: #053682; color:white">Postuler</a>
                    {:else if event.site}   <!-- Site Web ou page Facebook événement -->
                        <a href="{event.site}" class="button" style="background-color: #053682; color:white">Postuler</a>
                    {:else}     <!-- Aucune information -->
                        <p>Méthode inconnue</p>
                    {/if}
                </td>
                <td>{event.fin_cand || "Inconnu"}</td>
            </tr>
            {:else}
                <section class="section">
                    <h1 class="title"> Désolé  <span class="icon is-large"><i class="fa-regular fa-face-sad-tear fa-xl"></i></span></h1>
                    <h2 class="subtitle">Il n'y a aucun appel de candidature en cours.</h2>
                </section>
            {/each}
        </tbody>
    </table>
</div>

</div>