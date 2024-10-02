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
  function dateConforme(dateDebut, dateFin, message){
    message.hidden = true;
    if((dateDebut.value > dateFin.value) && (dateDebut.value != "" && dateFin.value != "")){
      message.hidden = false
    }
    else{
      message.hidden = true
    }
  };

  //fonction pour envoyer les dates de l'événement à dateConforme()
  function dateEven(){
    let dateDebut = document.querySelector("#dateEvenDebut");
    let dateFin = document.querySelector("#dateEvenFin");
    let message = document.querySelector("#messageEven ");
    dateConforme(dateDebut, dateFin, message)
  };

  //fonction pour envoyer les dates de l'appel de candidature à dateConforme()
  function dateAppel(){
    let dateDebut = document.querySelector("#dateAppelDebut");
    let dateFin = document.querySelector("#dateAppelFin");
    let message = document.querySelector("#messageAppel ");
    dateConforme(dateDebut, dateFin, message)
  }

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
					<div class="field">
						<label class="label" for="nomEven">Nom de l'événement <span class="rouge">*</span></label>
						<div class="control">
							<input class="input" type="text"name="nomEven" id="nomEven" placeholder="Marché de Noël" required/>
						</div>
					</div>

        <div>
					<label class="label" for="dateEven">Dates de l'événement<span class="rouge">*</span></label>
					  <div class="field is-grouped">
							<div class="container ml-6 mb-3">
								<span> Du:</span>
								<input class="input" type="date" name="dateEvenDebut" id="dateEvenDebut" on:change={dateEven} required/>
								<span>au:</span>
								<input class="input" type="date" name="dateEvenFin" id="dateEvenFin" on:change={dateEven} required />
                <div hidden id="messageEven" class="notification is-danger is-light">
                <p>La date de début ne peut pas être antérieure à la date de fin.</p>
                </div>
              </div>
					  </div>
        </div>

					<div class="field">
						<label class="label" for="villeEven">Ville <span class="rouge">*</span></label>
						<div class="control">
							<input class="input" type="text" name="villeEven" id="villeEven" placeholder="Sherbrooke" required/>
						</div>
					</div>

					<div class="field">
						<label class="label" for="siteWebEven">Site web ou page Facebook de l'événement</label>
						<div class="control">
							<input class="input" type="url" name="siteWebEven" id="siteWebEven" placeholder="https://www.monevenement.com"/>
						</div>
					</div>

					<div class="field has-addons">
						<div class="control is-expanded">
							<label class="label" for="emplacementEven">Emplacement<span class="rouge">*</span></label>
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

				<!-- Deuxième colonne -->
				<div class="column">
					<div class="field">
						<label class="label" for="entrepriseEven">Entreprise<span class="rouge">*</span></label>
						<div class="control">
							<input class="input" type="text" name="entrepriseEven" id="entrepriseEven" placeholder="Nom de l'entreprise ou organisation" required/>
						</div>
					</div>

					<div class="field">
						<label class="label" for="horaireEven">Horaire de l'événement</label>
						<div class="control">
							<input class="input" type="text" name="horaireEven" id="horaireEven" placeholder="De 9h à 17h"/>
						</div>
					</div>

					<div class="field">
						<label class="label" for="lienFBEven">Lien vers l'événement Facebook</label>
						<div class="control">
							<inpuT class="input" type="url" name="lienFBEven" id="lienFBEven" placeholder="https://www.facebook.com/events/123456789123"/>
						</div>
					</div>
				</div>
			</div>
			<!-- Fin des colonnes -->

			<hr class="mt-6 mb-6 is-hidden-mobile is-hidden-tablet-only" />
			<!-- section pour les infos d'appel de candidatures -->
			<H3Title title={"Détails de l'appel de candidatures"} />

			<div class="columns">
				<!-- Première colonne -->
				<div class="column">
					<div class="field">
						<label class="label" for="contactEven"
							>Personne contact pour l'appel de candidatures <span class="rouge">*</span></label>
						<div class="control">
							<input class="input" type="text" name="contactEven" id="contactEven" placeholder="Prenom Nom" required />
						</div>
					</div>

          <div>
            <label class="label" for="dateEven">Dates de l'appel de candidature<span class="rouge">*</span></label>
              <div class="field is-grouped">
                <div class="container ml-6 mb-3">
                  <span> Du:</span>
                  <input class="input" type="date" name="dateAppelDebut" id="dateAppelDebut" on:change={dateAppel} required/>
                  <span>au:</span>
                  <input class="input" type="date" name="dateAppelFin" id="dateAppelFin" on:change={dateAppel} required />
                  <div hidden id="messageAppel" class="notification is-danger is-light">
                  <p>La date de début ne peut pas être antérieure à la date de fin.</p>
                  </div>
                </div>
              </div>
          </div>

					<div class="field">
						<label class="label" for="artisanAppel"
							>Type d'exposants<span class="rouge">*</span></label>
						<div class="control">
							<div class="checkboxes">
								<label class="checkbox"><input class="mr-2" type="checkbox" />Artisan</label>
								<label class="checkbox"><input class="mr-2" type="checkbox" />Agro-alimentaire</label>
								<label class="checkbox"><input class="mr-2" type="checkbox" />MLM et revendeur</label>
								<label class="checkbox"><input class="mr-2" type="checkbox" />Auteur</label>
								<label class="checkbox"><input class="mr-2" type="checkbox" />Métiers d'art</label>
                <label class="checkbox"><input id="checkboxType" on:change={typeExposant} class="mr-2" type="checkbox" />Autres</label>
                <div>
                  <input hidden type="text" id="inputType" placeholder = "Préciser">
                  <span id="requisType" hidden class="rouge">*</span>
                </div>
							</div>
						</div>
					</div>

					<div class="field">
						<label class="label" for="artisanAppel"
							>Critères de sélection des exposants<span class="rouge">*</span></label>
						<div class="control">
							<div class="checkboxes">
								<label class="checkbox"><input class="mr-2" type="checkbox" />Étude de candidature</label>
								<label class="checkbox"><input class="mr-2" type="checkbox" />Premier arrivé, premier servi!</label>
								<label class="checkbox"><input class="mr-2" type="checkbox" />Nombre d'exposants limité par domaine</label>
								<label class="checkbox"><input class="mr-2" type="checkbox" />Pas de limitation par domaine</label>
							</div>
						</div>
					</div>
				</div>

				<!-- Deuxième colonne -->
				<div class="column">
					<div class="field">
						<label class="label" for="courrielAppel">Courriel pour information ou inscription <span class="rouge">*</span></label>
						<div class="control">
							<input class="input" type="email" name="courrielAppel" id="courrielAppel" placeholder="inscription@evenement.com" required/>
						</div>
					</div>

					<div class="field">
						<label class="label" for="lienAppel">Lien vers le formulaire de candidatures</label>
						<div class="control">
							<input class="input" type="url" name="courrielAppel" id="courrielAppel" placeholder="https://www.formulaire_candidature.evenement.com"/>
						</div>
					</div>

					<div class="field">
						<label class="label" for="artisanAppel">Vérifications effectuées par l'organisateur<span class="rouge">*</span></label>
						<div class="control">
							<div class="checkboxes">
								<label class="checkbox"><input class="mr-2" type="checkbox" />Aucune</label>
								<label class="checkbox"><input class="mr-2" type="checkbox" />NEQ</label>
								<label class="checkbox"><input class="mr-2" type="checkbox" />Permis</label>
								<label class="checkbox"><input id="checkboxVerif" on:change={verification} class="mr-2" type="checkbox" />Autres</label>
                <div id="divVerif">
                  <input hidden type="text" id="inputVerif" placeholder = "Préciser">
                  <span id="requisVerif" hidden class="rouge">*</span>
                </div>
                
							</div>
						</div>
					</div>
				</div>
			</div>

			<hr class="mt-6 mb-6 is-hidden-mobile is-hidden-tablet-only" />
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
