<script>
    import H1Title from "$lib/components/titres/h1Title.svelte";
    import Recherche from "$lib/components/generaux/recherche.svelte";
    import RechercheNoResult from '$lib/components/generaux/rechercheNoResult.svelte';
    import BoutonBleu from "../../../lib/components/boutons/boutonBleu.svelte";
    import { onMount } from "svelte";

  onMount(()=>{
        const actives = document.querySelectorAll('a.is-active');
        actives.forEach((x)=>x.classList.remove('is-active'));
    document.getElementById('evenements').classList.add('is-active')
    });


    export let data;
    let { evenements } = data;
    
    let searchQuery = '';
    let orientation = 1; //Variable pour gérer le sens de triage

    /**
    * Trie le tableau `utilisateurs` selon le champ spécifié en fonction de l'orientation.
    *
    * Cette fonction effectue un tri des utilisateurs en fonction d'un champ donné,
    * change l'orientation du tri à chaque appel et met à jour l'icône de tri.
    *
    * @param {Event} event - L'événement déclenché par l'interaction de l'utilisateur.
    * @param {string} champ - Le nom du champ selon lequel trier les utilisateurs.
    */
    function triage(event, champ){
    evenements.sort((a, b) => {
          return    (a[champ]?.toUpperCase() < b[champ]?.toUpperCase()) ? -1*orientation :
                    (a[champ]?.toUpperCase() > b[champ]?.toUpperCase()) ? +1*orientation :
                     0;
        });
        evenements = evenements; //Pour bind le tableau
        orientation *= -1;
        if(orientation == 1) //pour changer l'icon
            event.target.classList.replace('fa-arrow-down-short-wide', 'fa-arrow-up-short-wide');
        else
            event.target.classList.replace('fa-arrow-up-short-wide', 'fa-arrow-down-short-wide');
    }

</script>

<H1Title title={"Demandes d'approbation"} />

<div class="block">
    <div class="columns is-align-content-center">
        <div class="column">
            <Recherche bind:searchQuery typeRecherche="un événement" />
        </div>
        <div class="column is-narrow">
            <div class="control block">
                <a href="/gestionnaire/evenements/nouveau" class="button is-primary-blue">Ajouter un événement</a>
            </div>
        </div>
    </div>
    {#if evenements.filter(x => {
        const recherche = searchQuery.toLowerCase();
        return x.nom.toLowerCase().includes(recherche)
      }).length === 0}
        <RechercheNoResult />
    {:else}
    <div class="block table-container">
    <table class="table is-hoverable is-striped is-fullwidth ">
        <thead class="has-text-centered">
            <tr>
                <th>Nom de l'événement <button on:click={event => triage(event, 'nom')}><span class="icon"><i class="fa-solid fa-arrow-down-short-wide"></i></span></button></th>
                <th>Organisateur <button on:click={event => triage(event, 'utilisateur_nom')}><span class="icon"><i class="fa-solid fa-arrow-down-short-wide"></i></span></button></th>
                <th>Courriel <button on:click={event => triage(event, 'courriel')}><span class="icon"><i class="fa-solid fa-arrow-down-short-wide"></i></span></button></th>
                <th>Date <button on:click={event => triage(event, 'debut_even')}><span class="icon"><i class="fa-solid fa-arrow-down-short-wide"></i></span></button></th>
                <th>Région <button on:click={event => triage(event, 'region')}><span class="icon"><i class="fa-solid fa-arrow-down-short-wide"></i></span></button></th>
            </tr>
        </thead>
        <tbody>
            {#each evenements.filter(x => {
                const recherche = searchQuery.toLowerCase();
                return x.nom.toLowerCase().includes(recherche);
              }) as evenement}
            <tr on:click={() => window.location = `./approbations/${evenement.id}`}>
                <td> {evenement.nom}</td>
                <td>{evenement.utilisateur.prenom} {evenement.utilisateur.nom}</td>
                <td>{evenement.courriel}</td>
                {#if evenement.debut_even !== evenement.fin_even}
                <td>du {evenement.debut_even} au {evenement.fin_even}</td>
                {:else}
                <td>{evenement.debut_even}</td>
                {/if}
                <td>{evenement.region}</td>
            </tr>
            {/each}
        </tbody>
    </table>
</div>    
    {/if}
</div>