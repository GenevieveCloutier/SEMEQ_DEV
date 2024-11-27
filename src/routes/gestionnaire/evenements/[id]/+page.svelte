<script>
	import H1Title from '$lib/components/titres/h1Title.svelte';
	import H3Title from '$lib/components/titres/h3Title.svelte';
	import Retour from '$lib/components/generaux/retour.svelte';
	import CheckboxResponsabilite from '$lib/components/formulaires/checkboxResponsabilite.svelte';
	import SubmitButon from '$lib/components/formulaires/submitButon.svelte';
	import BoutonBleu from '$lib/components/boutons/boutonBleu.svelte';
	import { creationEvenementPayant, erreur } from '$lib/outils/formHandlers';
	import NotifDanger from '$lib/components/notifications/notifDanger.svelte';
	import NotifSuccess from '$lib/components/notifications/notifSuccess.svelte';
	import { onMount } from 'svelte';
	import Confirmation from '$lib/components/notifications/confirmation.svelte';
	import { modifEvenement, success } from '../../../../lib/outils/formHandlers';
	import { invalidateAll } from '$app/navigation';

	export let data;
	let { villes, evenement, liste_emplacement, liste_type, liste_verif } = data;
	//données du input type d'exposants pour preciser()
	onMount(() => {
		liste_emplacement.forEach((emplacement) => {
			if (emplacement) document.querySelector(`[name="${emplacement}"]`).checked = true;
		});
		liste_type.forEach((type) => {
			if (type) document.querySelector(`[name="${type}"]`).checked = true;
		});
		liste_verif.forEach((verif) => {
			if (verif) document.querySelector(`[name="${verif}"]`).checked = true;
		});
		if (evenement.limite) document.querySelector(`[name="limite"]`).checked = true;
		if (evenement.selection) document.querySelector(`[name="selection"]`).checked = true;
	});

	//fonction pour éviter que la date de début enregistrée soit après la date de fin
	function dateConforme(dateDebut, dateFin) {
		dateFin.min = dateDebut.value;
		dateFin.value = '';
	}

	//fonction pour envoyer les dates de l'événement à dateConforme()
	function dateEven() {
		let dateDebut = document.querySelector('#dateEvenPayantDebut');
		let dateFin = document.querySelector('#dateEvenPayantFin');
		dateConforme(dateDebut, dateFin);
	}

	//fonction pour envoyer les dates de l'appel de candidature à dateConforme()
	function dateAppel() {
		let dateDebut = document.querySelector('#dateCandEvenPayantDebut');
		let dateFin = document.querySelector('#dateCandEvenPayantFin');
		dateConforme(dateDebut, dateFin);
	}

	async function rechargement() {
		await invalidateAll();
		villes = data.villes;
		evenement = data.evenement;
		liste_emplacement = data.liste_emplacement;
		liste_type = data.liste_type;
		liste_verif = data.liste_verif;
	}
	$: if ($success) {
		setTimeout(() => {
			rechargement();
		}, 1000);
	}
</script>

