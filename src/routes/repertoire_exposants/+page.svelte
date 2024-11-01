
<script>
    import H1Title from "$lib/components/titres/h1Title.svelte";
    import H2Title from "$lib/components/titres/h2Title.svelte";
    import BoutonGris from "$lib/components/boutons/boutonGris.svelte";
    import BoutonBleu from "$lib/components/boutons/boutonBleu.svelte";
    import Accordion, { createAccordionContext } from "$lib/components/generaux/accordion.svelte";
	import { Cookies } from "nodemailer/lib/fetch";
    import { onMount } from "svelte";
    import Recherche from '$lib/components/generaux/recherche.svelte';
    import RechercheNoResult from '$lib/components/generaux/rechercheNoResult.svelte';

	export let data;
	const { villes, regions, evenements, utilisateurs } = data;

//pour créer le contexte pour que les sections d'accordéon se referment quand on clique sur une autre
    createAccordionContext();

// Barre de recherche
    let searchQuery = '';
    let filteredEvents = evenements;

//fonction recherche, affiche des événements seulement si on clique sur la barre
    function barreRecherche(){
        let resultatRecherche = document.querySelector("#resultatRecherche");
        let repertoireEntier = document.querySelector("#repertoireEntier");
        resultatRecherche.hidden = false;
        repertoireEntier.hidden = true;
    }

//pour effacer le résultat de la recherche
    function effacerRecherche(){
        searchQuery = "";
        let resultatRecherche = document.querySelector("#resultatRecherche");
        let repertoireEntier = document.querySelector("#repertoireEntier");
        resultatRecherche.hidden = true;
        repertoireEntier.hidden = false; 
    }

const domaines = [
   'Accessoires et sacs',
    'Agro-alimentaire',
    'Animaux',
    'Arts visuels',
    'Bijoux et joaillerie',
    'Ceramique et poterie',
    'Decoration interieure',
    'Ébenisterie',
    'Forgerie',
    'Jouets et loisirs',
    'Papeteries_ et livres',
    'Photographies',
    'Produits corporels',
    'Sculpture',
    'Tricots et crochet',
    'Verre et vitrail',
    'Vêtements (tous)',
    'Vetements pour enfants',
    'Zero déchet',
    'Autres'
];

//afficher la flèche bleue quand une région est sélectionnée
  function afficherFleche(){
    resetCouleur()
    this.style.backgroundImage="url('/src/lib/img/app/fleche.png')";
    this.style.color="white";
    this.style.fontWeight="bold";
    //document.getElementById('tableauMois').scrollIntoView()
    };

//pour la recherche de région
    let evenementsFiltre =""
    let valeurDomaine = "" 
    let valeurRegion = ""

function filtreRegionDate(){
    evenementsFiltre = evenements;
    evenementsFiltre = evenementsFiltre.filter(
        evenement => evenement.ville.region.nom.split(" ")[0] == valeurRegion
       // && (evenement.debut_even.toISOString().split("-")[1] == valeurDomaine)
    );  
}

//aller chercher la valeur de la région sélectionnée puis l'envoyer dans la fonction filtreRegionDate()
  function chercherValeurRegion(){
    valeurRegion = this.value;

    //exceptions pour les 2 regions à double tiret
    if(valeurRegion == "Saguenay-Lac-Saint-Jean"){
        valeurRegion = "Saguenay--Lac-Saint-Jean"
    }
    if(valeurRegion == "Gaspésie-Îles-de-la-Madeleine"){
        valeurRegion = "Gaspésie--Îles-de-la-Madeleine"
    }

    filtreRegionDate()
    return valeurRegion
  }

  
//aller chercher la valeur de la région sélectionnée puis l'envoyer dans la fonction filtreRegionDate()
function chercherValeurDomaine(){
    valeurDomaine = this.value;
    if(valeurDomaine == 'Accessoires et sacs'){valeurDomaine = 1}

    // 'agro-alimentaire': 2,
    // 'animaux': 4,
    // 'arts_visuels': 8,
    // 'bijoux_joaillerie': 16,
    // 'ceramique_poterie': 32,
    // 'decoration_interieure': 64,
    // 'ebenisterie': 128,
    // 'forgerie': 256,
    // 'jouets_loisirs': 512,
    // 'papeteries_livres': 1024,
    // 'photographies': 2048,
    // 'produits_corporels': 4096,
    // 'sculpture': 8192,
    // 'tricots_crochets': 16384,
    // 'verre_vitrail': 32768,
    // 'vetements_tous': 65536,
    // 'vetements_enfants': 131072,
    // 'zero_dechet': 262144,
    // 'autres': 524288

    console.log(valeurDomaine)



    filtreRegionDate()
    return valeurRegion
  }


