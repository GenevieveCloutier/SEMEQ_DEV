
<script>
    import H1Title from "$lib/components/titres/h1Title.svelte";
    import H2Title from "$lib/components/titres/h2Title.svelte";
    import H3Title from "$lib/components/titres/h3Title.svelte";
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
    let valeurRegion = ""

//pour afficher les événements des 7 prochains jours dans le tableau avec les régions
function filtreRegionDate(){
    let date = new Date();
    let valeurJour = date;
    let date7 = new Date();
    date7.setDate(date7.getDate() + 7);

    evenementsFiltre = evenements;
    evenementsFiltre = evenementsFiltre.filter(
        evenement => 
        evenement.ville.region.nom.split(" ")[0] == valeurRegion
        && (
            ((evenement.debut_even >= valeurJour) && (evenement.debut_even <= date7))
            ||  ((evenement.fin_even >= valeurJour) && (evenement.fin_even <= date7))
            )
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

<H1Title title={"Qui sommes nous?"} />

<div class="container is-fluid mb-6 has-text-centered">
    <p>Trouvez tous les salons d'artisans, les événements, les marchés publics éphémères ainsi que les
        expositions du Québec au même endroit.
    </p>
</div>

<div class="container ">
    <p>Découvre nos deux répertoires:</p>
        <ul class="container is-fluid">
            <li>le <a href="/repertoire_exposants"> repertoire des entreprises</a> participant aux marchés</li>
            <li>le <a href="repertoire_evenements">répertoire des marchés</a>, classés par région!</li>
        </ul>
    <br>

<p>Que tu sois en vacances dans une région ou que tu aies envie de découvrir de nouvelles entreprises québécoises près 
de chez-toi, tu pourras, grâce à notre <a href="repertoire_evenements">répertoire des marchés</a>, découvrir les talents de chez-nous!</p>
</div>

<div class="container is-fluid mt-6 mb-6">
    <div class="columns has-text-centered">

        <div class="column">
        </div>

        <div class="column is-flex centerImage">
            <figure class="image is-128x128">
                <img src="https://bulma.io/assets/images/placeholders/128x128.png" alt=""/>
              </figure>
        </div>

        <div class="column is-flex centerImage">
            <figure class="image is-128x128">
                <img src="https://bulma.io/assets/images/placeholders/128x128.png" alt=""/>
              </figure>
        </div>

        <div class="column is-flex centerImage">
            <figure class="image is-128x128">
                <img src="https://bulma.io/assets/images/placeholders/128x128.png" alt=""/>
              </figure>
        </div>

        <div class="column is-flex centerImage">
            <figure class="image is-128x128">
                <img src="https://bulma.io/assets/images/placeholders/128x128.png" alt=""/>
              </figure>
        </div>

        <div class="column is-flex centerImage">
            <figure class="image is-128x128">
                <img src="https://bulma.io/assets/images/placeholders/128x128.png" alt=""/>
              </figure>
        </div>

        <div class="column">
        </div>

    </div>
</div>

<div class="has-text-centered mt-5">
    <H3Title title={"Marchés à venir"} />
</div>

<div class="container mt-6">
    <H2Title title={"En vedette"} />
    <div class="columns is-multiline">
        {#if evenements}
        {#each evenements as evenement}
        <!-- pour n'afficher que les événements qui ont un abonnement actif -->
            {#if evenement.utilisateur.abonne}
                    <UnEvenement evenement={evenement} />
            {/if}
        {/each}
        {/if}
    </div>

</div>

<div id="repertoireEntier" class="container mt-6">
    <!-- pour ajouter des explications sur l'utilisation sur un mobile -->
    <div class=" content has-background-light is-hidden-desktop is-hidden-tablet-only">
        <ol>
            <li>Clique sur une <strong>région</strong> ci-dessous</li>
            <li>Les événements seront affiché plus bas</li>
        </ol>
    </div>
    <hr class="mb-6">
    <div class="columns">
        <div class="column texte-bleu is-one-quarter">
            <H2Title title={"Marchés par région"} />
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
                        <div class="columns is-multiline">
                    {#if evenementsFiltre.length > 0}
                         {#each evenementsFiltre as evenement}
                            <div class="column is-one-quarter">
                                <UnEvenement evenement={evenement} />
                            </div>
                        {/each}
                        {:else}
                        <p class=" box bordure px-3 py-3 mx-3 my-3 has-text-centered ">Pas d'événement à afficher dans cette région cette semaine!<br>
                        <BoutonGris lien= {"repertoire_evenements/inscription_evenement_gratuit"} texte={"Ajouter un événement"} /></p>
                    {/if}
                    </div>
                
                {:else}
                <p class="px-4 py-4 has-text-centered is-size-6 has-background-info-light">Pour voir les événements qui ont lieu cette semaine, clique sur une région</p>
            {/if}
        </div>
    </div>

    <div class="has-text-right">
        <a href = '/repertoire_evenements'>Voir tous les événements (par mois)</a>
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

    .centerImage{
        justify-content: center;
    }



</style>
