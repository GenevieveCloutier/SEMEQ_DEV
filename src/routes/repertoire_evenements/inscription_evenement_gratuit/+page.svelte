<script>

	import H1Title from '$lib/components/titres/h1Title.svelte';
	import H3Title from '$lib/components/titres/h3Title.svelte';
	import AbonnementEven from '$lib/components/boites/abonnementEven.svelte';
	import Retour from '$lib/components/generaux/retour.svelte'
	import CheckboxResponsabilite from '$lib/components/formulaires/checkboxResponsabilite.svelte';
	import SubmitButon from '$lib/components/formulaires/submitButon.svelte';
	import BoutonBleu from '$lib/components/boutons/boutonBleu.svelte';
	import NotifDanger from '$lib/components/notifications/notifDanger.svelte';
	import { creationEvenement, erreur } from '$lib/outils/formHandlers';
	import { redirect } from '@sveltejs/kit';

	export let data;
	const {villes, users, session, role} = data;


	//pour afficher une boite de texte si "autres" est sélectionné
	function preciser(champs, input, requis) {
    input.hidden = true;
    input.required = false;

    if(champs.checked == true){
      input.required = true;
      input.hidden = false;
      requis.hidden = false;
      input.required = true;
    }
    if(champs.checked == false){
      input.required = true;
      input.hidden = true;
      requis.hidden = true;
      input.required = false;
    }
	};

  //données du input type d'exposants pour preciser()
	function typeExposant() {
    let champs = document.querySelector("#checkboxType");
    let input = document.querySelector("#inputType");
    let requis = document.querySelector("#requisType");
    preciser(champs, input, requis)
	};

  //données du input Vérification pour preciser()
	function verification() {
    let champs = document.querySelector("#checkboxVerif");
    let input = document.querySelector("#inputVerif");
    let requis = document.querySelector("#requisVerif");
    preciser(champs, input, requis)
	};

//fonction pour éviter que la date de début enregistrée soit après la date de fin
	function dateConforme(dateDebut, dateFin){
		dateFin.min = dateDebut.value;
		dateFin.value="";
	}

  //fonction pour envoyer les dates de l'événement à dateConforme()
  function dateEven(){
    let dateDebut = document.querySelector("#dateEvenDebut");
    let dateFin = document.querySelector("#dateEvenFin");
    dateConforme(dateDebut, dateFin)
  };

  //fonction pour envoyer les dates de l'appel de candidature à dateConforme()
  function dateAppel(){
    let dateDebut = document.querySelector("#dateAppelDebut");
    let dateFin = document.querySelector("#dateAppelFin");
    dateConforme(dateDebut, dateFin)
  };

    //fonction pour afficher la section / cacher le bouton
	function afficher(event, section, bouton){
    event.preventDefault()
    bouton.hidden = true;
    section.hidden = false;
  };
  
	//pour la section 2
	function section2(event){
		let section = document.querySelector('#section2');
		let bouton = document.querySelector("#bouton2");
		afficher(event,section, bouton)
	};

</script>