//pour enlever la flèche bleue quand une autre région est sélectionnée
  function resetCouleur(){
    let boutons = document.getElementsByName('region');
    for (let x=0; x<boutons.length; x++){
        boutons[x].style.backgroundImage="none";
        boutons[x].style.color="#184287";
        boutons[x].style.fontWeight="normal"
    }
  };
  
  </script>

<H1Title title={"Répertoire des exposants"} />

<div class="container is-fluid mb-6 has-text-centered">
    <p>Trouvez plusieurs artisans et créateurs professionnels du Québec au même endroit!<br>
        Tous les exposants présents dans notre répertoire sont des artistes et/ou entrepreneurs ayant un statut légal
         et conforme aux lois provinciales. (NEQ, MAPAQ etc)
    </p>

    <div class="columns">
        <div class="column mt-2 is-four-fifths">
            <Recherche bind:searchQuery typeRecherche="un événement" />
        </div>
        <div class="column block">
            <BoutonBleu fonction={barreRecherche} texte={"Rechercher un événement"} />
        </div>
    </div>
</div>
<!-- 
<div class="container is-centered">
    
    <div hidden id="resultatRecherche">
        <H2Title title={"Résultats de la recherche"} />
        {#if filteredEvents.filter(event => event.nom.toLowerCase().includes(searchQuery.toLowerCase())).length === 0}
            <RechercheNoResult />
        {:else}
        <div class="columns is-multiline">
            {#each filteredEvents.filter(event => event.nom.toLowerCase().includes(searchQuery.toLowerCase())) as event}
                <div class="column is-one-quarter">
                    <UnEvenement evenement={event} />
                </div>  
        {/each}
    </div>
        {/if}
        <div class="column is-align-content-center">
            <BoutonGris fonction={effacerRecherche} texte={"Effacer les résultats de recherche"} />
        </div>
    </div>
</div> -->

<div id="repertoireEntier" class="container">
    <!-- pour ajouter des explications sur l'utilisation sur un mobile -->
    <div class=" content has-background-light is-hidden-desktop is-hidden-tablet-only">
        <ol type="1">
            <li>Clique sur une <strong>région</strong> ci-dessous</li>
            <li>Clique ensuite sur le <strong>la catégorie</strong> pour laquelle tu voudrais voir les entreprises enregistrés
            (sous la liste des régions)</li>
        </ol>
    </div>
    <div class="columns">

        <div class="column mt-4 texte-bleu is-one-quarter">
            <div>
                {#each regions as region}
                    <input readonly bind:value={region.nom}
                        class="is-uppercase has-text-left bouton" 
                        on:click={afficherFleche} 
                        on:click={chercherValeurRegion}
                        name="region">
                    <br>
                {/each}
            </div>
        </div>

       <div class="box column">
             {#if evenementsFiltre}
                {#each domaines as domaine}
                <Accordion>

                    <span  slot="head">
                        <input readonly bind:value={domaine}
                        class="has-text-black"
                            on:click={chercherValeurDomaine}
                            name="domaine">
                    </span>

                    <div slot="details">
                        <div class="columns is-multiline">
                    {#if evenementsFiltre.length > 0}
                         {#each evenementsFiltre as evenement}
                            <div class="column is-one-quarter">
                                <!-- <UnEvenement evenement={evenement} /> -->
                            </div>
                        {/each}
                        {:else}
                        <p class=" box bordure px-3 py-3 has-text-centered ">Aucun exposant dans cette catégorie<br>
                             à afficher pour le moment!</p>
                    {/if}
                    </div>
                </div>
                </Accordion>
                {/each}
                {:else}
                <p class="px-4 py-4 has-text-centered is-size-5 has-background-warning-light">Pour voir les exposants inscrits
                    , cliquez sur une région</p>
            {/if}
        </div>
    </div> 
</div>



<style>
    .texte-bleu{
        color: #184287;
    }

    .bordure{
        border:1px solid lightgray;
    }

    .bouton{
    width:100%;
    background-repeat: no-repeat ;
    padding: 0.2rem;
    }

    input {
        border:none;
        color: #184287;
        font-size:1rem;
        outline:none;
        cursor: pointer;
    }



</style>
