import { get, writable } from 'svelte/store';
import { log } from './debug';
import { redirect } from '@sveltejs/kit';
import { goto, invalidateAll } from '$app/navigation';
import StorageAbonnements from '$lib/data/storageAbonnements.json';

export const erreur = writable(null);
export const success = writable(null);
export const annonce = writable(null);
erreur.set('');
success.set('');
annonce.set('');

// Pour l'application des codes promos
export const rabais = writable(0);
export const produitId = writable(null);
export const typeId = writable(null);

/**
 * Ajoute la classe 'is-loading' à l'élément déclencheur de l'événement.
 *
 * Cette fonction permet d'ajouter une classe CSS au bouton de validation
 * afin de signaler visuellement que le chargement est en cours.
 *
 * @param {Event} event - L'événement déclenché, contenant l'élément cible.
 */
function chargement() {
	document.getElementById('submitButton').classList.add('is-loading');
}

export async function handleUserDelete(p_id) {
	//mettre un premier niveau de securite ici pour verifier les droits
	const formData = new FormData();
	formData.append('id', p_id);
	const etapesArriere = window.location.pathname.split('/')[1] == 'gestionnaire' ? "../../" : "./";
	const response = await fetch(etapesArriere + 'api?/supprimeUtilisateur', {
		method: 'POST',
		body: formData
	});

	const result = await response.json();

	if (result.type === 'success') {
		if( etapesArriere === "../../")
			goto('/gestionnaire/utilisateurs');
		else
			goto('/deconnexion');
	} else {
		'Erreur : ' + JSON.parse(result.data)[0];
	}
}

export async function suppressionEvenement(p_id) {
	erreur.set('');
	success.set('');
	const formData = new FormData();
	formData.append('id', p_id);
	const response = await fetch('../../api?/supprimeEvenement', {
		method: 'POST',
		body: formData
	});

	const result = await response.json();
	const test = JSON.parse(result.data);
	if(result.status === 200){
		success.set(JSON.parse(result.data)[3]);
		goto(`/${JSON.parse(result.data)[4]}`);
	}else{
		erreur.set(JSON.parse(result.data)[0]);
	}
}

export async function suppressionBlogue(p_id) {
	erreur.set('');
	success.set('');
	const formData = new FormData();
	formData.append('id', p_id);
	const response = await fetch('../../api?/supprimeBillet', {
		method: 'POST',
		body: formData
	});

	const result = await response.json();
	const test = JSON.parse(result.data);
	if(result.status === 200){
		success.set(JSON.parse(result.data)[3]);
		goto(`/gestionnaire/blogue`);
	}else{
		erreur.set(JSON.parse(result.data)[0]);
	}
}

export async function suppressionProduit(p_id) {
	erreur.set('');
	success.set('');
	const formData = new FormData();
	formData.append('id', p_id);
	const response = await fetch('../../api?/supprimeProduit', {
		method: 'POST',
		body: formData
	});

	const result = await response.json();
	if(result.status === 200){
		success.set(JSON.parse(result.data)[3]);
		goto(`/gestionnaire/boutique`);
	}else{
		erreur.set(JSON.parse(result.data)[0]);
	}
}

/**
 * Gère la connexion d'un utilisateur à partir des données du formulaire.
 *
 * Cette fonction récupère les données du formulaire soumis, envoie une requête
 * POST à l'API pour établir la connexion, puis redirige vers la page d'accueil
 * si la connexion réussit. En cas d'échec, un message d'erreur est affiché.
 *
 * @param {Event} event - L'événement déclenché par la soumission du formulaire.
 *
 * @throws {Error} - Lance une erreur en cas de problème lors de la requête.
 */
