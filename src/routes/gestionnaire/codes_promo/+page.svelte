<script>
    import H1Title from "$lib/components/titres/h1Title.svelte";
    import Recherche from '$lib/components/generaux/recherche.svelte';
    import RechercheNoResult from '$lib/components/generaux/rechercheNoResult.svelte';
    import BoutonBleu from '$lib/components/boutons/boutonBleu.svelte';

    export let data;
    const codes = data.codes;

    // Mettre en évidence le lien actif dans menu latéral gestionnaire
    import { onMount } from "svelte";

    onMount(()=>{
        const actives = document.querySelectorAll('a.is-active');
        actives.forEach((x)=>x.classList.remove('is-active'));
        document.getElementById('code_promo').classList.add('is-active')
    });

    let searchQuery = '';
    let orientation = 1; //Variable pour gérer le sens de triage

    /**
    * Trie le tableau `codes promos` selon le champ spécifié en fonction de l'orientation.
    *
    * Cette fonction effectue un tri des codes promos en fonction d'un champ donné,
    * change l'orientation du tri à chaque appel et met à jour l'icône de tri.
    *
    * @param {Event} event - L'événement déclenché par l'interaction de l'utilisateur.
    * @param {string} champ - Le nom du champ selon lequel trier les codes promos.
    */
    function triage(event, champ){
    codes.sort((a, b) => {
          return    (a[champ]?.toUpperCase() < b[champ]?.toUpperCase()) ? -1*orientation :
                    (a[champ]?.toUpperCase() > b[champ]?.toUpperCase()) ? +1*orientation :
                     0;
        });
        //codes = codes; //Pour bind le tableau
        orientation *= -1;
        if(orientation == 1) //pour changer l'icon
            event.target.classList.replace('fa-arrow-down-short-wide', 'fa-arrow-up-short-wide');
        else
            event.target.classList.replace('fa-arrow-up-short-wide', 'fa-arrow-down-short-wide');
    }
</script>

<H1Title title={"Liste des codes promo"} />

<div class="block">

    <Recherche bind:searchQuery typeRecherche="un code promotionnel" />

    {#if codes.filter(x => {
        const recherche = searchQuery.toLowerCase();
        return x.nom.toLowerCase().includes(recherche) || x.avantage.toLowerCase().includes(recherche)
      }).length === 0}
        <RechercheNoResult />
    {:else}
    <div class="block table-container">
    <table class="table is-hoverable is-striped is-fullwidth ">
        <thead class="has-text-centered">
            <tr>
                <th>Partenaire <button on:click={event => triage(event, 'partenaire')}><span class="icon"><i class="fa-solid fa-arrow-down-short-wide"></i></span></button></th>
                <th>Avantage <button on:click={event => triage(event, 'avantage')}><span class="icon"><i class="fa-solid fa-arrow-down-short-wide"></i></span></button></th>
                <th>Expiration <button on:click={event => triage(event, 'expiration')}><span class="icon"><i class="fa-solid fa-arrow-down-short-wide"></i></span></button></th>
                <th>Code <button on:click={event => triage(event, 'code')}><span class="icon"><i class="fa-solid fa-arrow-down-short-wide"></i></span></button></th>
            </tr>
        </thead>
        <tbody>
            <!-- Petit twist pour chercher le nom et l'avantage' -->
            {#each codes.filter(x => {
                const recherche = searchQuery.toLowerCase();
                return x.nom.toLowerCase().includes(recherche) || x.prenom.toLowerCase().includes(recherche);
              }) as code}
            <tr on:click={() => window.location = `./codes_promo/${code.id}`}>
                <td>{code.nom}</td>
                <td>{code.avantage}</td>
                <td>{code.expiration}</td>
                <td>{code.code}</td>
            </tr>
            {/each}
        </tbody>
    </table>
    </div>    
    {/if}

</div>

<div class="block has-text-right">
    <BoutonBleu texte={"Ajouter un code"} lien={`./codes_promo/nouveau`}></BoutonBleu>
</div>