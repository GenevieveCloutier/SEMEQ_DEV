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

<H1Title title={"Tous les codes promo"} />

<div class="section">
	<div class="columns is-align-content-center">
		<div class="column">
			<Recherche bind:searchQuery typeRecherche="un code par partenaire ou avantage" />
		</div>
		<div class="column is-narrow">
			<div class="control block">
				<BoutonBleu texte={"Ajouter un code"} lien={`./codes_promo/nouveau`}></BoutonBleu>
			</div>
		</div>
	</div>
    {#if codes.filter(code =>
        code.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
        code.avantage.toLowerCase().includes(searchQuery.toLowerCase())
    ).length === 0}
        <RechercheNoResult />
    {:else}
    <div class="block table-container">
    <table class="table is-hoverable is-striped is-fullwidth ">
        <thead class="has-text-centered">
            <tr>
                <th>Partenaire <button on:click={event => triage(event, 'partenaire')}><span class="icon"><i class="fa-solid fa-arrow-down-short-wide"></i></span></button></th>
                <th>Avantage <button on:click={event => triage(event, 'avantage')}><span class="icon"><i class="fa-solid fa-arrow-down-short-wide"></i></span></button></th>
                <th>Code <button on:click={event => triage(event, 'code')}><span class="icon"><i class="fa-solid fa-arrow-down-short-wide"></i></span></button></th>
                <th>Expiration <button on:click={event => triage(event, 'expiration')}><span class="icon"><i class="fa-solid fa-arrow-down-short-wide"></i></span></button></th>
            </tr>
        </thead>
        <tbody>
            {#each codes.filter(code =>
                code.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
                code.avantage.toLowerCase().includes(searchQuery.toLowerCase())
            ) as code}
            <tr on:click={() => window.location = `./codes_promo/${code.id}`}>
                <td>{code.nom}</td>
                <td>{code.avantage}</td>
                <td>{code.code}</td>
                <td>{code.expiration}</td>
            </tr>
            {/each}
        </tbody>
    </table>
    </div>
    {/if}

</div>