export async function connexion(event) {
	chargement();
	erreur.set('');
	annonce.set('');
	const formData = new FormData(event.target);
	const response = await fetch('./api?/connexionUtilisateur', {
		method: 'POST',
		body: formData
	});
	const result = await response.json();
	//*initialise la variable pour le chemin, renvoie a Mon compte par défaut ou a la page gestionnaire
	let origine = '/' + (JSON.parse(result.data)[3] == 1 ? 'gestionnaire': JSON.parse(result.data)[3]) ;

	//*Si le cookie origine existe
	if (document.cookie.includes('origine'))
		origine = document.cookie.replaceAll('%2F', '/').slice(8); //*Remplace les '%2F' par des '/' et enlève les 8 premier caractères (origine=)
	//!Cette solution ne fonctionne que si il n'y as qu'un seul cookie http:false
	annonce.set((JSON.parse(result.data)[(JSON.parse(result.data)[0].finAbonnement)]));
	if (result.type === 'success') {
		window.location.href = origine; //! Ne pas utiliser goto pour recharger l'entête
	} else if (result.type === 'failure') {
		erreur.set(JSON.parse(result.data)[1]);
	}
}

/**
 * Gère la création d'un nouvel exposant en envoyant les données du formulaire via une requête POST.
 * Vérifie que le nombre de cases à cocher sélectionnées pour le domaine d'activité est compris entre 1 et 3.
 * Vérifie que l'utilisateur a rempli le champ NEQ ou coché la case correspondante.
 * En cas de succès (status 200), redirige vers la page d'accueil.
 * En cas d'échec (status 401), définit un message d'erreur.
 * Enregistre toute erreur inattendue dans la console.
 *
 * @param {Event} event L'événement contenant les données du formulaire.
 */

export async function creationExposant(event) {
	chargement();
	erreur.set('');

	//aller chercher les infos du type d'abonnement choisi dans la boutique
	let typeAbonnement = localStorage.getItem('typeAbonnement');

	//envoyer le type d'abonnement dans un cookie pour l'api
	document.cookie = `typeAbonnement=${encodeURIComponent(typeAbonnement)}; path=/;`;

	//tranformer le fichier json en tableau
    const tableauAbonnements = Object.entries(StorageAbonnements).map(([key, value]) => ({
		id: key,
		...value,
		  }));
  
      let id = typeAbonnement;
      typeAbonnement = tableauAbonnements.find((abonnement) => abonnement.id === id);

	  let nomAbonnement = typeAbonnement.nom;
      let nbCategories= typeAbonnement.nbCategories;

  
	try {
		const formData = new FormData(event.target);

		// Vérifier si le nombre de checkbox cochées est le même que l'abonnement choisi
		const checkboxes = event.target.querySelectorAll('input[type="checkbox"]:checked:not(.exclus)');
		
		if ((checkboxes.length < nbCategories) || 
			(checkboxes.length > nbCategories)) {
			erreur.set(
				`Tu as choisi l'abonnement ${nomAbonnement} qui te permet de sélectionner en tout ${nbCategories} 
				domaines(s) d'activités. Vérifie que ta sélection correspond bien au type d'abonnement choisi.` 
			);
			return;
		}

		// Choix obligatoire pour NEQ, l'utilisateur inscrit son NEQ ou coche la checkbox
		const neqInput = event.target.querySelector('#neq');
		const noNeqCheckbox = event.target.querySelector('#no-neq');

		if (noNeqCheckbox.checked && neqInput.value) {
			erreur.set(
				'Vous ne pouvez pas remplir le champ NEQ et cocher la case "Je n\'ai pas de NEQ" en même temps.'
			);
			return;
		}
		if (!neqInput.value && !noNeqCheckbox.checked) {
			erreur.set('Merci de remplir le champ NEQ ou cocher la case "Je n\'ai pas de NEQ".');
			return;
		}

			//limiter la taille à 5 mo
			const formatMax = 5 * 1024 * 1024;
			const fichierSoumis = event.target.querySelectorAll(
				'input[type="file"]'
			);

			for (const x of fichierSoumis) {
				const tableauFichiers = x.files;
				if (tableauFichiers.length > 0) {
					for (const fichier of tableauFichiers) {
						if (fichier.size > formatMax) {
							erreur.set(`Le fichier ${fichier.name} dépasse la taille maximale autorisée de 5 Mo. Sélectionner un autre fichier.`);
							return;
						}
					}
				}
			}


		const response = await fetch('../api?/nouvelUtilisateur', {
			method: 'POST',
			enctype: 'multipart/form-data',
			body: formData
		});

		//*initialise la variable pour le chemin
		let origine = '/';
		//*Si le cookie origine existe
		if (document.cookie.includes('origine'))
			origine = document.cookie.replaceAll('%2F', '/').slice(8); //*Remplace les '%2F' par des '/' et enlève les 8 premier caractères (origine=)
		//!Cette solution ne fonctionne que si il n'y as qu'un seul cookie http:false

		const result = await response.json();
				if (result.status == 200)
			//envoyer vers la page de paiement après avoir rempli le form
			window.location.href = '/panier/paiement_abonnement';
		if (result.status == 401) erreur.set(JSON.parse(result.data)[0]);
	} catch (error) {
		console.error('erreur inattendue : ', error);
		erreur.set("Une erreur inattendue s'est produite, veuillez réessayer.");
	}
}

