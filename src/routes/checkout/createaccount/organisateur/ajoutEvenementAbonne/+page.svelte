<script>
	import H1Title from '$lib/components/titres/h1Title.svelte';
	import H3Title from '../../../../../lib/components/titres/h3Title.svelte';
	import Retour from '../../../../../lib/components/generaux/retour.svelte';
	import CheckboxResponsabilite from '$lib/components/formulaires/checkboxResponsabilite.svelte';
	import SubmitButon from '$lib/components/formulaires/submitButon.svelte';
	import NotifDanger from '$lib/components/notifications/notifDanger.svelte';
	import BoutonGris from '../../../../../lib/components/boutons/boutonGris.svelte';
	import Etape2Organisateur from '../../../../../lib/components/barre_progression_paiement/etape2Organisateur.svelte';

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
    let dateDebut = document.querySelector("#dateEvenPayantDebut");
    let dateFin = document.querySelector("#dateEvenPayantFin");
    let message = document.querySelector("#messageEvenPayant ");
    dateConforme(dateDebut, dateFin, message)
  };

  //fonction pour envoyer les dates de l'appel de candidature à dateConforme()
  function dateAppel(){
    let dateDebut = document.querySelector("#dateCandEvenPayantDebut");
    let dateFin = document.querySelector("#dateCandEvenPayantFin");
    let message = document.querySelector("#messageEvenPayantAppel ");
    dateConforme(dateDebut, dateFin, message)
  }

</script>

<div class="block">
    <Etape2Organisateur />
	<NotifDanger {erreur}></NotifDanger>

	<form on:submit|preventDefault={handleSubmit}>
        <div class="box">
            <div class="mt-5 container has-text-centered">
                <!-- ajouter le lien -->
                <BoutonGris lien={"#"} texte={"Je souhaite inscrire mon événement plus tard"} />
                <p class="mt-5 mb-5">Tu pourras modifier ton événement et en ajouter d'autres en tout temps depuis ton compte</p>
            </div>

    <H1Title title={"Inscrire mon événement"} />

        <!-- section pour les infos de l'événement -->
        <H3Title title={"Détails de l'événement"} />

        <div class="block">
            <div class="columns">
                <div class="column is-half">
                    
                    <div class="field">
						<label class="label" for="nomEvenPayant">Nom de l'événement <span class="rouge">*</span></label>
						<div class="control">
							<input class="input" type="text"name="nomEvenPayant" id="nomEvenPayant" placeholder="Marché de Noël" required/>
						</div>
					</div>

                        <label class="label" for="dateEvenPayant">Dates de l'événement<span class="rouge">*</span></label>
                          <div class="field is-grouped">
                                <div class="container ml-6 mb-3">
                                    <span> Du:</span>
                                    <input class="input" type="date" name="dateEvenPayantDebut" id="dateEvenPayantDebut" on:change={dateEven} required/>
                                    <span>au:</span>
                                    <input class="input" type="date" name="dateEvenPayantFin" id="dateEvenPayantFin" on:change={dateEven} required />
                                    <div hidden id="messageEvenPayant" class="notification is-danger is-light">
                                        <p>La date de début ne peut pas être antérieure à la date de fin.</p>
                                    </div>
                                </div>
                            </div>

                    <div class="field">
                        <label class="label" for="horaireEvenPayant">Horaire de l'événement</label>
                        <div class="control">
                            <input class="input" type="text"name="horaireEvenPayant" id="horaireEvenPayant" placeholder="De 9h à 17h"/>
                        </div>
                    </div>

            <!-- fin de de la colonne en haut à droite   -->
                </div>

            <!-- colonne en haut à gauche -->
            <div class="column is-half">
                <div class="field">
                    <label class="label" for="adresseEvenPayant">Adresse</label>
                    <div class="control">
                        <input class="input" type="text" name="adresseEvenPayant" id="adresseEvenPayant" placeholder="Sherbrooke"/>
                    </div>
                </div>

                <div class="field">
                    <label class="label" for="villeEvenPayant">Ville</label>
                    <div class="control">
                        <input class="input" type="text"name="villeEvenPayant" id="villeEvenPayant" placeholder="Sherbrooke"/>
                    </div>
                </div>
            </div>
        </div>
            <!-- fin de la colonne en haut à droite -->
