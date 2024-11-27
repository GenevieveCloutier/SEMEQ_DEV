
<script>
    import H1Title from "$lib/components/titres/h1Title.svelte";
    import H2Title from "$lib/components/titres/h2Title.svelte";
    import H2AvecSousTitre from "$lib/components/titres/h2AvecSousTitre.svelte";
    import BoutonGris from "$lib/components/boutons/boutonGris.svelte";
    import BoutonBleu from "$lib/components/boutons/boutonBleu.svelte";
    import AccordionEvenement, { createAccordionContext, getAccordionContext } from "$lib/components/generaux/accordionEvenement.svelte";
	import { Cookies } from "nodemailer/lib/fetch";
    import Recherche from '$lib/components/generaux/recherche.svelte';
    import RechercheNoResult from '$lib/components/generaux/rechercheNoResult.svelte';
    import UnExposant from "../../lib/components/repertoires/unExposant.svelte";
    import { domaines, recupMappage } from '$lib/outils/compteurBinaire';
    import mappageDomaines from "$lib/data/mappageDomaines.json";

	export let data;
	const { villes, regions, evenements, exposants } = data;

//pour créer le contexte pour que les sections d'accordéon se referment quand on clique sur une autre
    const { current } = createAccordionContext();

// Fonction pour fermer tous les accordéons (si on change de région)
    function fermerAccordeons() {
        current.set(null); 
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

//aller chercher la valeur de la région sélectionnée puis l'envoyer dans la fonction filtreRegionDomaine()
function chercherValeurRegion(){
    valeurRegion = this.value;
    console.log(valeurRegion) //ok

    //exceptions pour les 2 regions à double tiret
    if(valeurRegion == "Saguenay-Lac-Saint-Jean"){
        valeurRegion = "Saguenay--Lac-Saint-Jean"
    }
    if(valeurRegion == "Gaspésie-Îles-de-la-Madeleine"){
        valeurRegion = "Gaspésie--Îles-de-la-Madeleine"
    }

    //pour descendre à la section des domaines sur mobile
    if (window.innerWidth <= 767) {
        window.location.href="/repertoire_exposants#mobile"
    }

    filtreRegionDomaine()
    return valeurRegion
  };

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
function chercherValeurDomaine(domaine){
    valeurDomaine = domaine.valeur;
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
        if(exposants[x].ville){

        if(exposants[x].ville.region.nom.split(" ")[0] == valeurRegion){
            chaqueDomaine = (recupMappage(exposants[x].domaine, domaines))
        }
       for (let y = 0; y<chaqueDomaine.length; y++){
        chaqueDomaine[y] = mappageDomaines[chaqueDomaine[y]] || chaqueDomaine[y];
        tableauDomaines.add(chaqueDomaine[y])
       }
    }
    };
    //pour trier la liste pour affichage par ordre alphabetique
    tableauDomaines = [...tableauDomaines].sort((a, b) => a.nom.localeCompare(b.nom))

    // retourne un tableau des domaines où il y a un exposant dans la région pour l'affichage à l'utilisateur des domaines
    return [...tableauDomaines]
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
         Il est maintenant facile de 
        découvrir les entreprises de chez-nous!
    </p>

    <div class="columns mt-5 is-three-fifths">
        <div class="column mt-2 is-offset-one-fifth">
            <Recherche bind:searchQuery typeRecherche="un exposant" />
        </div>
        <div class="column block has-text-left">
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

       <div id="mobile" class="box column">
        
             {#if exposantsFiltre && [...tableauDomaines].length > 0}
           
                {#if notificationVisible}
                    <div class="notification is-info is-light has-text-centered is-hidden-mobile">
                        <button class="delete" on:click={supprimerNotification}></button>
                        Clique sur les catégorie pour voir les exposants. Tu peux aussi sélectionner une 
                        autre région en tout temps.
                    </div>
                {/if}
                <H2AvecSousTitre title={"Liste des catégories"} subtitle={"Clique sur une catégorie pour afficher les exposants"} />
                    {#each tableauDomaines as domaine}
                    <AccordionEvenement>
                        <span  slot="head">
                            <input readonly bind:value={domaine.nom}
                            class="has-text-black"
                            on:click={(event) => chercherValeurDomaine(domaine)}
                            on:click={(event) => trierDomaine(domaine)}
                            name={domaine.nom}>
                        </span>

                        <div slot="details">
                            <div class="columns is-multiline">
                        {#if exposantsFiltre.length > 0}
                            {#each exposantsFiltre as exposant}
                                <div class="column is-one-quarter">
                                    <UnExposant exposant={exposant}/>
                                </div>
                            {/each}
                            <div class="is-hidden-desktop is-hidden-tablet mt-4 has-text-centered">
                                <BoutonBleu lien={"/repertoire_exposants#repertoireEntier"} texte={"Retour à la liste des régions"}/>
                            </div>
                            {:else}
                            <p class=" box bordure px-3 py-3 mx-3 my-3 has-text-centered ">Aucun exposant dans cette catégorie<br>
                                à afficher pour le moment!</p>
                        {/if}
                        </div>
                    </div>

                    </AccordionEvenement>
                    {/each}

                    {:else if exposantsFiltre && [...tableauDomaines].length == 0}
                    <div class="encadre">
                        <p>Aucun exposant n'est enregistré dans cette région pour le moment.</p>
                        <p>Choisis une autre région en cliquant dans la liste des régions</p>
                        <!-- Bouton pour retourner à la liste des régions sur mobile seulement -->
                        <div class="is-hidden-desktop is-hidden-tablet mt-4">
                            <BoutonBleu lien={"/repertoire_exposants#repertoireEntier"} texte={"Retour à la liste des régions"}/>
                        </div>
                        
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