export async function creationOrganisateur(event) {
	chargement();
	erreur.set('');

	//aller chercher les infos du type d'abonnement choisi dans la boutique
	let typeAbonnement = localStorage.getItem('typeAbonnement');

	//envoyer le type d'abonnement dans un cookie pour l'api
	document.cookie = `typeAbonnement=${encodeURIComponent(typeAbonnement)}; path=/;`;
	try {
		const formData = new FormData(event.target);

		// Choix obligatoire pour NEQ, l'utilisateur inscrit son NEQ ou coche la checkbox
		const neqInput = event.target.querySelector('#neq');
		const noNeqCheckbox = event.target.querySelector('#no-neq');

		if (noNeqCheckbox.checked && neqInput.value) {
			erreur.set(
				'Vous ne pouvez pas remplir le champ NEQ et cocher la case "Je n\'ai pas de NEQ" en même temps.'
			);
			return;
		}
		if (!neqInput.value && !noNeqCheckbox.checked) {
			erreur.set('Merci de remplir le champ NEQ ou cocher la case "Je n\'ai pas de NEQ".');
			return;
		}

		//limiter la taille à 5 mo
		const formatMax = 5 * 1024 * 1024;
		const fichierSoumis = event.target.querySelectorAll(
			'input[type="file"]'
		);

		for (const x of fichierSoumis) {
			const tableauFichiers = x.files;
			if (tableauFichiers.length > 0) {
				for (const fichier of tableauFichiers) {
					if (fichier.size > formatMax) {
						erreur.set(`Le fichier ${fichier.name} dépasse la taille maximale autorisée de 5 Mo. Sélectionner un autre fichier.`);
						return;
					}
				}
			}
		}

		const response = await fetch('../api?/nouvelUtilisateur', {
			method: 'POST',
			enctype: 'multipart/form-data',
			body: formData
		});
		const result = await response.json();

		if (result.status == 200)
			//envoyer vers la page de paiement après avoir rempli le form
			window.location.href = '/panier/paiement_abonnement';
		if (result.status == 401) erreur.set(JSON.parse(result.data)[0]);
	} catch (error) {
		console.error('erreur inattendue : ', error);
		erreur.set("Une erreur inattendue s'est produite, veuillez réessayer.");
	}
}

export async function creationBillet(event) {
	chargement;
	erreur.set('');
	try {
		const formData = new FormData(event.target);
		const response = await fetch('/api?/nouveauBillet', {
			method: 'POST',
			enctype: 'multipart/form-data',
			body: formData
		});
		const result = await response.json();
		if (result.status == 200){
			goto('/gestionnaire/blogue')
			success.set('Article ajouté avec succès!');
		}
		if (result.status == 401) erreur.set(JSON.parse(result.data)[0]);
	} catch (error) {
		console.error('erreur inattendue : ', error);
		erreur.set("Une erreur inattendue s'est produite, veuillez réessayer.");
	}
}

export async function creationProduit(event) {
	chargement;
	erreur.set('');
	try {
		const formData = new FormData(event.target);
		const response = await fetch('/api?/nouveauProduit', {
			method: 'POST',
			enctype: 'multipart/form-data',
			body: formData
		});
		const result = await response.json();
		if (result.status == 200){
			goto('/gestionnaire/boutique')
			success.set('Produit ajouté avec succès!');
		}
		if (result.status == 401) erreur.set(JSON.parse(result.data)[0]);
	} catch (error) {
		console.error('erreur inattendue : ', error);
		erreur.set("Une erreur inattendue s'est produite, veuillez réessayer.");
	}
}

