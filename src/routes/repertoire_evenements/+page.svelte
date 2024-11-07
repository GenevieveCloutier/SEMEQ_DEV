
<script>
    import H1Title from "$lib/components/titres/h1Title.svelte";
    import H2Title from "$lib/components/titres/h2Title.svelte";
    import BoutonGris from "$lib/components/boutons/boutonGris.svelte";
    import BoutonBleu from "$lib/components/boutons/boutonBleu.svelte";
    import UnEvenement from "$lib/components/repertoires/unEvenement.svelte";
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

    function obtenirMois() {
    const mois = [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];

    let moisAffiches = [];
    let dateActuelle = new Date();
    let moisCourant = dateActuelle.getMonth();

// Ajouter le mois précédent dans le tableau des mois (moisAffiches)
    let moisPrecedent = (moisCourant - 1 + 12) % 12;
    moisAffiches.push(mois[moisPrecedent]);

// Ajouter le mois actuel dans le tableau des mois (moisAffiches)
    moisAffiches.push(mois[moisCourant]);

// Ajouter les mois suivants jusqu'à 10 mois dans le tableau des mois (moisAffiches)
    for (let x = 1; x <= 10; x++) {
        let moisSuivant = (moisCourant + x) % 12;
        moisAffiches.push(mois[moisSuivant]);
    }

    return moisAffiches;
}

let tousLesMois = obtenirMois();

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
    let valeurDate = "" 
    let valeurRegion = ""

function filtreRegionDate(){
    evenementsFiltre = evenements;
    evenementsFiltre = evenementsFiltre.filter(
        evenement => evenement.ville.region.nom.split(" ")[0] == valeurRegion
        && (evenement.debut_even.toISOString().split("-")[1] == valeurDate)
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

//aller chercher la valeur du mois sélectionné puis l'envoyer dans la fonction filtreRegionDate()
    function chercherValeurDate(){
        valeurDate = this.value;
        if(valeurDate == "Janvier"){valeurDate = "01"};
        if(valeurDate == "Février"){valeurDate = "02"};
        if(valeurDate == "Mars"){valeurDate = "03"};
        if(valeurDate == "Avril"){valeurDate = "04"};
        if(valeurDate == "Mai"){valeurDate = "05"};
        if(valeurDate == "Juin"){valeurDate = "06"};
        if(valeurDate == "Juillet"){valeurDate = "07"};
        if(valeurDate == "Août"){valeurDate = "08"};
        if(valeurDate == "Septembre"){valeurDate = "09"};
        if(valeurDate == "Octobre"){valeurDate = "10"};
        if(valeurDate == "Novembre"){valeurDate = "11"};
        if(valeurDate == "Décembre"){valeurDate = "12"};

        filtreRegionDate()
        return valeurDate
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

<H1Title title={"Répertoire des événements"} />

<div class="container is-fluid mb-6 has-text-centered">
    <p>Trouvez tous les salons d'artisans, les événements, les marchés publics éphémères ainsi que les
        expositions du Québec au même endroit.
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
</div>

<div id="repertoireEntier" class="container">
    <!-- pour ajouter des explications sur l'utilisation sur un mobile -->
    <div class=" content has-background-light is-hidden-desktop is-hidden-tablet-only">
        <ol type="1">
            <li>Clique sur une <strong>région</strong> ci-dessous</li>
            <li>Clique ensuite sur le <strong>mois</strong> pour lequel tu voudrais voir les événements enregistrés
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

        <div id="tableauMois" class="box column">
            {#if evenementsFiltre}
                {#each tousLesMois as unMois}
                <Accordion>

                    <span  slot="head">
                        <input readonly bind:value={unMois}
                        class="has-text-black"
                            on:click={chercherValeurDate}
                            name="date">
                    </span>

                    <div slot="details">
                        <div class="columns is-multiline">
                    {#if evenementsFiltre.length > 0}
                         {#each evenementsFiltre as evenement}
                            <div class="column is-one-quarter">
                                <UnEvenement evenement={evenement} />
                            </div>
                        {/each}
                        {:else}
                        <p class=" box bordure px-3 py-3 has-text-centered ">Pas d'événement à afficher pour le moment!<br>
                        <BoutonGris lien= {"repertoire_evenements/inscription_evenement_gratuit"} texte={"Ajouter un événement"} /></p>
                    {/if}
                    </div>
                </div>
                </Accordion>
                {/each}
                {:else}
                <p class="px-4 py-4 has-text-centered is-size-5 has-background-warning-light">Pour voir les événements, cliquez sur une région</p>
            {/if}
        </div>
    </div>
        <!-- Bouton pour ajouter un événement gratuit -->
        <div class="my-6">
        <p class="has-text-centered">
            <BoutonGris 
            lien={"repertoire_evenements/inscription_evenement_gratuit"}    
            texte={"Ajouter un événement"} /> <br>
            <span class="has-text-grey">Un compte est requis pour ajouter un événement. <br>
                Tu seras redirigé si tu n'as pas de compte ou si tu n'es pas connecté.</span>
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
