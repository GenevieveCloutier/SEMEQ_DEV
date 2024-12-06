
<script>
    import H1Title from "$lib/components/titres/h1Title.svelte";
    import H2Title from "$lib/components/titres/h2Title.svelte";
    import H2AvecSousTitre from "$lib/components/titres/h2AvecSousTitre.svelte";
    import H3Title from "$lib/components/titres/h3Title.svelte";
    import BoutonGris from "$lib/components/boutons/boutonGris.svelte";
    import BoutonBleu from "$lib/components/boutons/boutonBleu.svelte";
    import UnEvenement from "$lib/components/repertoires/unEvenement.svelte";
    import AccordionVisiteur, { createAccordionContext } from "$lib/components/generaux/accordionVisiteur.svelte";
    import Modal from "$lib/components/generaux/modal.svelte";
	import { Cookies } from "nodemailer/lib/fetch";
    import { onMount } from "svelte";
    import Recherche from '$lib/components/generaux/recherche.svelte';
    import RechercheNoResult from '$lib/components/generaux/rechercheNoResult.svelte';

	export let data;
	const { villes, regions, evenements, utilisateurs } = data;

//pour créer le contexte pour que les sections d'accordéon se referment quand on clique sur une autre
    createAccordionContext(); 

//images à afficher dans le component Modal pour afficher en grand
  const images=[
    "/img/app/accueil/visiteur_1.jpg",
    "/img/app/accueil/visiteur_2.jpg",
    "/img/app/accueil/visiteur_3.jpg",
    "/img/app/accueil/visiteur_4.jpg",
    "/img/app/accueil/visiteur_5.jpg",
]

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
            (evenement.debut_even <= date7) || (evenement.fin_even <= date7))
        ); 
        return evenementsFiltre
}

//pour afficher seulement les régions qui ont un marché cette semaine
function tableauRegions(){
    
    let regionsAvecMarche = new Set();

    for(let x=0; x<evenements.length; x++){
        let chaqueRegion = evenements[x].ville.region.nom.split(" ")[0]
        regionsAvecMarche.add(chaqueRegion)
        }
        regionsAvecMarche=[...regionsAvecMarche].sort((a, b) => a.localeCompare(b)) 
    return [...regionsAvecMarche]
}

//sert à afficher les régions aux visieurs (et à appeler la fonction)
let afficherRegions = tableauRegions()

let regionActive = null;


//aller chercher la valeur de la région sélectionnée puis l'envoyer dans la fonction filtreRegionDate()
  function chercherValeurRegion(event){
    valeurRegion = this.value;

    //exceptions pour les 2 regions à double tiret
    if(valeurRegion == "Saguenay-Lac-Saint-Jean"){
        valeurRegion = "Saguenay--Lac-Saint-Jean"
    }
    if(valeurRegion == "Gaspésie-Îles-de-la-Madeleine"){
        valeurRegion = "Gaspésie--Îles-de-la-Madeleine"
    }

    const regionCliquee = event.target.value;

    if (regionActive === regionCliquee) {
            regionActive = null; // Désactiver si déjà active
        } else {
            regionActive = regionCliquee; // Activer sinon
        }
    filtreRegionDate()
    return valeurRegion
  }
  
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
    <div class="columns is-mobile is-centered is-multiline has-text-centered">

        <div class="column is-hidden-mobile"></div>

                {#each images as image}
                <div class="column is-flex is-justify-content-center is-align-items-center centerImage">
                    <figure>
                        <Modal image={image}/>
                    </figure>
                </div>
                {/each}
            
        <div class="column is-hidden-mobile"></div>

    </div>

    <div class="has-text-centered">
        <a class="is-size-7" href="https://la-vitrine-vaudreuil-soulanges.odoo.com/" target="blank">Crédit photo: La Vitrine Vaudreuil Soulanges</a>
    </div>
</div>


<div class="has-text-centered mt-5">
    <H3Title title={"Marchés à venir"} />
</div>

<div class="container mt-6">
    <H2Title title={"Marchés en vedette"} />
    <div class="columns is-multiline">
        {#if evenements.length > 0}
            {#each evenements as evenement}
            <!-- pour n'afficher que les événements qui ont un abonnement actif -->
                {#if evenement.utilisateur.abonne}
                <div class="column is-one-fifth">
                        <UnEvenement evenement={evenement} />
                </div>
                {/if}
            
            {/each}
        {:else}
            <p>Aucun événement en vedette semaine!</p>
        {/if}
    </div>

</div>

<div class="container mt-6">
    <hr class="mb-6">
            <H2AvecSousTitre title={"Tous les marchés de la semaine:"} 
            subtitle={"(Clique sur une région pour afficher les marchés)"} />
            <div class="container is-fluid">
            
            <div>
                {#if [...afficherRegions].length > 0}
                    {#each afficherRegions as region}
                <AccordionVisiteur >
                    <span slot="head">
                        <input readonly bind:value={region}
                            class="is-uppercase has-text-left bouton {region === regionActive ? 'active' : ''}" 
                            on:click={chercherValeurRegion}
                            name="region">
                    </span>

                    <div slot="details">
                        {#if evenementsFiltre}
                            <div class="columns is-multiline box">
                        {#if evenementsFiltre.length > 0}
                            {#each evenementsFiltre as evenement}
                                <div class="column is-one-fifth">
                                    <UnEvenement evenement={evenement} />
                                </div>
                            {/each}
                        {:else}
                            <p class=" box bordure px-3 py-3 mx-3 my-3 has-text-centered ">Pas d'événement à afficher dans cette région cette semaine!<br>
                            <BoutonGris lien= {"repertoire_evenements/inscription_evenement_gratuit"} texte={"Ajouter un événement"} /></p>
                        {/if}
                            </div>
                        {/if}
                    </div>
                </AccordionVisiteur>
                    {/each}
                {:else}
                    <p>Aucun marché trouvé pour cette semaine!</p>
                {/if}
            </div>
        </div>


    <div class="has-text-right">
        <a href = '/repertoire_evenements'>Voir tous les événements (par mois)</a>
    </div>
</div>



<style>

    .bordure{
        border:1px solid lightgray;
        padding:1em;
        border-radius: 5px;
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
        min-width: 128px;
    }

    /* pour afficher la région sélectionnée avec la flèche */
    .active {
        color: #ffffff;
        background-color: #184287;
        padding: 0.5rem;
        font-weight: bold;
    }


  

    
</style>
