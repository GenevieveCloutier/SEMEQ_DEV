
<script>
    import H1Title from "$lib/components/titres/h1Title.svelte";
    import H2Title from "$lib/components/titres/h2Title.svelte";
    import BoutonGris from "$lib/components/boutons/boutonGris.svelte";
    import BoutonBleu from "$lib/components/boutons/boutonBleu.svelte";
    import BoutonMince from "$lib/components/boutons/boutonMince.svelte";
    import Accordion, { createAccordionContext } from "$lib/components/generaux/accordion.svelte";
	import { Cookies } from "nodemailer/lib/fetch";
    import { onMount } from "svelte";
    import Recherche from '$lib/components/generaux/recherche.svelte';
    import RechercheNoResult from '$lib/components/generaux/rechercheNoResult.svelte';
    import { domaines, recupMappage } from '$lib/outils/compteurBinaire';

	export let data;
	const { villes, regions, evenements, exposants } = data;

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

const afficherDomaines = [
   'Accessoires et sacs',
    'Agro-alimentaire',
    'Animaux',
    'Arts visuels',
    'Bijoux et joaillerie',
    'Céramique et poterie',
    'Décoration interieure',
    'Ébenisterie',
    'Forgerie',
    'Jouets et loisirs',
    'Papeterie et livres',
    'Photographies',
    'Produits corporels',
    'Sculpture',
    'Tricots et crochet',
    'Verre et vitrail',
    'Vêtements (tous)',
    'Vetements pour enfants',
    'Zéro déchet',
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
    let exposantsFiltre =""
    let valeurDomaine = "" 
    let valeurRegion = ""

function filtreRegionDate(){
    exposantsFiltre = exposants;
    exposantsFiltre = exposantsFiltre.filter(
        exposant => exposant.ville.region.nom.split(" ")[0] == valeurRegion
        && (exposant.domaine & valeurDomaine) == valeurDomaine
    ); 
}
console.log(exposants[2].domaine)

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
    if(valeurDomaine == 'Accessoires et sacs'){valeurDomaine = '1'};
    if(valeurDomaine == 'Agro-alimentaire'){valeurDomaine = '2'};
    if(valeurDomaine == 'Animaux'){valeurDomaine = '4'};
    if(valeurDomaine == 'Arts visuels'){valeurDomaine = '8'};
    if(valeurDomaine == 'Bijoux et joaillerie'){valeurDomaine = '16'};
    if(valeurDomaine == 'Céramique et poterie'){valeurDomaine = '32'};
    if(valeurDomaine == 'Décoration intérieure'){valeurDomaine = '64'};
    if(valeurDomaine == 'Ébenisterie'){valeurDomaine = '128'};
    if(valeurDomaine == 'Forgerie'){valeurDomaine = '256'};
    if(valeurDomaine == 'Jouets et loisirs'){valeurDomaine = '512'};
    if(valeurDomaine == 'Papetrie et livres'){valeurDomaine = '1024'};
    if(valeurDomaine == 'Photographies'){valeurDomaine = '2048'};
    if(valeurDomaine == 'Produits corporels'){valeurDomaine = '4096'};
    if(valeurDomaine == 'Sculpture'){valeurDomaine = '8192'};
    if(valeurDomaine == 'Tricot et crochet'){valeurDomaine = '16384'};
    if(valeurDomaine == 'Verre et vitrail'){valeurDomaine = '32768'};
    if(valeurDomaine == 'Vêtements (tous)'){valeurDomaine = '65536'};
    if(valeurDomaine == 'Vêtements pour enfants'){valeurDomaine = '131072'};
    if(valeurDomaine == 'Zéro déchet'){valeurDomaine = '262144'};
    if(valeurDomaine == 'Autres'){valeurDomaine = '524288'};

    filtreRegionDate()
    return valeurDomaine
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
             {#if exposantsFiltre}
                {#each afficherDomaines as domaine}
                <Accordion>

                    <span  slot="head">
                        <input readonly bind:value={domaine}
                        class="has-text-black"
                            on:click={chercherValeurDomaine}
                            name="domaine">
                    </span>

                    <div slot="details">
                        <div class="columns is-multiline">
                    {#if exposantsFiltre.length > 0}
                         {#each exposantsFiltre as exposant}
                            <div class="column is-one-quarter">
                                <div class=" card is-equal-height bordure mx-2">
                                    <div class="card-content">
                                        <p class="has-text-weight-bold">{exposant.nom}</p>

                                        <p class="mt-2"><strong>Ville:</strong></p>
                                        <p>{exposant.ville.nom}</p>
                                        <p>{recupMappage(exposant.domaine, domaines)}</p>
                                        
                                        <!-- si l'utilisateur est abonné, afficher le bouton pour la fiche, sinon afficher l'icone -->
                                         {#if exposant}
                                            <div class="has-text-centered mt-2">
                                                <BoutonMince lien={'/repertoire_exposants/id'} texte={"Voir la fiche"} />
                                            </div>
                                
                                        {:else if exposant.fb_even}
                                            <figure class=" image is-32x32 mt-2 is-pulled-right ">
                                                <a href="{exposant.fb_even}" target="blank"><img src="/src/lib/img/app/facebook.svg" alt="Page facebook de l'événement"></a>
                                            </figure>
                                                 
                                        {:else if exposant.site}
                                            <figure class=" image is-32x32 mt-2 is-pulled-right">
                                                <a href="{exposant.site}" target="blank"><img src="/src/lib/img/app/site_web.svg" alt="site web de l'événement"></a>
                                            </figure>
                                        {/if}
                                    </div>
                                </div>
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