export async function modificationBillet(event) {
	chargement;
	erreur.set('');
	try {
		const formData = new FormData(event.target);
		const response = await fetch('/api?/modificationBillet', {
			method: 'POST',
			enctype: 'multipart/form-data',
			body: formData
		});
		const result = await response.json();
		if (result.status == 200){
			goto('/gestionnaire/blogue')
			success.set('Article modifié avec succès!');
		}
		if (result.status == 401) erreur.set(JSON.parse(result.data)[0]);
	} catch (error) {
		console.error('erreur inattendue : ', error);
		erreur.set("Une erreur inattendue s'est produite, veuillez réessayer.");
	}
}

export async function modificationProduit(event) {
	chargement;
	erreur.set('');
	try {
		const formData = new FormData(event.target);
		const response = await fetch('/api?/modificationProduit', {
			method: 'POST',
			enctype: 'multipart/form-data',
			body: formData
		});
		const result = await response.json();
		log('handler = ', result)
		if (result.status == 200){
			goto('/gestionnaire/boutique')
			success.set('Produit modifié avec succès!');
		}
		log("formhandler result = ", result)
		// if (result.status == 401) erreur.set(JSON.parse(result.data)[0]);
	} catch (error) {
		console.error('erreur inattendue : ', error);
		erreur.set("Une erreur inattendue s'est produite, veuillez réessayer.");
	}
}

/**
 * Gère la création d'un nouvel événement en envoyant les données du formulaire via une requête POST.
 * En cas de succès (status 200), redirige vers la page d'accueil.
 * En cas d'échec (status 401), définit un message d'erreur.
 * Enregistre toute erreur inattendue dans la console.
 *
 * @param {Event} event L'événement contenant les données du formulaire.
 */
export async function creationEvenement(event) {
	chargement();
	erreur.set('');

	try {
		const formData = new FormData(event.target);

		const checkboxesEmpl = event.target.querySelectorAll(
			'input[type="checkbox"].emplacement:not(.exclus):checked'
		);
		const checkboxesExpo = event.target.querySelectorAll(
			'input[type="checkbox"].exposant:not(.exclus):checked'
		);

		// Vérifier si au moins une checkbox est cochée pour l'emplacement et type d'exposant et retourner le bon message
		if (checkboxesEmpl.length < 1 && checkboxesExpo.length < 1) {
			erreur.set("Merci de sélectionner au moins un emplacement et un type d'exposant.");
			return;
		}

		// Vérifier si au moins une checkbox est cochée pour l'emplacement
		if (checkboxesEmpl.length < 1) {
			erreur.set('Merci de sélectionner au moins un emplacement.');
			return;
		}

		// Vérifier si au moins une checkbox est cochée pour le type d'exposant
		if (checkboxesExpo.length < 1) {
			erreur.set("Merci de sélectionner au moins un type d'exposant.");
			return;
		}
		const response = await fetch('../api?/nouvelEvenement', {
			method: 'POST',
			enctype: 'multipart/form-data',
			body: formData
		});
		const result = await response.json();
		//*initialise la variable pour le chemin
		let origine = '/';
		//*Si le cookie origine existe
		if (document.cookie.includes('origine'))
			origine = document.cookie.replaceAll('%2F', '/').slice(8); //*Remplace les '%2F' par des '/' et enlève les 8 premier caractères (origine=)
		//!Cette solution ne fonctionne que si il n'y as qu'un seul cookie http:false
		if (result.status == 200) success.set('Événement ajouté avec succès!');


		if (result.status == 401) erreur.set(JSON.parse(result.data)[0]);
	} catch (error) {
		console.error('erreur inattendue : ', error);
		erreur.set("Une erreur inattendue s'est produite, veuillez réessayer.");
	}
}

/**
 * Gère la création d'un nouvel événement payant en envoyant les données du formulaire via une requête POST.
 * En cas de succès (status 200), redirige vers la page d'accueil.
 * En cas d'échec (status 401), définit un message d'erreur.
 * Enregistre toute erreur inattendue dans la console.
 *
 * @param {Event} event L'événement contenant les données du formulaire.
 */
