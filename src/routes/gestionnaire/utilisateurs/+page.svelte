<script>
    import H1Title from "$lib/components/titres/h1Title.svelte";
    import Recherche from "$lib/components/generaux/recherche.svelte";
    import RechercheNoResult from '$lib/components/generaux/rechercheNoResult.svelte';
    export let data;
    let { utilisateursModifie : utilisateurs } = data;
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
    utilisateurs.sort((a, b) => {
          return    (a[champ]?.toUpperCase() < b[champ]?.toUpperCase()) ? -1*orientation :
                    (a[champ]?.toUpperCase() > b[champ]?.toUpperCase()) ? +1*orientation :
                     0;
        });
        utilisateurs = utilisateurs; //Pour bind le tableau
        orientation *= -1;
        if(orientation == 1) //pour changer l'icon
            event.target.classList.replace('fa-arrow-down-short-wide', 'fa-arrow-up-short-wide');
        else
            event.target.classList.replace('fa-arrow-up-short-wide', 'fa-arrow-down-short-wide');
    }

</script>

<H1Title title={"Tous les utilisateurs"} />

<div class="block">

    <Recherche bind:searchQuery typeRecherche="un utilisateur" />

    {#if utilisateurs.filter(x => {
        const recherche = searchQuery.toLowerCase();
        return x.nom.toLowerCase().includes(recherche) || x.prenom.toLowerCase().includes(recherche)
      }).length === 0}
        <RechercheNoResult />
    {:else}
    <div class="block table-container">
    <table class="table is-hoverable is-striped is-fullwidth ">
        <thead class="has-text-centered">
            <tr>
                <th>Utilisateur <button on:click={event => triage(event, 'prenom')}><span class="icon"><i class="fa-solid fa-arrow-down-short-wide"></i></span></button></th>
                <th>Role <button on:click={event => triage(event, 'role_nom')}><span class="icon"><i class="fa-solid fa-arrow-down-short-wide"></i></span></button></th>
                <th>Courriel <button on:click={event => triage(event, 'courriel')}><span class="icon"><i class="fa-solid fa-arrow-down-short-wide"></i></span></button></th>
                <th>Abonnement <button on:click={event => triage(event, 'fin_abo')}><span class="icon"><i class="fa-solid fa-arrow-down-short-wide"></i></span></button></th>
            </tr>
        </thead>
        <tbody>
            <!-- Petit twist pour chercher le nom et le prenom -->
            {#each utilisateurs.filter(x => {
                const recherche = searchQuery.toLowerCase();
                return x.nom.toLowerCase().includes(recherche) || x.prenom.toLowerCase().includes(recherche);
              }) as utilisateur}
            <tr on:click={() => window.location = `./utilisateurs/${utilisateur.id}`}>
                <td> {utilisateur.prenom} {utilisateur.nom}</td>
                <td>{utilisateur.role.nom}</td>
                <td>{utilisateur.courriel}</td>
                <td>{utilisateur.fin_abo}</td>
            </tr>
            {/each}
        </tbody>
    </table>
</div>    
    {/if}
</div>