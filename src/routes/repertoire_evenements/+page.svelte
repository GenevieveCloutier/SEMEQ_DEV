
<script>
    import H1Title from "$lib/components/titres/h1Title.svelte";
    import BoutonGris from "$lib/components/boutons/boutonGris.svelte";
    import Accordion from "$lib/components/generaux/accordion.svelte";
	import { onMount } from "svelte";

	export let data;
	const { regions, evenements } = data
 

function obtenirMois() {
    //ajouter une séparation avec l'année après décembre? Et une en haut avec l'année du mois actuel?
    const mois = [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];

    let moisAffiches = [];
    let dateActuelle = new Date();

    let moisPrecedent = new Date(dateActuelle);
    moisPrecedent.setMonth(dateActuelle.getMonth() - 1);
    moisAffiches.push(mois[moisPrecedent.getMonth()]);

    moisAffiches.push(mois[dateActuelle.getMonth()]);

    // Ajouter les mois suivants jusqu'à 10 mois
    for (let x=1; x<=10; x++) {
      let moisSuivant = new Date(dateActuelle);
      moisSuivant.setMonth(dateActuelle.getMonth() + x);
      moisAffiches.push(mois[moisSuivant.getMonth()]);
    }
    return moisAffiches;
  }
  let tousLesMois = obtenirMois();
  
  function afficherEvenements(){
    resetCouleur()
    this.style.backgroundColor="#184287";
    this.style.color="white";
  };

  function resetCouleur(){
    let boutons = document.getElementsByName('region');
    for (let x=0; x<boutons.length; x++){
        boutons[x].style.backgroundColor="white";
        boutons[x].style.color="#184287";
    }
  };

  </script>

<H1Title title={"Répertoire des événements"} />
<p class="has-text-centered">En construction</p>
 <!-- Bouton pour ajouter un événement gratuit -->
 <div class="my-6">
    <p class="has-text-centered">
        <BoutonGris 
        lien={"repertoire_evenements/inscription_evenement_gratuit"}    
        texte={"Ajouter un événement"} /> <br>
        <span class="has-text-grey">Un compte est requis pour ajouter un événement. <br>
            Tu seras redirigé si tu n'as pas de compte ou que tu n'es pas connecté.</span>
</div>

<div class="container is-fluid mb-6">
    <p>Trouvez tous les salons d'artisans, les événements, les marchés publics éphémères ainsi que les
        expositions du Québec au même endroit.
    </p>
</div>

<!-- Ajouter barre de recherche -->

<!-- <div class="container if-fluid">
    <div class="columns">

        <div class="column mt-4 is-one-quarter texte-bleu">
            <div>
                {#each regions as region} aller les chercher par les villes à la place!
                    <button class="is-uppercase has-text-left " on:click={afficherEvenements} name="region">{region.nom}</button><br>
                {/each}
            </div>
        </div>

        <div class="box column is-three-quarters">
                {#each tousLesMois as unMois}
                <Accordion>
                    <span slot="head"><button>{ unMois }</button></span>

                    <div slot="details">
                        Événements:<br>
                        ajouter filtres region et dates
                        <div class="columns">

                        
                        {#each evenements as evenement}
                        <div class=" card bordure">
                            <div class="card-content">
                                <p class="has-text-weight-bold">{evenement.nom}</p>
                            </div>


                        </div>
                        {/each}
                    </div>
                </div>
                </Accordion>
                {/each}
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
</style> -->
