<script>
	import H1Title from '$lib/components/titres/h1Title.svelte';
	import H3Title from '$lib/components/titres/h3Title.svelte';
	import Retour from '$lib/components/generaux/retour.svelte';
	import CheckboxResponsabilite from '$lib/components/formulaires/checkboxResponsabilite.svelte';
	import SubmitButon from '$lib/components/formulaires/submitButon.svelte';
	import NotifDanger from '$lib/components/notifications/notifDanger.svelte';
	import Etape2Organisateur from '$lib/components/barre_progression_paiement/etape2Organisateur.svelte';
	import BoutonBleu from '$lib/components/boutons/boutonBleu.svelte';

	let erreur = null;
    export let data;
	const {villes} = data;

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
    let champs = document.querySelector("#typeAutrePayant");
    let input = document.querySelector("#inputTypePayant");
    let requis = document.querySelector("#requisTypePayant");
    preciser(champs, input, requis)
	};

  //données du input Vérification pour preciser()
	function verification() {
    let champs = document.querySelector("#checkboxVerifPayant");
    let input = document.querySelector("#inputVerifPayant");
    let requis = document.querySelector("#requisVerifPayant");
    preciser(champs, input, requis)
	};

//fonction pour éviter que la date de début enregistrée soit après la date de fin
function dateConforme(dateDebut, dateFin){
		dateFin.min = dateDebut.value;
		dateFin.value="";
	};

  //fonction pour envoyer les dates de l'événement à dateConforme()
  function dateEven(){
    let dateDebut = document.querySelector("#dateEvenPayantDebut");
    let dateFin = document.querySelector("#dateEvenPayantFin");
    dateConforme(dateDebut, dateFin)
  };

  //fonction pour envoyer les dates de l'appel de candidature à dateConforme()
  function dateAppel(){
    let dateDebut = document.querySelector("#dateCandEvenPayantDebut");
    let dateFin = document.querySelector("#dateCandEvenPayantFin");
    dateConforme(dateDebut, dateFin)
  }

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

//pour la section 3
function section3(event){
    let section = document.querySelector('#section3');
    let bouton = document.querySelector("#bouton3");
    afficher(event,section, bouton)
};


</script>

<div class="block">
    <Etape2Organisateur />
	<NotifDanger {erreur}></NotifDanger>

	<form on:submit|preventDefault={handleSubmit}>
        <div class="box">
            <div class="mt-5 container has-text-centered">
                <!-- modifier le lien pour pointer vers une page de son compte -->
                <a href="/repertoire_evenements" class="py-3 px-3 button has-background-grey-lighter">Je souhaite inscrire mon événement plus tard</a>
                <p class="mt-5 mb-5">Tu pourras modifier ton événement et en ajouter d'autres en tout temps depuis ton compte</p>
            </div>

    <H1Title title={"Inscrire mon événement"} />

        <!-- section pour les infos de l'événement -->
        <H3Title title={"Détails de l'événement"} />

        <div class="block">
            <div class="columns">
                <div class="column is-half">
                    
                <div>
                    <div class="field">
						<label class="label" for="nom">Nom de l'événement <span class="rouge">*</span></label>
						<div class="control">
							<input class="input" type="text" name="nom" id="nomEvenPayant" placeholder="Marché de Noël" required/>
						</div>
					</div>
                </div>

            <div class="my-5">
                <div class="field">
                    <label class="label" for="adresse">Adresse <span class="rouge">*</span></label>
                    <div class="control">
                        <input class="input" type="text" name="adresse" id="adresseEvenPayant" placeholder="123 rue du Sous-Bois" required/>
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
            <!-- fin de de la colonne en haut à droite   -->
        </div>

            <!-- colonne en haut à gauche -->
            <div class="column is-half">

                <div>
                    <div class="field">
                        <label class="label" for="horaire_even">Heures d'ouverture (au public)</label>
                        <div class="control">
                            <input class="input" type="text" name="horaire_even" id="horaireEvenPayant" placeholder="De 9h à 17h"/>
                        </div>
                    </div>
                </div>

                <div class="mt-5">
                    <label class="label" for="date">Dates de l'événement<span class="rouge">*</span></label>
                      <div class="field is-grouped">
                            <div class="container ml-6 mb-3">
                                <span> Du:</span>
                                <input class="input" type="date" name="debut_even" id="dateEvenPayantDebut" on:change={dateEven} required/>
                                <span>au:</span>
                                <input class="input" type="date" name="fin_even" id="dateEvenPayantFin" required />
                            </div>
                        </div>
                    </div>

            </div>
        
            <!-- fin de la colonne en haut à droite -->