<div class="block">
{#if $erreur}
    <NotifDanger></NotifDanger>
{/if}

	<H1Title title={'Inscrire mon événement gratuitement'} />
	<p class="has-text-centered mb-4">(Délai de traitement de 3 jours ouvrables)</p>

	<div class=" container container-bordure px-4 py-4 has-text-centered has-background-light">
		<p class="is-size-6 has-text-weight-bold">
			En tant qu'organisateur, quelles sont les conditions pour inscrire mon événement?
		</p>
		<p class="is-size-6">
			La seule condition pour inscrire un événement est qu'il accepte des artisans ou artisans
			agro-alimentaires, et que tu complètes le formulaire d'inscription en ligne.
		</p>
	</div>
 
	<!-- afficher la boite de compte payant seulement aux personnes qui ne sont pas connectés à  un compte payant -->
	{#if !role || role === "3" || role === "4" }
		<div class="columns is-centered mt-5">
			<div class="column is-one-third">
				<AbonnementEven />
			</div>
		</div>
	{/if}
	

	<form on:submit|preventDefault={creationEvenement}>
		<div class="box mt-5">
			<!-- section pour les infos de l'événement -->
			<H3Title title={"Détails de l'événement"} />
			<div class="columns">
				<!-- Première colonne -->
				<div class="column">
					<div>
						<div class="field">
							<label class="label" for="nom">Nom de l'événement <span class="rouge">*</span></label>
							<div class="control">
								<input class="input" type="text" name="nom" id="nomEven" placeholder="Marché de Noël" required />
							</div>
						</div>
					</div>
       			 <div>

				<div class="my-5">
					<div class>
						<div class="field">
							<label class="label" for="entreprise">Entreprise<span class="rouge">*</span></label>
							<div class="control">
								<input class="input" type="text" name="entreprise" id="entrepriseEven" placeholder="Nom de l'entreprise ou organisation" required />
							</div>
						</div>
					</div>
				</div>

		</div>

				<div class="my-5">
					<div class="field">
						<label class="label" for="ville_id">Ville <span class="rouge">*</span></label>
						<div class="control">
							<!-- J'ai changer le champ pour un select et ajouter les villes -->
							<div class="select is-fullwidth">
									<select name="ville_id" id="villeEven" required >
										<option value="" disabled selected>Choisir une ville</option>
										{#each villes as ville}
										<option value={ville.id}>{ville.nom} ({ville.region.nom})</option>
										{/each}
									</select>
								</div>
							</div>
						</div>
					</div>

				<div class="my-5">
					<div class="field">
						<label class="label" for="horaire_even">Heures d'ouverture (au public)</label>
						<div class="control">
							<input class="input" type="text" name="horaire_even" id="horaireEven" placeholder="De 9h à 17h"/>
						</div>
					</div>
				</div>

				<div class="my-5">
					<label class="label" for="date">Dates de l'événement<span class="rouge">*</span></label>
					  <div class="field is-grouped">
							<div class="container ml-6 mb-3">
								<span> Du:</span>
								<input class="input" type="date" name="debut_even" id="dateEvenDebut" on:change={dateEven} required />
								<span>au:</span>
								<input class="input" type="date" name="fin_even" id="dateEvenFin" required />
              			</div>
					</div>
        		</div>
	</div>

				<!-- Deuxième colonne -->
				<div class="column">

					<div>
						<div class="field">
							<label class="label" for="site">Site web de l'organisation ou de l'événement (si disponible)</label>
							<div class="control">
								<input class="input" type="url" name="site" id="siteWebEven" placeholder="https://www.monevenement.com"/>
							</div>
						</div>
					</div>

				<div class="my-5">
					<div class="field">
						<label class="label" for="fb_even">Lien vers la page ou l'événement Facebook (si disponible)</label>
						<div class="control">
							<inpuT class="input" type="url" name="fb_even" id="lienFBEven" placeholder="https://www.facebook.com/events/123456789123"/>
						</div>
					</div>
				</div>

				<div class="my-5">
					<div class="field">
						<label class="label" for="insta_even">Lien vers le compte Instagram de l'organisation ou de l'évènement (si disponible)</label>
						<div class="control">
							<inpuT class="input" type="url" name="insta_even" id="insta_even" placeholder="https://www.instagram.com"/>
						</div>
					</div>
				</div>

				<div class="my-5">
					<div class="field">
						<label class="label" for="tiktok_even">Lien vers le compte Tiktok de l'organisation ou de l'évènement (si disponible)</label>
						<div class="control">
							<inpuT class="input" type="url" name="tiktok_even" id="tiktok_even" placeholder="https://www.instagram.com"/>
						</div>
					</div>
				</div>

				<div class="field my-5">
					<label class="label" for="emplacement">Emplacement<span class="rouge">*</span></label>
					<div class="control">
						<div class="checkboxes">
							<label class="checkbox"><input class="mr-2 emplacement" type="checkbox" name="emplacementInterieur" id="emplacementInterieur" />Intérieur</label>
							<label class="checkbox"><input class="mr-2 emplacement" type="checkbox" name="emplacementExterieur" id="emplacementExterieur" />Extérieur</label>
							<label class="checkbox"><input class="mr-2 emplacement" type="checkbox" name="emplacementChapiteau" id="emplacementChapiteau"/>Extérieur, sous un grand chapiteau</label>
							<label class="checkbox"><input class="mr-2 emplacement" type="checkbox" name="emplacementAbri" id="emplacementAbri" />Extérieur, petits abris fournis</label>
							<label class="checkbox"><input class="mr-2 emplacement" type="checkbox" name="emplacementSansAbri" id="emplacementSansAbri" />Extérieur, apportez votre abri</label>
						</div>
					</div>
				</div>

			</div>
		</div>
			<!-- Fin des colonnes -->

<!-- bouton pour cacher / afficher la section 2 -->
<div id="bouton2" class="has-text-centered">
	<BoutonBleu texte={"Continuer vers la section 2 de 2"} fonction={section2} />
</div>

<div hidden id="section2">
			<hr class=" is-hidden-mobile is-hidden-tablet-only" />
			<!-- section pour les infos d'appel de candidatures -->
			<H3Title title={"Détails de l'appel de candidatures"} />

			<div class="columns">
				<!-- Première colonne -->
				<div class="column">
					<div>
						<div class="field">
							<label class="label" for="contact"
								>Personne contact pour l'appel de candidatures <span class="rouge">*</span></label>
							<div class="control">
								<input class="input" type="text" name="contact" id="contactEven" placeholder="Prenom Nom" required />
							</div>
						</div>
					</div>

				<div class="my-5">
					<div class="field">
						<label class="label" for="courriel">Courriel pour information ou inscription <span class="rouge">*</span></label>
						<div class="control">
							<input class="input" type="email" name="courriel" id="courrielAppel" placeholder="inscription@evenement.com" required />
						</div>
					</div>
				</div>

				<div class="my-5">
					<div class="field">
						<label class="label" for="form_cand">Lien vers le formulaire de candidatures</label>
						<div class="control">
							<input class="input" type="url" name="form_cand" id="form_cand" placeholder="https://www.formulaire_candidature.evenement.com"/>
						</div>
					</div>
				</div>

				<div class="my-5">
					<label class="label" for="cand">Dates de l'appel de candidature<span class="rouge">*</span></label>
						<div class="field is-grouped">
						<div class="container ml-6 mb-3">
							<span> Du:</span>
							<input class="input" type="date" name="debut_cand" id="dateAppelDebut" on:change={dateAppel} required />
							<span>au:</span>
							<input class="input" type="date" name="fin_cand" id="dateAppelFin" required  />
						</div>
						</div>
					</div>

				
				</div>

				<!-- Deuxième colonne -->
				<div class="column">
		
					<div class="field my-5">
						<label class="label" for="type"
							>Type d'exposants<span class="rouge">*</span></label>
						<div class="control">
							<div class="checkboxes">
								<label class="checkbox"><input class="mr-2 exposant" type="checkbox" name="typeArtisan" id="typeArtisan" />Artisan</label>
								<label class="checkbox"><input class="mr-2 exposant" type="checkbox" name="typeAgro" id="typeAgro" />Agro-alimentaire</label>
								<label class="checkbox"><input class="mr-2 exposant" type="checkbox" name="typeMLM" id="typeMLM"/>MLM et revendeur</label>
								<label class="checkbox"><input class="mr-2 exposant" type="checkbox" name="typeAuteur" id="typeAuteur" />Auteur</label>
								<label class="checkbox"><input class="mr-2 exposant" type="checkbox" name="typeArt" id="typeArt" />Métiers d'art</label>
                				<label class="checkbox"><input on:change={typeExposant} class="mr-2" type="checkbox" id="checkboxType" />Autres</label>
							<div>
								<input hidden type="text" name="type_autre" id="inputType" placeholder = "Préciser" >
								<span id="requisType" hidden class="rouge">*</span>
								</div>
							</div>
						</div>
					</div>

				<div class="my-5">
					<div class="field">
						<div class="control">
							<label class="checkbox label" for="selection">
								Les places sont attribuées selon une sélection parmi les candidatures reçues <span class="rouge">*</span><br>
								<span class="is-size-7 has-text-grey has-text-weight-normal" >(oui = sélection à la fin de la période de candidatures, non = premier arrivé, premier servi)<br></span> 
								<input type="checkbox" class="toggle exclus" name="selection" id="selection">
							  </label>

						<div class="my-5">
							<div class="field">
							  <label class="checkbox label" for="limite">
								Le nombre d'exposants par domaine est limité <span class="rouge">*</span><br>
								<span class="is-size-7 has-text-grey has-text-weight-normal" >(ex. 2 kiosques de savons, 1 kiosque de bougies...)<br></span>
								<input type="checkbox" class="toggle exclus" name="limite" id="limite">
							  </label>
							</div>
						</div>
					</div>
				</div>
			</div>

				<div class="my-5">
					<div class="field">
						<label class="label" for="verification">Vérifications effectuées par l'organisateur<br>
						<span class="is-size-7 has-text-grey has-text-weight-normal" >(ne rien cocher si aucune vérification n'est faite par l'organisation)</span></label>
						<div class="control">
							<div class="checkboxes">
								<label class="checkbox"><input class="mr-2" type="checkbox" name="verifNEQ" id="verifNEQ" />NEQ</label>
								<label class="checkbox"><input class="mr-2" type="checkbox" name="verifPermis" id="verifPermis"/>Permis</label>
								<label class="checkbox"><input on:change={verification} class="mr-2" type="checkbox" id="checkboxVerif"  />Autres</label>
								<div id="divVerif">
									<input hidden type="text" name="verification_autre" id="inputVerif" placeholder = "Préciser">
									<span id="requisVerif" hidden class="rouge">*</span>
								</div>
                			</div>
						</div>
					</div>
				</div>

				</div>
			</div>

			<hr class="is-hidden-mobile is-hidden-tablet-only" />
			<CheckboxResponsabilite />

		<!-- Boutons en bas de page -->
		<div class="block has-text-right">
			<SubmitButon texte={'Enregistrer'}></SubmitButon>
			<Retour />

		</div>
	</div>
	<!-- Fin box et fin de section2-->
	</form>
</div>

<style>
	.container-bordure {
		border: 1px solid #d9d9d9;
		border-radius: 10px;
	}
</style>