export async function creationEvenementPayant(event) {
	erreur.set('');
	try {
		const formData = new FormData(event.target);
		formData.append('payant', true);

		const checkboxesEmpl = event.target.querySelectorAll(
			'input[type="checkbox"].emplacement:not(.exclus):checked'
		);
		const checkboxesExpo = event.target.querySelectorAll(
			'input[type="checkbox"].exposant:not(.exclus):checked'
		);

		// Vérifier si au moins une checkbox est cochée pour l'emplacement et type d'exposant et retourner le bon message
		if (checkboxesEmpl.length < 1 && checkboxesExpo.length < 1) {
			erreur.set("Merci de sélectionner au moins un emplacement et un type d'exposant.");
			return;
		}

		// Vérifier si au moins une checkbox est cochée pour l'emplacement
		if (checkboxesEmpl.length < 1) {
			erreur.set('Merci de sélectionner au moins un emplacement.');
			return;
		}

		// Vérifier si au moins une checkbox est cochée pour le type d'exposant
		if (checkboxesExpo.length < 1) {
			erreur.set("Merci de sélectionner au moins un type d'exposant.");
			return;
		}

		//limiter la taille à 5 mo
		const formatMax = 5 * 1024 * 1024;
		const fichierSoumis = event.target.querySelectorAll(
			'input[type="file"]'
		);

		for (const x of fichierSoumis) {
			const tableauFichiers = x.files;
			if (tableauFichiers.length > 0) {
				for (const fichier of tableauFichiers) {
					if (fichier.size > formatMax) {
						erreur.set(`Le fichier ${fichier.name} dépasse la taille maximale autorisée de 5 Mo. Sélectionner un autre fichier.`);
						return;
					}
				}
			}
		}


		const response = await fetch('../../api?/nouvelEvenement', {
			method: 'POST',
			enctype: 'multipart/form-data',
			body: formData
		});
		const result = await response.json();
	
		if (result.status == 200)
			//envoyer vers la page de confirmation finale après avoir rempli le form
			window.location.href = '/panier/paiement/confirmation';
		if (result.status == 401) erreur.set(JSON.parse(result.data)[0]);
		return;
	} catch (error) {
		console.error('erreur inattendue : ', error);
		erreur.set("Une erreur inattendue s'est produite, veuillez réessayer.");
	}
}

/**
 * Gère la création d'un nouveau visiteur en envoyant les données du formulaire via une requête POST.
 * En cas de succès (status 200), redirige vers la page d'accueil.
 * En cas d'échec (status 401), définit un message d'erreur.
 * Enregistre toute erreur inattendue dans la console.
 *
 * @param {Event} event L'événement contenant les données du formulaire.
 */

export async function creationVisiteur(event) {
	chargement();
	erreur.set('');

	//aller chercher les infos du compte visiteur
	let typeAbonnement = localStorage.getItem('typeAbonnement');

	//envoyer le type d'abonnement dans un cookie pour l'api
	document.cookie = `typeAbonnement=${encodeURIComponent(typeAbonnement)}; path=/;`;

	try {
		const formData = new FormData(event.target);
		const response = await fetch('../api?/nouvelUtilisateur', {
			method: 'POST',
			body: formData
		});
		const result = await response.json();
		//*initialise la variable pour le chemin
		let origine = '/';
		//*Si le cookie origine existe
		if (document.cookie.includes('origine'))
			origine = document.cookie.replaceAll('%2F', '/').slice(8); //*Remplace les '%2F' par des '/' et enlève les 8 premier caractères (origine=)
		//!Cette solution ne fonctionne que si il n'y as qu'un seul cookie http:false
		if (result.status == 200) window.location.href = origine;
		if (result.status == 401) erreur.set(JSON.parse(result.data)[0]);
	} catch (error) {
		console.error('erreur inattendue : ', error);
		erreur.set("Une erreur inattendue s'est produite, veuillez réessayer.");
	}
}

/**
 * Gère la soumission d'un formulaire de récupération de mot de passe.
 * Affiche un indicateur de chargement, efface les messages d'erreur,
 * puis envoie le formulaire pour récupérer le compte.
 * Redirige vers une page de confirmation ou affiche une erreur.
 *
 * @param {Event} event - L'événement de soumission du formulaire.
 */