<!-- /div du block des deux colonnes -->
</div>

        <!-- colonne pleine largeur -->
            <div class="column is-full">
            <div class="field">
                <label class="label" for="description">Description de l'événement</label>
                <div class="control">
                    <textarea class="textarea" maxlength="300" name="description" id="descriptionEvenPayant" cols="30" rows="5" 
                    placeholder="Décrivez brièvement votre événement en un maximum 300 caractères."></textarea>
                </div>
            </div>
        <!-- fin de la colonne pleine largeur -->

        <!-- <div class="block"> -->
            <div class="columns">
                <div class="column is-half">

                <div class="my-5">
                    <div class="field">
						<label class="label" for="site">Site web ou page Facebook de l'événement</label>
						<div class="control">
							<input class="input" type="url" name="site" id="siteEvenPayant" placeholder="https://monevenement.com"/>
						</div>
					</div>
                </div>

            </div>
                <!-- fin de la colonne au centre à gauche -->

                <!-- debut de la colonne du centre à droite -->
                 <div class="column is-half">
                    <div class="my-5">
                        <div class="field">
                            <label class="label" for="fb_even">Lien vers l'événement Facebook</label>
                            <div class="control">
                                <input class="input" type="url" name="fb_even" id="siteEvenPayant" placeholder="https://www.facebook.com/events/426652909763130"/>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- fin de la colonne du centre à droite -->
            </div>
        <!-- </div> -->
                <!-- fin des colonnes du centre -->

        <!-- debut de la section pour les photos -->
        
                <div class="field my-5">
                    <label class="label" for="emplacement">Emplacement<span class="rouge">*</span></label>
                    <div class="control">
                        <div class="checkboxes">
                            <label class="checkbox"><input class="mr-2" type="checkbox" name="emplacementInterieur" id="emplacementInterieurPayant" />Intérieur</label>
                            <label class="checkbox"><input class="mr-2" type="checkbox" name="emplacementExterieur" id="emplacementExterieurPayant" />Extérieur</label>
                            <label class="checkbox"><input class="mr-2" type="checkbox" name="emplacementChapiteau" id="emplacementChapiteauPayant"/>Extérieur, sous un grand chapiteau</label>
                            <label class="checkbox"><input class="mr-2" type="checkbox" name="emplacementAbri" id="emplacementAbriPayant" />Extérieur, petits abris fournis</label>
                            <label class="checkbox"><input class="mr-2" type="checkbox" name="emplacementSansAbri" id="emplacementSansAbriPayant" />Extérieur, apportez votre abri</label>
                        </div>
                    </div>
                </div>

            <div class="columns is-centered">
                <div class="column is-one-third">

                    <div class="field my-5">
                        <label class="label" for="photo_1">Photo 1</label>
                        <div class="control">
                          <input class="input" type="file" name="photo_1" id="photo_1">
                        </div>
                    </div>

                </div>

                <div class="column is-one-third">
                    <div class="field my-5">
                        <label class="label" for="photo_2">Photo 2</label>
                        <div class="control">
                          <input class="input" type="file" name="photo_2" id="photo_2">
                        </div>
                      </div>
                </div>

                <div class="column is-one-third">
                    <div class="field my-5">
                        <label class="label" for="photo_3">Photo 3</label>
                        <div class="control">
                          <input class="input" type="file" name="photo_3" id="photo_3">
                        </div>
                      </div>
                </div>     
            </div>
        <!-- fin de la section pour les photos --> 

