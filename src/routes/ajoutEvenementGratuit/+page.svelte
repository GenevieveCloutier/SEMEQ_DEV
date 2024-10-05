<script>
	import H1Title from '../../lib/components/titres/h1Title.svelte';
	import H3Title from '../../lib/components/titres/h3Title.svelte';
	import AbonnementEven from '../../lib/components/boites/abonnementEven.svelte';
	import Retour from '../../lib/components/generaux/retour.svelte'
	import CheckboxResponsabilite from '$lib/components/formulaires/checkboxResponsabilite.svelte';
	import SubmitButon from '$lib/components/formulaires/submitButon.svelte';
	import NotifDanger from '$lib/components/notifications/notifDanger.svelte';

	let erreur = null;

	/**
	 * Gère la soumission du formulaire pour créer un nouvel élément.
	 * @param {Event} event - L'événement de soumission du formulaire.
	 * @returns {void}
	 */
	async function handleSubmit(event) {
		const formData = new FormData(event.target);

		const response = await fetch('?/newExposant', {
			method: 'POST',
			body: formData
		});
		const result = await response.json();
		if (result.type == 'failure') erreur = JSON.parse(result.data)[0];
		else window.location.href = '/'; //AJOUTER LIEN
	}

	//pour afficher une boite de texte si "autres" est sélectionné
	function preciser(champs, input, requis) {
    input.hidden = true;

    if(champs.checked == true){
      input.hidden = false;
      requis.hidden = false;
      input.required = true;
    }
    if(champs.checked == false){
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

</script>

<div class="block">
	<NotifDanger {erreur}></NotifDanger>

	<H1Title title={'Inscrire mon événement gratuitement'} />

	<div class=" container container-bordure px-4 py-4 has-text-centered has-background-light">
		<p class="is-size-6 has-text-weight-bold">
			En tant qu'organisateur, quelles sont les conditions pour inscrire mon événement?
		</p>
		<p class="is-size-6">
			La seule condition pour inscrire un événement est qu'il accepte des artisans ou artisans
			agro-alimentaires, et que tu complètes le formulaire d'inscription en ligne.
		</p>
	</div>

	<AbonnementEven />

	<form on:submit|preventDefault={handleSubmit}>
		<div class="box">
			<!-- section pour les infos de l'événement -->
			<H3Title title={"Détails de l'événement"} />
			<div class="columns">
				<!-- Première colonne -->
				<div class="column">
					<div>
						<div class="field">
							<label class="label" for="nomEven">Nom de l'événement <span class="rouge">*</span></label>
							<div class="control">
								<input class="input" type="text"name="nomEven" id="nomEven" placeholder="Marché de Noël" required/>
							</div>
						</div>
					</div>
       			 <div>

				<div class="my-5">
					<div class>
						<div class="field">
							<label class="label" for="entrepriseEven">Entreprise<span class="rouge">*</span></label>
							<div class="control">
								<input class="input" type="text" name="entrepriseEven" id="entrepriseEven" placeholder="Nom de l'entreprise ou organisation" required/>
							</div>
						</div>
					</div>
				</div>

		</div>

				<div class="my-5">
					<div class="field">
						<label class="label" for="villeEven">Ville <span class="rouge">*</span></label>
						<div class="control">
							<input class="input" type="text" name="villeEven" id="villeEven" placeholder="Sherbrooke" required/>
						</div>
					</div>
				</div>

				<div class="my-5">
					<div class="field">
						<label class="label" for="horaireEven">Heures d'ouverture (au public)</label>
						<div class="control">
							<input class="input" type="text" name="horaireEven" id="horaireEven" placeholder="De 9h à 17h"/>
						</div>
					</div>
				</div>

				<div class="my-5">
					<label class="label" for="dateEven">Dates de l'événement<span class="rouge">*</span></label>
					  <div class="field is-grouped">
							<div class="container ml-6 mb-3">
								<span> Du:</span>
								<input class="input" type="date" name="dateEvenDebut" id="dateEvenDebut" on:change={dateEven} required/>
								<span>au:</span>
								<input class="input" type="date" name="dateEvenFin" id="dateEvenFin" required />
              			</div>
					</div>
        		</div>
	</div>

				<!-- Deuxième colonne -->
				<div class="column">

					<div>
						<div class="field has-addons">
							<div class="control is-expanded">
								<label class="label" for="emplacementEven">Emplacement des kiosques<span class="rouge">*</span></label>
								<div class="select is-fullwidth">
									<select name="menuEmplacement" id="menuEmplacement" required>
										<option value="">Choisir</option>
										<option value="interieur">Intérieur</option>
										<option value="extérieur">Extérieur</option>
										<option value="interieur_extérieur">Intérieur et Extérieur</option>
									</select>
								</div>
							</div>
						</div>
					</div>
	
					<div class="my-5">
						<div class="field">
							<label class="label" for="siteWebEven">Site web ou page Facebook de l'événement</label>
							<div class="control">
								<input class="input" type="url" name="siteWebEven" id="siteWebEven" placeholder="https://www.monevenement.com"/>
							</div>
						</div>
					</div>

				<div class="my-5">
					<div class="field">
						<label class="label" for="lienFBEven">Lien vers l'événement Facebook</label>
						<div class="control">
							<inpuT class="input" type="url" name="lienFBEven" id="lienFBEven" placeholder="https://www.facebook.com/events/123456789123"/>
						</div>
					</div>
				</div>
			</div>
			</div>
			<!-- Fin des colonnes -->

			<hr class=" is-hidden-mobile is-hidden-tablet-only" />
			<!-- section pour les infos d'appel de candidatures -->
			<H3Title title={"Détails de l'appel de candidatures"} />

			<div class="columns">
				<!-- Première colonne -->
				<div class="column">
					<div>
						<div class="field">
							<label class="label" for="contactEven"
								>Personne contact pour l'appel de candidatures <span class="rouge">*</span></label>
							<div class="control">
								<input class="input" type="text" name="contactEven" id="contactEven" placeholder="Prenom Nom" required />
							</div>
						</div>
					</div>

				<div class="my-5">
					<div class="field">
						<label class="label" for="courrielAppel">Courriel pour information ou inscription <span class="rouge">*</span></label>
						<div class="control">
							<input class="input" type="email" name="courrielAppel" id="courrielAppel" placeholder="inscription@evenement.com" required/>
						</div>
					</div>
				</div>

				<div class="my-5">
					<div class="field">
						<label class="label" for="lienAppel">Lien vers le formulaire de candidatures</label>
						<div class="control">
							<input class="input" type="url" name="courrielAppel" id="courrielAppel" placeholder="https://www.formulaire_candidature.evenement.com"/>
						</div>
					</div>
				</div>

				<div class="my-5">
					<label class="label" for="dateEven">Dates de l'appel de candidature<span class="rouge">*</span></label>
						<div class="field is-grouped">
						<div class="container ml-6 mb-3">
							<span> Du:</span>
							<input class="input" type="date" name="dateAppelDebut" id="dateAppelDebut" on:change={dateAppel} required/>
							<span>au:</span>
							<input class="input" type="date" name="dateAppelFin" id="dateAppelFin"  required />
						</div>
						</div>
					</div>

				
				</div>

				<!-- Deuxième colonne -->
				<div class="column">
		
					<div class="field my-5">
						<label class="label" for="artisanAppel"
							>Type d'exposants<span class="rouge">*</span></label>
						<div class="control">
							<div class="checkboxes">
								<label class="checkbox"><input class="mr-2" type="checkbox" name="typeArtisan" id="typeArtisan" />Artisan</label>
								<label class="checkbox"><input class="mr-2" type="checkbox" name="typeAgro" id="typeAgro" />Agro-alimentaire</label>
								<label class="checkbox"><input class="mr-2" type="checkbox" name="typeMLM" id="typeMLM"/>MLM et revendeur</label>
								<label class="checkbox"><input class="mr-2" type="checkbox" name="typeAuteur" id="typeAuteur" />Auteur</label>
								<label class="checkbox"><input class="mr-2" type="checkbox" name="typeArt" id="typeArt" />Métiers d'art</label>
                				<label class="checkbox"><input on:change={typeExposant} class="mr-2" type="checkbox" name="checkboxType" id="checkboxType" />Autres</label>
								<div>
								<input hidden type="text" name="inputType" id="inputType" placeholder = "Préciser">
								<span id="requisType" hidden class="rouge">*</span>
								</div>
							</div>
						</div>
					</div>

				<div class="my-5">
					<div class="field">
						<div class="control">
							<label class="checkbox label" name="typeSelection" id="typeSelection">
								Les places sont attribuées selon une sélection parmi les candidatures reçues <span class="rouge">*</span><br>
								<span class="is-size-7 has-text-grey has-text-weight-normal" >(oui = sélection à la fin de la période de candidatures, non = premier arrivé, premier servi)<br></span> 
								<input type="checkbox" name="typeSelection" class="toggle exclus">
							  </label>

						<div class="my-5">
							<div class="field">
							  <label class="checkbox label" name="limiteSelection" id="limiteSelection">
								Le nombre d'exposants par domaine est limité <span class="rouge">*</span><br>
								<span class="is-size-7 has-text-grey has-text-weight-normal" >(ex. 2 kiosques de savons, 1 kiosque de bougies...)<br></span>
								<input type="checkbox" name="limiteSelection" class="toggle exclus">
							  </label>
							</div>
						</div>
					</div>
				</div>
			</div>

				<div class="my-5">
					<div class="field">
						<label class="label" for="artisanAppel">Vérifications effectuées par l'organisateur<br>
						<span class="is-size-7 has-text-grey has-text-weight-normal" >(ne rien cocher si aucune vérification n'est faite par l'organisation)</span></label>
						<div class="control">
							<div class="checkboxes">
								<label class="checkbox"><input class="mr-2" type="checkbox" name="verifNEQ" id="verifNEQ" />NEQ</label>
								<label class="checkbox"><input class="mr-2" type="checkbox" name="verifPermis" id="verifPermis"/>Permis</label>
								<label class="checkbox"><input on:change={verification} class="mr-2" type="checkbox" name="checkboxVerif" id="checkboxVerif"  />Autres</label>
								<div id="divVerif">
									<input hidden type="text" name="inputVerif" id="inputVerif" placeholder = "Préciser">
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
		</div>
		<!-- Fin box -->

		<!-- Boutons en bas de page -->
		<div class="block has-text-right">
			<!-- Valider si SubmitButon fait la bonne action! -->
			<SubmitButon texte={'Enregistrer'}></SubmitButon>
			<Retour />
		</div>
	</form>
</div>

<style>
	.container-bordure {
		border: 1px solid #d9d9d9;
		border-radius: 10px;
	}
</style>
