<script>
	import H1Title from '$lib/components/titres/h1Title.svelte';
	import SubmitButon from '$lib/components/formulaires/submitButon.svelte';
	import Retour from '$lib/components/generaux/retour.svelte';
	import AbonnementEven from '$lib/components/boites/abonnementEven.svelte';
	import AbonnementExposant from '$lib/components/boites/abonnementExposant.svelte';
	import Neq from '$lib/components/formulaires/neq.svelte';
	import DomainesActivites from '$lib/components/formulaires/domainesActivites.svelte';
	import { fade, fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { modifMdp, success } from '$lib/outils/formHandlers';
	import NotifSuccess from '../../lib/components/notifications/notifSuccess.svelte';
	import NotifDanger from '../../lib/components/notifications/notifDanger.svelte';
	import { log } from '../../lib/outils/debug';
	import { modifUtilisateur } from '../../lib/outils/formHandlers';
	import ChangementMdp from '../../lib/components/formulaires/changementMDP.svelte';
	import { domaines, recupMappage } from '$lib/outils/compteurBinaire';
	import { invalidateAll } from '$app/navigation';
	import Confirmation from '../../lib/components/notifications/confirmation.svelte';
	import Annonce from '../../lib/components/notifications/annonce.svelte';

	export let data;
	let { user, villes } = data;

	/**
	 * Charge les informations de l'utilisateur dans le formulaire en récupérant et vérifiant les données existantes.
	 *
	 * @async
	 * @function chargeInfos
	 * @returns {void}
	 *
	 * @description Cette fonction récupère les informations de l'utilisateur stockées dans `data.user`.
	 * Elle initialise certains champs du formulaire : si `user.neq` est vide, la case "no-neq" est cochée ; sinon, le champ "neq" est rempli.
	 * Ensuite, si l'utilisateur a un domaine défini, la fonction active les cases à cocher correspondantes dans le formulaire.
	 */
	async function chargeInfos() {
		await invalidateAll();
		let user = data.user;
		const checkbox = document.getElementById('no-neq');
		!user.neq
			? checkbox && (checkbox.checked = true)
			: (document.getElementById('neq').value = user.neq);

		if (user.domaine != 0) {
			const listeDomaine = recupMappage(user.domaine, domaines);
			Object.keys(domaines).forEach(
				(x) => (document.getElementById(x).checked = listeDomaine.includes(x))
			);
		}
	}

	//Pour gerer la barre bleu sur le menu a gauche
	onMount(() => {
		const actives = document.querySelectorAll('a.is-active');
		actives.forEach((x) => x.classList.remove('is-active'));
		document.getElementById('monCompte').classList.add('is-active');
		chargeInfos();
	});
	//La variable qui gere le changement de vue pour les mot de passe
	let visible = true;

	//La on vérifie si une notif success a ete envoyée
	$: if ($success) {
		visible = true; //Visible a true pour assurer la vue sur le formulaire complet
		setTimeout(() => {
			chargeInfos(); //Pour transformer les infos de la bd en valeur utilisable (genre les checkbox)
		}, 1000); //Retarder d'une petite seconde sinon il essaie d'assigner une valeur a qqch qui n'existe pas encore
	}
</script>

<H1Title title={'Mon compte'} />

<Annonce />
<NotifSuccess />
<NotifDanger />
<!-- ! Partie pour la modification Visiteur -->
{#if user.role_id === 4}
	<form on:submit|preventDefault={modifUtilisateur}>
		<div class="container is-fluid">
			{#if visible}
				<div
					class="box"
					in:fly={{ y: -200, duration: 400, delay: 400 }}
					out:fly={{ y: 200, duration: 300 }}
				>
					<div class="columns">
						<div class="column is-half">
							<div class="field">
								<label class="label" for="nom">Nom <span class="rouge">*</span></label>
								<div class="control">
									<input
										class="input"
										type="text"
										name="nom"
										id="nomBase"
										placeholder="Nom"
										required
										value={user.nom}
									/>
								</div>
							</div>

							<div class="field">
								<label class="label" for="prenom">Prénom <span class="rouge">*</span></label>
								<div class="control">
									<input
										class="input"
										type="text"
										name="prenom"
										id="prenomBase"
										placeholder="prenom"
										required
										value={user.prenom}
									/>
								</div>
							</div>

							<div class="field">
								<label class="label" for="ville_id">Ville</label>
								<div class="control">
									<div class="select is-fullwidth">
										<select name="ville_id" id="villeBase">
											<option value={user.ville_id} selected>{user.ville.nom}</option>
											{#each villes as ville}
												<option value={ville.id}>{ville.nom} ({ville.region.nom})</option>
											{/each}
										</select>
									</div>
								</div>
							</div>
						</div>

						<div class="column is-half">
							<div class="field">
								<label class="label" for="courriel">Courriel <span class="rouge">*</span></label>
								<div class="control">
									<input
										class="input"
										type="email"
										name="courriel"
										id="courrielBase"
										placeholder="nom@mail.com"
										required
										value={user.courriel}
									/>
								</div>
							</div>

							<div class="field">
								<label class="label" for="pwd">Mot de passe <span class="rouge">*</span></label>
								<div class="control">
									<button
										class="button is-primary-blue"
										on:click|preventDefault={() => (visible = !visible)}
									>
										Changer de mot de passe
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="block has-text-right">
					<SubmitButon texte={'Enregistrer'}></SubmitButon>
					<Retour />
				</div>
				<div class="block has-text-right">
					<Confirmation id={user.id} but='compte'/>
				</div>
			{:else}
				<ChangementMdp {user} />
			{/if}
		</div>
	</form>

	<div class="container is-flex my-5">
		<div class="columns">
			<div class="column is-half">
				<AbonnementExposant />
			</div>
			<div class="column is-half">
				<AbonnementEven />
			</div>
		</div>
	</div>
{/if}
<!-- ! Partie pour la modification exposant -->
{#if user.role_id === 3}
	<form on:submit|preventDefault={modifUtilisateur}>
		<div class="container is-fluid">
			{#if visible}
				<div
					class="box"
					in:fly={{ y: -200, duration: 400, delay: 400 }}
					out:fly={{ y: 200, duration: 300 }}
				>
					<div class="columns">
						<!-- Première colonne -->
						<div class="column">
							<div class="field">
								<label class="label" for="courriel">Courriel <span class="rouge">*</span></label>
								<div class="control">
									<input
										class="input"
										type="email"
										name="courriel"
										id="courriel"
										placeholder="nom@mail.com"
										value={user.courriel}
										required
									/>
								</div>
							</div>

							<div class="field">
								<label class="label" for="nom">Nom <span class="rouge">*</span></label>
								<div class="control">
									<input
										class="input"
										type="text"
										name="nom"
										id="nom"
										placeholder="Nom"
										value={user.nom}
										required
									/>
								</div>
							</div>

							<div class="field">
								<label class="label" for="entreprise">Entreprise <span class="rouge">*</span></label
								>
								<div class="control">
									<input
										class="input"
										type="text"
										name="entreprise"
										id="entreprise"
										placeholder="Nom de l'entreprise ou organisation"
										value={user.entreprise}
										required
									/>
									<input
										type="checkbox"
										class="checkbox"
										style="appearance: none;"
									/><!-- Ca, c'est juste pour décaler la ligne parce que les deux colonnes n'étaient pas l'une en face de l'autre  -->
								</div>
							</div>

							<div class="field">
								<label class="label" for="adresse">Adresse</label>
								<div class="control">
									<input
										class="input"
										type="text"
										name="adresse"
										id="adresse"
										placeholder="Numéro et rue"
										value={user.adresse}
									/>
								</div>
							</div>

							<div class="field">
								<label class="label" for="ville">Ville <span class="rouge">*</span></label>
								<div class="control">
									<div class="select is-fullwidth">
										<select name="ville_id" id="ville_id">
											<option value={user.ville_id} selected>{user.ville.nom}</option>
											{#each villes as ville}
												<option value={ville.id}>{ville.nom} ({ville.region.nom})</option>
											{/each}
										</select>
									</div>
								</div>
							</div>

							<div class="field">
								<label class="label" for="insta">Instagram</label>
								<div class="control">
									<input
										class="input"
										type="url"
										name="insta"
										id="insta"
										placeholder="https://www.instagram.com/entreprise"
										value={user.insta}
									/>
								</div>
							</div>
						</div>

						<!-- Deuxième colonne -->
						<div class="column">
							<div class="field">
								<label class="label" for="pwd">Mot de passe <span class="rouge">*</span></label>
								<div class="control">
									<button
										class="button is-primary-blue"
										on:click|preventDefault={() => (visible = !visible)}
									>
										Changer de mot de passe
									</button>
								</div>
							</div>

							<div class="field">
								<label class="label" for="prenom">Prénom <span class="rouge">*</span></label>
								<div class="control">
									<input
										class="input"
										type="text"
										name="prenom"
										id="prenom"
										placeholder="Prénom"
										value={user.prenom}
										required
									/>
								</div>
							</div>

							<Neq />
							<label class="label" for="logo">Logo</label>
							<div class="field is-grouped">
								<div class="control is-expanded">
									<input
										class="input"
										type="file"
										accept="image/png, image/jpeg, image/svg"
										name="logo"
										id="logo"
									/>
								</div>
								<div class="control">
									{#if user.logo}
										<figure class="image is-48x48">
											<img class="" src="/{user.logo}" alt="logo" />
										</figure>
									{/if}
								</div>
							</div>

							<div class="field">
								<label class="label" for="site">Site internet ou lien de ta page Facebook</label>
								<div class="control">
									<input
										class="input"
										type="url"
										name="site"
										id="site"
										placeholder="https://www.entreprise.com ou https://www.facebook.com/entreprise"
										value={user.site}
									/>
								</div>
							</div>

							<div class="field">
								<label class="label" for="tiktok">TikTok</label>
								<div class="control">
									<input
										class="input"
										type="url"
										name="tiktok"
										id="tiktok"
										placeholder="https://www.tiktok.com/@entreprise"
										value={user.tiktok}
									/>
								</div>
							</div>
						</div>
					</div>
					<!-- Fin des colonnes -->

					<DomainesActivites />

					<div class="columns">
						<!-- Première colonne -->
						<div class="column">
							<div class="field">
								<label class="label" for="photo_1">Photo 1</label>
								<div class="control">
									<input
										class="input"
										type="file"
										accept="image/png, image/jpeg, image/svg"
										name="photo_1"
										id="photo_1"
									/>
								</div>
							</div>
							{#if user.photo_1}
								<figure class="image is-128x128">
									<img class="block" src="/{user.photo_1}" alt="photo_1" />
								</figure>
							{/if}
						</div>

						<!-- Deuxième colonne -->
						<div class="column">
							<div class="field">
								<label class="label" for="photo_2">Photo 2</label>
								<div class="control">
									<input
										class="input"
										type="file"
										accept="image/png, image/jpeg, image/svg"
										name="photo_2"
										id="photo_2"
									/>
								</div>
							</div>
							{#if user.photo_2}
								<figure class="image is-128x128">
									<img class="block" src="/{user.photo_2}" alt="photo_2" />
								</figure>
							{/if}
						</div>

						<!-- Troisième colonne -->
						<div class="column">
							<div class="field">
								<label class="label" for="photo_3">Photo 3</label>
								<div class="control">
									<input
										class="input"
										type="file"
										accept="image/png, image/jpeg, image/svg"
										name="photo_3"
										id="photo_3"
									/>
								</div>
							</div>
							{#if user.photo_3}
								<figure class="image is-128x128">
									<img class="block" src="/{user.photo_3}" alt="photo_1" />
								</figure>
							{/if}
						</div>
					</div>
					<!-- Fin 3 colonnes -->

					<div class="field">
						<label class="label" for="description">Description</label>
						<div class="control">
							<textarea
								class="textarea"
								name="description"
								id="description"
								placeholder="Décris briévement ton entreprise">{user.description}</textarea
							>
						</div>
					</div>
					<br />

					<div class="columns">
						<!-- Première colonne -->
						<div class="column">
							<label class="checkbox">
								Être affiché sur le site de Répertoire SÉMEQ dans l’onglet Répertoire exposants (nom
								+ lien cliquable)?<br />
								<input
									type="checkbox"
									class="toggle exclus"
									name="affichage"
									id="affichage"
									checked={user.affichage}
								/>
							</label>
						</div>

						<!-- Deuxième colonne -->
						<div class="column">
							<label class="checkbox">
								Partager mon adresse courriel aux organisateurs d'événements (membres) pour recevoir
								leurs appels de candidatures?<br />
								<input
									type="checkbox"
									class="toggle exclus"
									name="partage"
									id="partage"
									checked={user.partage}
								/>
							</label>
						</div>
					</div>
				</div>
				<!-- Fin box -->
				<!-- Boutons en bas de page -->
				<div class="block has-text-right">
					<SubmitButon texte={'Enregistrer'}></SubmitButon>
					<Retour />
				</div>
				<div class="block has-text-right">
					<Confirmation id={user.id} but='compte' />
				</div>
				<input name="expo" hidden readonly value="true" />
			{:else}
				<ChangementMdp {user} />
			{/if}
		</div>
	</form>
{/if}
<!-- ! Partie pour la modification organisateur -->
{#if user.role_id === 2}
	<form on:submit|preventDefault={modifUtilisateur}>
		<div class="container is-fluid">
			{#if visible}
				<div
					class="box"
					in:fly={{ y: -200, duration: 400, delay: 400 }}
					out:fly={{ y: 200, duration: 300 }}
				>
					<div class="columns">
						<!-- Première colonne -->
						<div class="column">
							<div class="field">
								<label class="label" for="courriel">Courriel <span class="rouge">*</span></label>
								<div class="control">
									<input
										class="input"
										type="email"
										name="courriel"
										id="courriel"
										placeholder="nom@mail.com"
										required
										value={user.courriel}
									/>
								</div>
							</div>

							<div class="field">
								<label class="label" for="nom">Nom <span class="rouge">*</span></label>
								<div class="control">
									<input
										class="input"
										type="text"
										name="nom"
										id="nom"
										placeholder="Nom"
										required
										value={user.nom}
									/>
								</div>
							</div>

							<div class="field">
								<label class="label" for="entreprise">Entreprise <span class="rouge">*</span></label
								>
								<div class="control">
									<input
										class="input"
										type="text"
										name="entreprise"
										id="entreprise"
										placeholder="Nom de l'entreprise ou organisation"
										required
										value={user.entreprise}
									/>
									<input
										type="checkbox"
										class="checkbox"
										style="appearance: none;"
									/><!-- Ca, c'est juste pour décaler la ligne parce que les deux colonnes n'étaient pas l'une en face de l'autre  -->
								</div>
							</div>

							<div class="field">
								<label class="label" for="ville">Ville <span class="rouge">*</span></label>
								<div class="control">
									<div class="select is-fullwidth">
										<select name="ville_id" id="ville_id">
											<option value={user.ville_id} selected>{user.ville.nom}</option>
											{#each villes as ville}
												<option value={ville.id}>{ville.nom} ({ville.region.nom})</option>
											{/each}
										</select>
									</div>
								</div>
							</div>

							<div class="field">
								<label class="label" for="insta">Instagram</label>
								<div class="control">
									<input
										class="input"
										type="url"
										name="insta"
										id="insta"
										placeholder="https://www.instagram.com/entreprise"
										value={user.insta}
									/>
								</div>
							</div>

							<div class="field">
								<label class="label" for="tiktok">TikTok</label>
								<div class="control">
									<input
										class="input"
										type="url"
										name="tiktok"
										id="tiktok"
										placeholder="https://www.tiktok.com/@entreprise"
										value={user.tiktok}
									/>
								</div>
							</div>
						</div>

						<!-- Deuxième colonne -->
						<div class="column">
							<div class="field">
								<label class="label" for="password">Mot de passe <span class="rouge">*</span></label
								>
								<div class="control">
									<button
										class="button is-primary-blue"
										on:click|preventDefault={() => (visible = !visible)}
									>
										Changer de mot de passe
									</button>
								</div>
							</div>

							<div class="field">
								<label class="label" for="prenom">Prénom <span class="rouge">*</span></label>
								<div class="control">
									<input
										class="input"
										type="text"
										name="prenom"
										id="prenom"
										placeholder="Prénom"
										required
										value={user.prenom}
									/>
								</div>
							</div>

							<Neq />

							<div class="field">
								<label class="label" for="site">Site internet ou lien de ta page Facebook</label>
								<div class="control">
									<input
										class="input"
										type="url"
										name="site"
										id="site"
										placeholder="https://www.entreprise.com ou https://www.facebook.com/entreprise"
										value={user.site}
									/>
								</div>
							</div>

							<div class="field">
								<label class="label" for="logo">Logo</label>
								<div class="control">
									<input
										class="input"
										type="file"
										accept="image/png, image/jpeg, image/svg"
										name="logo"
										id="logo"
									/>
								</div>
								{#if user.logo}
									<figure class="image is-128x128">
										<img class="block" src="/{user.logo}" alt="logo" />
									</figure>
								{/if}
							</div>
						</div>
					</div>
					<!-- Fin des colonnes -->
					<input name="orga" value="true" hidden readonly />
				</div>
				<!-- Fin box -->

				<!-- Boutons en bas de page -->
				<div class="block has-text-right">
					<SubmitButon texte={'Enregistrer'}></SubmitButon>
					<Retour />
				</div>
				<div class="block has-text-right">
					<Confirmation id={user.id} but='compte' />
				</div>
			{:else}
				<ChangementMdp {user} />
			{/if}
		</div>
	</form>
{/if}