export async function recuperation(event) {
	chargement();
	erreur.set('');
	try {
		const formData = new FormData(event.target);
		const response = await fetch('../api?/recuperation', {
			method: 'POST',
			body: formData
		});
		const result = await response.json();

		if (result.status == 200) window.location.href = '/connexion/demandeEnvoye';
		if (result.status == 401) {
			erreur.set(JSON.parse(result.data)[0]);
		}
	} catch (error) {
		console.error('erreur inattendue : ', error);
		erreur.set("Une erreur inattendue s'est produite, veuillez réessayer.");
	}
}

/**
 * Gère la soumission d'un formulaire pour le changement de mot de passe.
 * Affiche un indicateur de chargement, efface les messages d'erreur,
 * puis envoie le formulaire pour changer le mot de passe de l'utilisateur.
 * Redirige vers la page de connexion en cas de succès ou affiche une erreur.
 *
 * @param {Event} event - L'événement de soumission du formulaire.
 */
export async function changementMotDePasse(event) {
	chargement();
	erreur.set('');
	try {
		const formData = new FormData(event.target);
		const response = await fetch('../../api?/changement', {
			method: 'POST',
			body: formData
		});
		const result = await response.json();
		if (result.status == 200) window.location.href = '/connexion';
		if (result.status == 401) erreur.set(JSON.parse(result.data)[0]);
	} catch (error) {
		console.error('erreur inattendue : ', error);
		erreur.set("Une erreur inattendue s'est produite, veuillez réessayer.");
	}
}

/**
 * Modifie le mot de passe de l'utilisateur après vérification de l'ancien mot de passe.
 * Active l'indicateur de chargement, puis envoie le mot de passe actuel pour validation.
 * Si validé, envoie le nouveau mot de passe pour mise à jour.
 * Affiche un message de succès ou d'erreur selon le résultat.
 *
 * @param {Object} utilisateur - L'objet utilisateur contenant les informations utilisateur.
 * @param {string} pwdAncien - L'ancien mot de passe de l'utilisateur.
 * @param {string} pwdNouveau - Le nouveau mot de passe à définir.
 */
export async function modifMdp(utilisateur, pwdAncien, pwdNouveau) {
	erreur.set('');
	document.getElementById('envoie').classList.add('is-loading');
	try {
		const formData = new FormData();
		formData.append('utilisateur_id', utilisateur.id);
		formData.append('courriel', utilisateur.courriel);
		formData.append('pwd', pwdAncien);
		formData.append('nouveau_pwd', pwdNouveau);

		const responsetAuth = await fetch('../api?/connexionUtilisateur', {
			method: 'POST',
			body: formData
		});
		let result = await responsetAuth.json();

		if (result.status == 200) {
			const responseChangement = await fetch('../api?/changement', {
				method: 'POST',
				body: formData
			});
			result = await responseChangement.json();
			if (result.status == 200) {
				document.getElementById('envoie').classList.remove('is-loading');
				success.set('Mot de passe modifié');
			} else {
				erreur.set('La modification du mot de passe a échoué');
			}
		}
		if (result.status == 401) {
			document.getElementById('envoie').classList.remove('is-loading');
			erreur.set(JSON.parse(result.data)[1]);
		}
	} catch (error) {
		console.error('erreur inattendue : ', error);
		erreur.set("Une erreur inattendue s'est produite, veuillez réessayer.");
	}
}