<!-- bouton pour cacher / afficher la section 2 -->
    <div id="bouton2" class="has-text-centered">
        <BoutonBleu texte={"Continuer vers la section 2 de 3"} fonction={section2} />
    </div>

    <div class="block">
        <div hidden id="section2">
            <hr class="my-6 is-hidden-mobile is-hidden-tablet-only" />

            <!-- section pour les infos d'appel de candidatures -->
            <H3Title title={"Détails de l'appel de candidatures"} /> 
        <div class="columns">
            <div class="column is-half">

                <div>
                    <div class="field">
                        <label class="label" for="contact">Personne contact pour l'appel de candidature <span class="rouge">*</span></label>
                        <div class="control">
                            <input class="input" type="text" name="contact" id="contactEvenPayant" placeholder="Marché de Noël" required/>
                        </div>
                    </div>
                </div>

                <div class="mt-5">
                    <div class="field">
                        <label class="label" for="courriel">Courriel pour information ou inscription <span class="rouge">*</span></label>
                        <div class="control">
                            <input class="input" type="courriel" name="courriel" id="courrielEvenPayant" placeholder="inscription_evenement@mail.com" required/>
                        </div>
                    </div>
                </div>

                <div class="mt-5">
                    <div class="field">
                        <label class="label" for="form_cand">Lien vers le formulaire d'appel de candidatures</label>
                        <div class="control">
                            <input class="input" type="url" name="form_cand" id="formEvenPayant" placeholder="inscription_evenement@mail.com"/>
                        </div>
                    </div>
                </div>

                <div class="my-5">
                    <label class="label" for="cand">Dates de l'appel de candidatures<span class="rouge">*</span></label>
                    <div class="field is-grouped">
                        <div class="container ml-6 mb-3">
                            <span> Du:</span>
                            <input class="input" type="date" name="debut_cand" id="dateCandEvenPayantDebut" on:change={dateAppel} required/>
                            <span>au:</span>
                            <input class="input" type="date" name="fin_cand" id="dateCandEvenPayantFin" required />
                        </div>
                    </div>
                </div>
        <!-- fin colonne fin à gauche -->
            </div>
            
        <!-- debut colonne fin à droite -->
         <div class="column is-half">

            <div>
                <div class="field">
                  <label class="label" for="type">Type d'exposants<span class="rouge">*</span></label>
                  <div class="control">
                      <div class="checkboxes">
                          <label class="checkbox"><input class="mr-2" type="checkbox" name="typeArtisan" id="typeArtisanPayant"  />Artisan</label>
                          <label class="checkbox"><input class="mr-2" type="checkbox" name="typeAgro" id="typeAgroPayant" />Agro-alimentaire</label>
                          <label class="checkbox"><input class="mr-2" type="checkbox" name="typeMLM" id="typeMLMPayant" />MLM et revendeur</label>
                          <label class="checkbox"><input class="mr-2" type="checkbox" name="typeAuteur" id="typeAuteurPayant" />Auteur</label>
                          <label class="checkbox"><input class="mr-2" type="checkbox" name="typeArt" id="typeArtPayant" />Métiers d'art</label>
                          <label class="checkbox"><input on:change={typeExposant} class="mr-2" type="checkbox"  id="typeAutrePayant" />Autres</label>
                          <div>
                              <input hidden type="text" name="type_autre" id="inputTypePayant" placeholder = "Préciser">
                              <span id="requisTypePayant" hidden class="rouge">*</span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        
          <div class="my-5">
            <div class="field">
                <div class="control">
                    <label class="checkbox label" name="selection" id="typeSelectionPayant">
                        Les places sont attribuées selon une sélection parmi les candidatures reçues <span class="rouge">*</span><br>
                        <span class="is-size-7 has-text-grey has-text-weight-normal" >(oui = sélection à la fin de la période de candidatures, non = premier arrivé, premier servi)<br></span> 
                        <input type="checkbox" class="toggle exclus">
                      </label>
                    </div>
                </div>

                <div class="my-5">
                    <div class="field">
                      <label class="checkbox label" name="limite" id="limiteSelectionPayant">
                        Le nombre d'exposants par domaine est limité <span class="rouge">*</span><br>
                        <span class="is-size-7 has-text-grey has-text-weight-normal" >(ex. 2 kiosques de savons, 1 kiosque de bougies...)<br></span>
                        <input type="checkbox" class="toggle exclus">
                      </label>
                </div>
            </div>
          </div>

          <div class="my-5">
            <div class="field">
                <label class="label" for="verification">Vérifications effectuées par l'organisateur<br>
                <span class="is-size-7 has-text-grey has-text-weight-normal" >(ne rien cocher si aucune vérification n'est faite par l'organisation)</span></label>
                <div class="control">
                    <div class="checkboxes">
                        <label class="checkbox"><input class="mr-2" type="checkbox" name="verifNEQ" id="verifNEQPayant" />NEQ</label>
                        <label class="checkbox"><input class="mr-2" type="checkbox" name="verifPermis" id="verifPermisPayant"/>Permis</label>
                        <label class="checkbox"><input on:change={verification} class="mr-2" type="checkbox" id="checkboxVerifPayant"  />Autres</label>
                        <div id="divVerif">
                            <input hidden type="text" name="verification_autre" id="inputVerifPayant" placeholder = "Préciser">
                            <span id="requisVerif" hidden class="rouge">*</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>      
    </div>
