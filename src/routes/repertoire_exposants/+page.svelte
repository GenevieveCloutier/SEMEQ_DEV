
<script>
    import H1Title from "$lib/components/titres/h1Title.svelte";
    import H2Title from "$lib/components/titres/h2Title.svelte";
    import BoutonGris from "$lib/components/boutons/boutonGris.svelte";
    import BoutonBleu from "$lib/components/boutons/boutonBleu.svelte";
    import Accordion, { createAccordionContext, getAccordionContext } from "$lib/components/generaux/accordion.svelte";
	import { Cookies } from "nodemailer/lib/fetch";
    import { onMount } from "svelte";
    import Recherche from '$lib/components/generaux/recherche.svelte';
    import RechercheNoResult from '$lib/components/generaux/rechercheNoResult.svelte';
    import UnExposant from "../../lib/components/repertoires/unExposant.svelte";
    import { domaines, recupMappage } from '$lib/outils/compteurBinaire';

	export let data;
	const { villes, regions, evenements, exposants } = data;

//pour créer le contexte pour que les sections d'accordéon se referment quand on clique sur une autre
const { current } = createAccordionContext();

// Fonction pour fermer tous les accordéons (si on change de région)
    function fermerAccordeons() {
        current.set(null); // Réinitialise `current` pour fermer tous les accordéons
    }

//pour fermer le message de notification
    let notificationVisible = true;
    function supprimerNotification() {
        notificationVisible = false;
    }

// Barre de recherche
    let searchQuery = '';
    let filteredExposant = exposants;

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

//     const afficherDomaines = [
//     'Accessoires et sacs', 
//     'Agro-alimentaire', 
//     'Animaux',
//     'Arts visuels',
//     'Bijoux et joaillerie',
//     'Céramique et poterie',
//     'Décoration interieure',
//     'Ébenisterie',
//     'Forgerie',
//     'Jouets et loisirs',
//     'Papeterie et livres',
//     'Photographies',
//     'Produits corporels',
//     'Sculpture',
//     'Tricots et crochet',
//     'Verre et vitrail',
//     'Vêtements (tous)',
//     'Vetements pour enfants',
//     'Zéro déchet',
//     'Autres'


//afficher la flèche bleue quand une région est sélectionnée
  function afficherFleche(){
    resetCouleur()
    this.style.backgroundImage="url('/src/lib/img/app/fleche.png')";
    this.style.color="white";
    this.style.fontWeight="bold";
    };

    let exposantsFiltre ="";
    let chaqueDomaine = "";
    let tableauDomaines = "";
    let valeurDomaine = "" ;
    let valeurRegion = "";

function filtreRegionDomaine(){
    exposantsFiltre = exposants;
    exposantsFiltre = exposantsFiltre.filter(
        exposant => exposant.ville.region.nom.split(" ")[0] == valeurRegion
        && (exposant.domaine & valeurDomaine) == valeurDomaine
    ); 
    return exposantsFiltre
}

//aller chercher la valeur de la région sélectionnée puis l'envoyer dans la fonction filtreRegionDomaine()
  function chercherValeurRegion(){
    valeurRegion = this.value;

    //exceptions pour les 2 regions à double tiret
    if(valeurRegion == "Saguenay-Lac-Saint-Jean"){
        valeurRegion = "Saguenay--Lac-Saint-Jean"
    }
    if(valeurRegion == "Gaspésie-Îles-de-la-Madeleine"){
        valeurRegion = "Gaspésie--Îles-de-la-Madeleine"
    }

    filtreRegionDomaine()
    return valeurRegion
  }

