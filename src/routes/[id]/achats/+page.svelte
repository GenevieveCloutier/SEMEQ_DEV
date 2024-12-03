<script>
    import H1Title from "$lib/components/titres/h1Title.svelte";

    export let data;
    let { aggregatedAchats } = data;

    // Mettre en évidence le lien actif dans menu latéral gestionnaire
    import { onMount } from "svelte";

    onMount(()=>{
        const actives = document.querySelectorAll('a.is-active');
        actives.forEach((x)=>x.classList.remove('is-active'));
    document.getElementById('achats').classList.add('is-active')
    });

    let orientation = 1; //Variable pour gérer le sens de triage

    /**
    * Trie le tableau `achats` selon le champ spécifié en fonction de l'orientation.
    *
    * Cette fonction effectue un tri des achats en fonction d'un champ donné,
    * change l'orientation du tri à chaque appel et met à jour l'icône de tri.
    *
    * @param {Event} event - L'événement déclenché par l'interaction de l'utilisateur.
    * @param {string} champ - Le nom du champ selon lequel trier les achats.
    */
    function triage(event, champ){
        aggregatedAchats.sort((a, b) => {
          return    (a[champ]?.toUpperCase() < b[champ]?.toUpperCase()) ? -1*orientation :
                    (a[champ]?.toUpperCase() > b[champ]?.toUpperCase()) ? +1*orientation :
                     0;
        });
        aggregatedAchats = aggregatedAchats; //Pour bind le tableau
        orientation *= -1;
        if(orientation == 1) //pour changer l'icon
            event.target.classList.replace('fa-arrow-down-short-wide', 'fa-arrow-up-short-wide');
        else
            event.target.classList.replace('fa-arrow-up-short-wide', 'fa-arrow-down-short-wide');
    }
</script>

<H1Title title={"Historique d'achats"} />

<div class="section">
    <div class="block table-container">
    <table class="table is-hoverable is-striped is-fullwidth">
        <thead class="has-text-centered">
            <tr>
                <th>Date <button on:click={event => triage(event, 'date')}><span class="icon"><i class="fa-solid fa-arrow-down-short-wide"></i></span></button></th>
                <th>Produits commandés</th>
                <th>Total <button on:click={event => triage(event, 'prixTotal')}><span class="icon"><i class="fa-solid fa-arrow-down-short-wide"></i></span></button></th>
                <th class="has-text-centered">Facture</th>
            </tr>
        </thead>
        <tbody>
            {#each aggregatedAchats as achat}
            <tr>
                <td>{achat.date}</td>
                <td>
                    <ul>
                        {#each achat.produits as produit}
                            <li>• {produit}</li>
                        {/each}
                    </ul>
                </td>
                <td>{achat.prixTotal}</td>
                <td class="has-text-centered">
                    <a href="./achats/${achat.date}" target="_blank" class="button is-small" style="background-color: #053682; color:white">Récupérer ma facture</a>
                </td>
            </tr>
            {/each}
        </tbody>
    </table>
    </div>

</div>