</div>

        <!-- bouton pour cacher / afficher la section 3 -->
        <div id="bouton3" class="has-text-centered">
            <BoutonBleu texte={"Continuer vers la section 3 de 3"} fonction={section3} />
        </div>

     <!-- fin section 2        -->
    </div>

            
        

        <hr class="mb-6 is-hidden-mobile is-hidden-tablet-only" />

    <div hidden id="section3">

        <H3Title title={"Statistiques de votre événement"} />

        <div class="columns">
            <div class="column is-half">
                <div class="field">
                    <label class="label" for="nb_expo">Nombre d'exposants</label>
                    <div class="control">
                        <input class="input" type="number" name="nb_expo" id="nbExpoEvenPayant" placeholder="25"/>
                    </div>
                </div>
            </div>
            
            <div class="column is-half">
                <div class="field">
                    <label class="label" for="nb_visiteur">Nombre de visiteurs (en moyenne)</label>
                    <div class="control">
                        <input class="input" type="number" name="nb_visiteur" id="formEvenPayant" placeholder="750"/>
                    </div>
                </div>
            </div>

        </div>

    <div>
        <div class="field">
            <label class="label" for="profil">Profil des visieurs (âge moyen, etc)</label>
            <div class="control">
                <textarea class="textarea" maxlength="300" name="profil" id="descriptionEvenPayant" cols="30" rows="5" 
                placeholder="Événement visant les familles avec jeunes enfants (max 300 caractères)."></textarea>
            </div>
        </div>
    </div>


			<hr class="is-hidden-mobile is-hidden-tablet-only" />
			<CheckboxResponsabilite />

		<!-- Boutons en bas de page -->
		<div class="block has-text-right">
			<!-- Valider si SubmitButon fait la bonne action! -->
			<SubmitButon texte={'Enregistrer'}></SubmitButon>
			<Retour />
		</div>

<!-- fin section 3 -->
</div>

<!-- /div du box du formulaire -->
</div>

<!-- /div du block -->
</div>

</form>
</div>