//aller chercher la valeur de la région sélectionnée puis l'envoyer dans la fonction filtreRegionDomaine()
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

    filtreRegionDomaine()
    return valeurDomaine
  }

  //pour n'afficher que les catégories qui contiennent des exposants
  function trierDomaine(){

    chaqueDomaine = "";
    tableauDomaines = [];
    exposants;
    valeurRegion;
    tableauDomaines = new Set();

    for(let x = 0; x<exposants.length; x++){
        if(exposants[x].ville.region.nom.split(" ")[0] == valeurRegion){
            chaqueDomaine = (recupMappage(exposants[x].domaine, domaines))
        }
       for (let y = 0; y<chaqueDomaine.length; y++){
        if(chaqueDomaine[y] == 'accessoires_sacs'){chaqueDomaine[y] = 'Accessoires et sacs'}
        if(chaqueDomaine[y] == 'agro-alimentaire'){chaqueDomaine[y] = 'Agro-alimentaire'}
        if(chaqueDomaine[y] == 'animaux'){chaqueDomaine[y] = 'Animaux'}
        if(chaqueDomaine[y] =='arts_visuels'){chaqueDomaine[y] = 'Arts visuels'}
        if(chaqueDomaine[y] =='bijoux_joaillerie'){chaqueDomaine[y] = 'Bijoux et joaillerie'}
        if(chaqueDomaine[y] =='ceramique_poterie'){chaqueDomaine[y] = 'Céramique et poterie'}
        //ajouter les autres si ce n'est pas possible de les changer dans le compteurBinaire

        tableauDomaines.add(chaqueDomaine[y])
       }
    };
    return [...tableauDomaines] // retourne un tableau des noms des domaines où il y a un exposant dans la région
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
            <Recherche bind:searchQuery typeRecherche="un exposant" />
        </div>
        <div class="column block">
            <BoutonBleu fonction={barreRecherche} texte={"Rechercher un exposant"} />
        </div>
    </div>
</div>

<div class="container is-centered">
    
    <div hidden id="resultatRecherche">
        <H2Title title={"Résultats de la recherche"} />
        {#if filteredExposant.filter(event => event.nom.toLowerCase().includes(searchQuery.toLowerCase())).length === 0}
            <RechercheNoResult />
        {:else}
        <div class="columns is-multiline">
            {#each filteredExposant.filter(exposant => exposant.nom.toLowerCase().includes(searchQuery.toLowerCase())) as exposant}
                <div class="column is-one-quarter">
                    <UnExposant exposant={ exposant } />
                </div>  
        {/each}
    </div>
        {/if}
        <div class="column is-align-content-center">
            <BoutonGris fonction={effacerRecherche} texte={"Effacer les résultats de recherche"} />
        </div>
    </div>
</div> 

<div id="repertoireEntier" class="container">
    <!-- pour ajouter des explications sur l'utilisation sur un mobile -->
    <div class=" content has-background-light is-hidden-desktop is-hidden-tablet-only">
        <ol type="1">
            <li>Clique sur une <strong>région</strong> ci-dessous</li>
            <li>Clique ensuite sur la <strong> catégorie</strong> pour laquelle tu voudrais voir les entreprises enregistrées
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
                        on:click={trierDomaine}
                        on:click={fermerAccordeons}
                        name="region">
                    <br>
                {/each}
            </div>
        </div>

       <div class="box column">
        
             {#if exposantsFiltre && [...tableauDomaines].length > 0}
           
                {#if notificationVisible}
                    <div class="notification is-info is-light">
                        <button class="delete" on:click={supprimerNotification}></button>
                        Clique sur les catégorie pour voir les exposants. Tu peux aussi sélectionner une 
                        autre région en tout temps.
                    </div>
                {/if}
             
                    {#each tableauDomaines as domaine}
                    <Accordion>

                        <span  slot="head">
                            <input readonly bind:value={domaine}
                            class="has-text-black"
                                on:click={chercherValeurDomaine}
                                on:click={trierDomaine}
                                name={domaine}>
                        </span>

                        <div slot="details">
                            <div class="columns is-multiline">
                        {#if exposantsFiltre.length > 0}
                            {#each exposantsFiltre as exposant}
                                <div class="column is-one-quarter">
                                    <UnExposant exposant={exposant}/>
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

                    {:else if exposantsFiltre && [...tableauDomaines].length == 0}
                    <div class="encadre">
                        <p>Aucun exposant n'est enregistré dans cette région pour le moment.</p>
                        <p>Choisir une autre région en cliquant dans la liste des régions</p>
                    </div>
                    {:else}
                    <p class="px-4 py-4 has-text-centered is-size-5 has-background-info-light">Pour voir les exposants inscrits
                        , clique sur une région</p>
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
    .encadre{
        border: 1px solid lightgray;
        border-radius: 5px;
        padding: 20px;
        width:60%;
        margin:auto;
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