export async function modifUtilisateur(event) {
	chargement();
	erreur.set('');

	try {
		const formData = new FormData(event.target);

        if ([...formData.keys()].includes('expo') || [...formData.keys()].includes('orga')){
            const neqInput = event.target.querySelector('#neq');
		const noNeqCheckbox = event.target.querySelector('#no-neq');

		if (noNeqCheckbox.checked && neqInput.value) {
			erreur.set(
				'Vous ne pouvez pas remplir le champ NEQ et cocher la case "Je n\'ai pas de NEQ" en même temps.'
			);
			return;
		}
		if (!neqInput.value && !noNeqCheckbox.checked) {
			erreur.set('Merci de remplir le champ NEQ ou cocher la case "Je n\'ai pas de NEQ".');
			return;
		}
        }
		if ([...formData.keys()].includes('expo')) {
			// Vérifier si le nombre de checkbox cochées est entre 1 et 3 pour domaines d'activités, mais faudras changer ca pour le vrai chiffre
			const checkboxes = event.target.querySelectorAll(
				'input[type="checkbox"]:checked:not(.exclus)'
			);
			// ! Ici il faudras changer pour le vrai nombre selon les achat de l'utilisateur
			if (checkboxes.length < 1 || checkboxes.length > 3) {
				erreur.set(
					"Merci de sélectionner entre 1 et 3 domaine(s) d'activité(s) selon l'abonnement choisi."
				);
				return;
			}

		}
		const etapesArriere = window.location.pathname.split('/')[1] == 'gestionnaire' ? "../../" : "../";
		const response = await fetch(etapesArriere + 'api?/modifUtilisateur', {
			method: 'POST',
			body: formData
		});
		const result = await response.json();
		if (result.status == 200) success.set('Modifications enregistrées');
		else erreur.set(JSON.parse(result.data)[1] || JSON.parse(result.data)[0]);
	} catch (error) {
		console.error('erreur inattendue : ', error);
		erreur.set("Une erreur inattendue s'est produite, veuillez réessayer.");
	}
}

export async function modifEvenement(event) {
	chargement();
	erreur.set('');
	try {
		const formData = new FormData(event.target);
		const response = await fetch('../../api?/modifEvenement', {
			method: 'POST',
			body: formData
		});
		const result = await response.json();
		if(result.status == 200) success.set(JSON.parse(result.data)[3])
		else erreur.set(JSON.parse(result.data)[1] || JSON.parse(result.data)[0]);
	} catch (error) {
		console.error('erreur inattendue : ', error);
		erreur.set("Une erreur inattendue s'est produite, veuillez réessayer.");
	}
}

export async function ajouterPanier(event){
    chargement();
    erreur.set('');
    try{
        const formData = new FormData(event.target);
        const response = await fetch('../api?/ajouterPanier', {
            method: 'POST',
            body: formData
        });
        log("formhandler ajouterPanier response = ", response);
        const result = await response.json();
        log("formhandler ajouterPanier, result = ",result);

        if (result.status == 200)
            window.location.href = '/panier';
        if (result.status == 401){
            log("formhandler error ajouterPanier = ",JSON.parse(result.data)[0])
            erreur.set(JSON.parse(result.data)[0]);
        }
    }catch(error){
        console.error("erreur inattendue : ", error);
        erreur.set("Une erreur inattendue s'est produite, veuillez réessayer.");
    }
}

export async function codePromoPanier(event) {
    const formData = new FormData(event.target);
    try {
        const response = await fetch('/api?/codePromoPanier', {
            method: 'POST',
            body: formData
        });
        const result = await response.json();
        if (result.status === 200) {
            window.location.reload();
            success.set('Code promo accepté.');
        } else if (result.status === 401) {
            erreur.set(result.message);
        }
    } catch (error) {
        console.error('Erreur inattendue : ', error);
        erreur.set("Une erreur inattendue s'est produite, veuillez réessayer.");
    }
}

export async function deleteOnePanier(event) {
	chargement;
	erreur.set('');
	try {
		const formData = new FormData(event.target);
		const response = await fetch('/api?/deleteOnePanier', {
			method: 'POST',
			body: formData
		});
		const result = await response.json();
		if (result.status == 200){
			window.location.reload();
			success.set('Le produit a été retiré du panier.');
		}
		if (result.status == 401) erreur.set(JSON.parse(result.data)[0]);
	} catch (error) {
		console.error('erreur inattendue : ', error);
		erreur.set("Une erreur inattendue s'est produite, veuillez réessayer.");
	}
}

export async function deleteSelectedItemsCart(event) {
	chargement;
	erreur.set('');
	try {
		const formData = new FormData(event.target);
		const response = await fetch('/api?/deleteSelectedItemsCart', {
			method: 'POST',
			body: formData
		});
		const result = await response.json();
		if (result.status == 200){
			window.location.reload();
			success.set('Les produits ont été retirés du panier.');
		}
		if (result.status == 401) erreur.set(JSON.parse(result.data)[0]);
	} catch (error) {
		console.error('erreur inattendue : ', error);
		erreur.set("Une erreur inattendue s'est produite, veuillez réessayer.");
	}
}