<H1Title title={"Détails de l'événement"} />
<NotifSuccess />
<NotifDanger />
<div class="block">
	<form on:submit|preventDefault={modifEvenement}>
		<div class="box">
			<!-- section pour les infos de l'événement -->
			<H3Title title={"Détails de l'événement"} />

			<div class="block">
				<div class="columns">
					<div class="column is-half">
						<div>
							<div class="field">
								<label class="label" for="nom">Nom de l'événement </label>
								<div class="control">
									<input
										class="input"
										type="text"
										name="nom"
										id="nomEvenPayant"
										value={evenement.nom}
									/>
								</div>
							</div>
						</div>

						<div class="my-5">
							<div class="field">
								<label class="label" for="adresse">Adresse </label>
								<div class="control">
									<input
										class="input"
										type="text"
										name="adresse"
										id="adresseEvenPayant"
										value={evenement.adresse}
									/>
								</div>
							</div>
						</div>
						<div class="my-5">
							<div class="field">
								<label class="label" for="ville_id">Ville </label>
								<div class="control">
									<div class="select is-fullwidth">
										<select name="ville_id" id="villeEven">
											<option value={evenement.ville_id} selected>{evenement.ville.nom}</option>
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
									<input
										class="input"
										type="text"
										name="horaire_even"
										id="horaireEvenPayant"
										value={evenement.horaire_even}
									/>
								</div>
							</div>
						</div>

						<div class="mt-5">
							<label class="label" for="date">Dates de l'événement</label>
							<div class="field is-grouped">
								<div class="container ml-6 mb-3">
									<span> Du:</span>
									<input
										class="input"
										type="date"
										name="debut_even"
										id="dateEvenPayantDebut"
										on:change={dateEven}
										value={evenement.debut_even}
									/>
									<span>au:</span>
									<input
										class="input"
										type="date"
										name="fin_even"
										id="dateEvenPayantFin"
										value={evenement.fin_even}
									/>
								</div>
							</div>
						</div>
					</div>

					<!-- fin de la colonne en haut à droite -->
					<!-- /div du block des deux colonnes -->
				</div>

				<div class="column is-full">
					<div class="field">
						<label class="label" for="description">Description de l'événement</label>
						<div class="control">
							<textarea
								class="textarea"
								maxlength="300"
								name="description"
								id="descriptionEvenPayant"
								cols="30"
								rows="5"
								value={evenement.description}
							></textarea>
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
										<input
											class="input"
											type="url"
											name="site"
											id="siteEvenPayant"
											value={evenement.site}
										/>
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
										<input
											class="input"
											type="url"
											name="fb_even"
											id="siteEvenPayant"
											value={evenement.fb_even}
										/>
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
						<label class="label" for="emplacement">Emplacement</label>
						<div class="control">
							<div class="checkboxes">
								<label class="checkbox"
									><input
										class="mr-2 emplacement"
										type="checkbox"
										name="emplacementInterieur"
										id="emplacementInterieurPayant"
									/>Intérieur</label
								>
								<label class="checkbox"
									><input
										class="mr-2 emplacement"
										type="checkbox"
										name="emplacementExterieur"
										id="emplacementExterieurPayant"
									/>Extérieur</label
								>
								<label class="checkbox"
									><input
										class="mr-2 emplacement"
										type="checkbox"
										name="emplacementChapiteau"
										id="emplacementChapiteauPayant"
									/>Extérieur, sous un grand chapiteau</label
								>
								<label class="checkbox"
									><input
										class="mr-2 emplacement"
										type="checkbox"
										name="emplacementAbri"
										id="emplacementAbriPayant"
									/>Extérieur, petits abris fournis</label
								>
								<label class="checkbox"
									><input
										class="mr-2 emplacement"
										type="checkbox"
										name="emplacementSansAbri"
										id="emplacementSansAbriPayant"
									/>Extérieur, apportez votre abri</label
								>
							</div>
						</div>
					</div>

					<div class="columns is-centered">
						<div class="column is-one-third">
							<div class="field my-5">
								<label class="label" for="photo_1">Photo 1</label>
								<div class="control">
									<input class="input" type="file" accept="image/*" name="photo_1" id="photo_1" />
								</div>
								{#if evenement.photo_1}
									<figure class="image is-128x128">
										<img class="block" src="/{evenement.photo_1}" alt="photo_1" />
									</figure>
								{/if}
							</div>
						</div>

						<div class="column is-one-third">
							<div class="field my-5">
								<label class="label" for="photo_2">Photo 2</label>
								<div class="control">
									<input class="input" type="file" name="photo_2" id="photo_2" />
								</div>
							</div>
							{#if evenement.photo_2}
								<figure class="image is-128x128">
									<img class="block" src="/{evenement.photo_2}" alt="photo_2" />
								</figure>
							{/if}
						</div>

						<div class="column is-one-third">
							<div class="field my-5">
								<label class="label" for="photo_3">Photo 3</label>
								<div class="control">
									<input class="input" type="file" name="photo_3" id="photo_3" />
								</div>
							</div>
							{#if evenement.photo_3}
								<figure class="image is-128x128">
									<img class="block" src="/{evenement.photo_3}" alt="photo_3" />
								</figure>
							{/if}
						</div>
					</div>
					<!-- fin de la section pour les photos -->

					<div class="block">
						<div id="section2">
							<hr class="my-6 is-hidden-mobile is-hidden-tablet-only" />

							<!-- section pour les infos d'appel de candidatures -->
							<H3Title title={"Détails de l'appel de candidatures"} />
							<div class="columns">
								<div class="column is-half">
									<div>
										<div class="field">
											<label class="label" for="contact"
												>Personne contact pour l'appel de candidature
											</label>
											<div class="control">
												<input
													class="input"
													type="text"
													name="contact"
													id="contactEvenPayant"
													value={evenement.contact}
												/>
											</div>
										</div>
									</div>

									<div class="mt-5">
										<div class="field">
											<label class="label" for="courriel"
												>Courriel pour information ou inscription
											</label>
											<div class="control">
												<input
													class="input"
													type="courriel"
													name="courriel"
													id="courrielEvenPayant"
													value={evenement.courriel}
												/>
											</div>
										</div>
									</div>

									<div class="mt-5">
										<div class="field">
											<label class="label" for="form_cand"
												>Lien vers le formulaire d'appel de candidatures</label
											>
											<div class="control">
												<input
													class="input"
													type="url"
													name="form_cand"
													id="formEvenPayant"
													value={evenement.form_cand}
												/>
											</div>
										</div>
									</div>

									<div class="my-5">
										<label class="label" for="cand">Dates de l'appel de candidatures</label>
										<div class="field is-grouped">
											<div class="container ml-6 mb-3">
												<span> Du:</span>
												<input
													class="input"
													type="date"
													name="debut_cand"
													id="dateCandEvenPayantDebut"
													on:change={dateAppel}
													value={evenement.debut_cand}
												/>
												<span>au:</span>
												<input
													class="input"
													type="date"
													name="fin_cand"
													id="dateCandEvenPayantFin"
													value={evenement.fin_cand}
												/>
											</div>
										</div>
									</div>
									<!-- fin colonne fin à gauche -->
								</div>

								<!-- debut colonne fin à droite -->
								<div class="column is-half">
									<div>
										<div class="field">
											<label class="label" for="type">Type d'exposants</label>
											<div class="control">
												<div class="checkboxes">
													<label class="checkbox"
														><input
															class="mr-2 exposant"
															type="checkbox"
															name="typeArtisan"
															id="typeArtisanPayant"
														/>Artisan</label
													>
													<label class="checkbox"
														><input
															class="mr-2 exposant"
															type="checkbox"
															name="typeAgro"
															id="typeAgroPayant"
														/>Agro-alimentaire</label
													>
													<label class="checkbox"
														><input
															class="mr-2 exposant"
															type="checkbox"
															name="typeMLM"
															id="typeMLMPayant"
														/>MLM et revendeur</label
													>
													<label class="checkbox"
														><input
															class="mr-2 exposant"
															type="checkbox"
															name="typeAuteur"
															id="typeAuteurPayant"
														/>Auteur</label
													>
													<label class="checkbox"
														><input
															class="mr-2 exposant"
															type="checkbox"
															name="typeArt"
															id="typeArtPayant"
														/>Métiers d'art</label
													>
													<label class="checkbox"
														><input
															class="mr-2"
															type="checkbox"
															id="typeAutrePayant"
														/>Autres</label
													>
													<div>
														<input
															type="text"
															name="type_autre"
															id="inputTypePayant"
															value={evenement.type_autre}
														/>
													</div>
												</div>
											</div>
										</div>
									</div>

									<div class="my-5">
										<div class="field">
											<div class="control">
												<label class="checkbox label">
													Les places sont attribuées selon une sélection parmi les candidatures
													reçues <br />
													<span class="is-size-7 has-text-grey has-text-weight-normal"
														>(oui = sélection à la fin de la période de candidatures, non = premier
														arrivé, premier servi)<br /></span
													>
													<input
														type="checkbox"
														class="toggle exclus"
														name="selection"
														id="selection"
													/>
												</label>
											</div>
										</div>

										<div class="my-5">
											<div class="field">
												<label class="checkbox label">
													Le nombre d'exposants par domaine est limité <br />
													<span class="is-size-7 has-text-grey has-text-weight-normal"
														>(ex. 2 kiosques de savons, 1 kiosque de bougies...)<br /></span
													>
													<input type="checkbox" class="toggle exclus" name="limite" id="limite" />
												</label>
											</div>
										</div>
									</div>

									<div class="my-5">
										<div class="field">
											<label class="label" for="verification"
												>Vérifications effectuées par l'organisateur<br />
												<span class="is-size-7 has-text-grey has-text-weight-normal"
													>(ne rien cocher si aucune vérification n'est faite par l'organisation)</span
												></label
											>
											<div class="control">
												<div class="checkboxes">
													<label class="checkbox"
														><input
															class="mr-2"
															type="checkbox"
															name="verifNEQ"
															id="verifNEQPayant"
														/>NEQ</label
													>
													<label class="checkbox"
														><input
															class="mr-2"
															type="checkbox"
															name="verifPermis"
															id="verifPermisPayant"
														/>Permis</label
													>
													<label class="checkbox"
														><input
															class="mr-2"
															type="checkbox"
															id="checkboxVerifPayant"
														/>Autres</label
													>
													<div id="divVerif">
														<input
															type="text"
															name="verification_autre"
															id="inputVerifPayant"
															value={evenement.verification_autre}
														/>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<hr class="mb-6 is-hidden-mobile is-hidden-tablet-only" />

						<div id="section3">
							<H3Title title={'Statistiques de votre événement'} />

							<div class="columns">
								<div class="column is-half">
									<div class="field">
										<label class="label" for="nb_expo">Nombre d'exposants</label>
										<div class="control">
											<input
												class="input"
												type="number"
												name="nb_expo"
												id="nbExpoEvenPayant"
												value={evenement.nb_expo}
											/>
										</div>
									</div>
								</div>

								<div class="column is-half">
									<div class="field">
										<label class="label" for="nb_visiteur">Nombre de visiteurs (en moyenne)</label>
										<div class="control">
											<input
												class="input"
												type="number"
												name="nb_visiteur"
												id="formEvenPayant"
												value={evenement.nb_visiteur}
											/>
										</div>
									</div>
								</div>
							</div>

							<div class="columns">
								<div class="column is-half">
									<div class="field">
										<label class="label" for="fondation">Année de fondation</label>
										<div class="control">
											<input
												class="input"
												type="number"
												name="fondation"
												id="fondation"
												value={evenement.fondation}
											/>
										</div>
									</div>
								</div>

								<div class="column is-half">
									<div class="field">
										<label class="label" for="profil">Profil des visieurs (âge moyen, etc)</label>
										<div class="control">
											<textarea
												class="textarea"
												maxlength="300"
												name="profil"
												id="descriptionEvenPayant"
												cols="30"
												rows="5"
												value={evenement.profil}
											></textarea>
										</div>
									</div>
								</div>
								<input value={evenement.id} hidden readonly name="id" />
							</div>

							<hr class="is-hidden-mobile is-hidden-tablet-only" />

							<!-- Boutons en bas de page -->
							<div class="block has-text-right">
								<!-- Valider si SubmitButon fait la bonne action! -->
								<SubmitButon texte={'Enregistrer'}></SubmitButon>
								<Retour />
							</div>
							<div class="block has-text-right">
								<Confirmation id={evenement.id} but="evenement" />
							</div>

							<!-- fin section 3 -->
						</div>

						<!-- /div du box du formulaire -->
					</div>

					<!-- /div du block -->
				</div>
			</div>
		</div>
	</form>
</div>