<!-- /div du block des deux colonnes -->
</div>

        <!-- colonne pleine largeur -->
         <!-- <div class="block"> -->
            <div class="column is-full">
            <div class="field">
                <label class="label" for="descriptionEvenPayant">Description de l'événement</label>
                <div class="control">
                    <textarea class="textarea" maxlength="300" name="descriptionEvenPayant" id="descriptionEvenPayant" cols="30" rows="5" 
                    placeholder="Décrivez brièvement votre événement en un maximum 300 caractères."></textarea>
                </div>
            </div>
        <!-- </div> -->
        <!-- fin de la colonne pleine largeur -->

        <!-- <div class="block"> -->
            <div class="columns">
                <div class="column is-half">

                    <div class="field">
						<label class="label" for="siteEvenPayant">Site web ou page Facebook de l'événement</label>
						<div class="control">
							<input class="input" type="url" name="siteEvenPayant" id="siteEvenPayant" placeholder="https://monevenement.com"/>
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
                <!-- fin de la colonne au centre à gauche -->

                <!-- debut de la colonne du centre à droite -->
                 <div class="column is-half">
                    <div class="field">
                        <label class="label" for="siteEvenPayant">Lien vers l'événement Facebook</label>
                        <div class="control">
                            <input class="input" type="url" name="siteEvenPayant" id="siteEvenPayant" placeholder="https://www.facebook.com/events/426652909763130"/>
                        </div>
                    </div>
                </div>
                <!-- fin de la colonne du centre à droite -->
            </div>
        <!-- </div> -->
                <!-- fin des colonnes du centre -->
                

        <!-- debut de la section pour les photos -->
         <div class="block">
            <div class="columns is-centered">
                <div class="column is-one-third">

                    <div class="field">
                        <label class="label" for="photo1">Photo 1</label>
                        <div class="control">
                          <input class="input" type="file" name="photo1" id="photo1">
                        </div>
                      </div>
                </div>

                <div class="column is-one-third">
                    <div class="field">
                        <label class="label" for="photo2">Photo 2</label>
                        <div class="control">
                          <input class="input" type="file" name="photo2" id="photo2">
                        </div>
                      </div>
                </div>

                <div class="column is-one-third">
                    <div class="field">
                        <label class="label" for="photo3">Photo 3</label>
                        <div class="control">
                          <input class="input" type="file" name="photo3" id="photo3">
                        </div>
                      </div>
                </div>
                
            </div>
        </div>
        <!-- fin de la section pour les photos -->

    <hr class="mt-6 mb-6 is-hidden-mobile is-hidden-tablet-only" />
    <!-- section pour les infos d'appel de candidatures -->
	<H3Title title={"Détails de l'appel de candidatures"} />  
    
    <div class="block">
        <div class="columns">
            <div class="column is-half">

                <div class="field">
                    <label class="label" for="contactEvenPayant">Personne contact pour l'appel de candidature <span class="rouge">*</span></label>
                    <div class="control">
                        <input class="input" type="text"name="contactEvenPayant" id="contactEvenPayant" placeholder="Marché de Noël" required/>
                    </div>
                </div>

                <label class="label" for="dateCandEvenPayant">Dates de l'événement<span class="rouge">*</span></label>
                <div class="field is-grouped">
                      <div class="container ml-6 mb-3">
                          <span> Du:</span>
                          <input class="input" type="date" name="dateCandEvenPayantDebut" id="dateCandEvenPayantDebut" on:change={dateAppel} required/>
                          <span>au:</span>
                          <input class="input" type="date" name="dateCandEvenPayantFin" id="dateCandEvenPayantFin" on:change={dateAppel} required />
                          <div hidden id="messageEvenPayantAppel" class="notification is-danger is-light">
                              <p>La date de début ne peut pas être antérieure à la date de fin.</p>
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

                    <H3Title title={"Statistiques de votre événement"} />
                    <div class="field">
                        <label class="label" for="fondEvenPayant">Personne contact pour l'appel de candidature</label>
                        <div class="control">
                            <input class="input" type="number"name="fondEvenPayant" id="fondEvenPayant" placeholder="AAAA"/>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label" for="nbExpoEvenPayant">Nombre d'exposants</label>
                        <div class="control">
                            <input class="input" type="number"name="nbExpoEvenPayant" id="nbExpoEvenPayant" placeholder="25"/>
                        </div>
                    </div>

                </div>
        <!-- fin colonne fin à gauche -->
            </div>
            
        <!-- debut colonne fin à droite -->
         <div class="column is-half">
            <div class="field">
                <label class="label" for="courrielEvenPayant">Courriel pour information ou inscription <span class="rouge">*</span></label>
                <div class="control">
                    <input class="input" type="courriel"name="courrielEvenPayant" id="courrielEvenPayant" placeholder="inscription_evenement@mail.com" required/>
                </div>
            </div>

            <div class="field">
                <label class="label" for="formEvenPayant">Lien vers le formulaire d'appel de candidatures</label>
                <div class="control">
                    <input class="input" type="url"name="formEvenPayant" id="formEvenPayant" placeholder="inscription_evenement@mail.com"/>
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
                
                <div class="field">
                    <label class="label" for="formEvenPayant">Nombre de visiteurs (en moyenne)</label>
                    <div class="control">
                        <input class="input" type="number"name="formEvenPayant" id="formEvenPayant" placeholder="750"/>
                    </div>
                </div>

                <div class="field">
                    <label class="label" for="descriptionEvenPayant">Profil des visieurs (âge moyen, etc)</label>
                    <div class="control">
                        <textarea class="textarea" maxlength="300" name="descriptionEvenPayant" id="descriptionEvenPayant" cols="30" rows="5" 
                        placeholder="Événement visant les familles avec jeunes enfants (max 300 caractères)."></textarea>
                    </div>
                </div>
        <!-- fin colonnes de la fin -->
            </div>
        </div>
    </div>










        
<!-- /div du box du formulaire -->
        </div>
<!-- /div du block -->
</div>

			<hr class="mt-6 mb-6 is-hidden-mobile is-hidden-tablet-only" />
			<CheckboxResponsabilite />


		<!-- Boutons en bas de page -->
		<div class="block has-text-right">
			<!-- Valider si SubmitButon fait la bonne action! -->
			<SubmitButon texte={'Enregistrer'}></SubmitButon>
			<Retour />
		</div>
	</form>
</div>