export async function deleteAllUserCart(p_id) {
	erreur.set('');
	success.set('');
	const formData = new FormData();
	formData.append('id', p_id);
	const response = await fetch('../../api?/deleteAllUserCart', {
		method: 'POST',
		body: formData
	});

	const result = await response.json();
	const test = JSON.parse(result.data);
	console.log('API response:', result);
	if(result.status === 200){
		success.set('Le panier a été vidé avec succès.');
		goto(`/boutique`);
	}else{
		console.error('Error:', error);
		erreur.set('Une erreur est survenue lors de la suppression du panier.');
	}
}

export async function creationCodePromo(event) {
	chargement;
	erreur.set('');
	try {
		const formData = new FormData(event.target);
		const response = await fetch('/api?/nouveauCodePromo', {
			method: 'POST',
			enctype: 'multipart/form-data',
			body: formData
		});
		const result = await response.json();
		if (result.status == 200){
			goto('/gestionnaire/codes_promo')
			success.set('Code promo ajouté avec succès!');
		}
		if (result.status == 401) erreur.set(JSON.parse(result.data)[0]);
	} catch (error) {
		console.error('erreur inattendue : ', error);
		erreur.set("Une erreur inattendue s'est produite, veuillez réessayer.");
	}
}

export async function modificationCodePromo(event) {
	chargement;
	erreur.set('');
	try {
		const formData = new FormData(event.target);
		const response = await fetch('/api?/modificationCodePromo', {
			method: 'POST',
			enctype: 'multipart/form-data',
			body: formData
		});
		const result = await response.json();
		if (result.status == 200){
			goto('/gestionnaire/codes_promo')
			success.set('Code promo modifié avec succès!');
		}
		if (result.status == 401) erreur.set(JSON.parse(result.data)[0]);
	} catch (error) {
		console.error('erreur inattendue : ', error);
		erreur.set("Une erreur inattendue s'est produite, veuillez réessayer.");
	}
}

export async function supprimeCodePromo(p_id) {
	erreur.set('');
	success.set('');
	const formData = new FormData();
	formData.append('id', p_id);
	const response = await fetch('../../api?/supprimeCodePromo', {
		method: 'POST',
		body: formData
	});

	const result = await response.json();
	if(result.status === 200){
		success.set(JSON.parse(result.data)[3]);
		goto(`/gestionnaire/codes_promo`);
	}else{
		erreur.set(JSON.parse(result.data)[0]);
	}
}

export async function contact(event) {
	chargement();
    erreur.set('');
	try {
		const formData = new FormData(event.target);
        const response = await fetch('../api?/contactMessage', {
            method: 'POST',
            body: formData
        });
		const result = await response.json();
		if(result.status == 200){
            // window.location.reload();
			success.set("Votre message a bien été envoyé.");
		}
		if (result.status == 401){
            erreur.set(JSON.parse(result.data)[1]);
        }
	} catch (error) {
		console.error("erreur inattendue : ", error);
        erreur.set("Une erreur inattendue s'est produite, veuillez réessayer.");
	}
}

export async function achatReussi(donnees){
	erreur.set('');
	success.set('');
	const formData = new FormData();
	formData.append('donnees', JSON.stringify(donnees));
	// alert(donnees.utilisateur.id)
	const response = await fetch('../../api?/validationAchat', {
		method: 'POST',
		body: formData
	  });
	  const result = await response.json();
	  if(result.status === 200)
		console.log("Achat validé");
	//? Une fonction pour envoyer un mail ?
	else
		erreur.set(JSON.parse(result.data)[0]);


}

export async function activeAbonnement(id) {
	const formData = new FormData();
	formData.append('id', JSON.stringify(id));
	const response = await fetch('../../api?/activationAbonnement', {
		method: 'POST',
		body: formData
	  });
	  const result = await response.json();
	  if(result.status === 200)
		console.log("Abonnement activé");
	//? Une fonction pour envoyer un mail ?
	else
		erreur.set(JSON.parse(result.data)[0]);
}