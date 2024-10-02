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
                <td>{event.nom}</td>
                <td></td>
                <td>{event.ville_id}</td>
                <td>{event.debut_even}</td>
                <td>{event.fin_even}</td>
                <td>
                    {#if event.form_cand}
                    <a href="{event.form_cand}" class="button">Postuler</a>
                    {:else}
                    <a href="{event.courriel}" class="button">Postuler</a>
                    {/if}
                </td>
                <td>{event.fin_cand}</td>
            </tr>
            {/each}
        </tbody>
    </table>
</div>

</div>