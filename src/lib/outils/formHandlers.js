import { get, writable } from 'svelte/store';
import { log } from './debug';

export const erreur = writable(null);
export const success = writable(null);
erreur.set('');
success.set('');

/**
 * Ajoute la classe 'is-loading' à l'élément déclencheur de l'événement.
 *
 * Cette fonction permet d'ajouter une classe CSS au bouton de validation
 * afin de signaler visuellement que le chargement est en cours.
 *
 * @param {Event} event - L'événement déclenché, contenant l'élément cible.
 */
function chargement() {
	//log("Dans chargement boutton = ", document.getElementById('submitButton'));
	document.getElementById('submitButton').classList.add('is-loading');
}

export async function handleUserDelete(event) {
	//mettre un premier niveau de securite ici pour verifier les droits

	const formData = new FormData(event.target);

	const response = await fetch('./api?/supprimeUtilisateur', {
		method: 'POST',
		body: formData
	});

	const result = await response.json();

	if (result.type === 'success') {
		//log(result);
	} else {
		'Erreur : ' + JSON.parse(result.data)[0];
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
	const formData = new FormData(event.target);
	const response = await fetch('./api?/connexionUtilisateur', {
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
	if (result.type === 'success') {
		window.location.href = origine;
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
	try {
		const formData = new FormData(event.target);

		// Vérifier si le nombre de checkbox cochées est entre 1 et 3 pour Domaine(s) d'activit(é)s
		const checkboxes = event.target.querySelectorAll('input[type="checkbox"]:checked:not(.exclus)');
		if (checkboxes.length < 1 || checkboxes.length > 3) {
			erreur.set(
				"Merci de sélectionner entre 1 et 3 domaine(s) d'activité(s) selon l'abonnement choisi."
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
		const response = await fetch('../api?/nouvelUtilisateur', {
			method: 'POST',
			body: formData
		});

		//*initialise la variable pour le chemin
		let origine = '/';
		//*Si le cookie origine existe
		if (document.cookie.includes('origine'))
			origine = document.cookie.replaceAll('%2F', '/').slice(8); //*Remplace les '%2F' par des '/' et enlève les 8 premier caractères (origine=)
		//!Cette solution ne fonctionne que si il n'y as qu'un seul cookie http:false

		const result = await response.json();
		if (result.status == 200) window.location.href = origine;
		if (result.status == 401) erreur.set(JSON.parse(result.data)[0]);
	} catch (error) {
		console.error('erreur inattendue : ', error);
		erreur.set("Une erreur inattendue s'est produite, veuillez réessayer.");
	}
}

export async function creationOrganisateur(event) {
	chargement();
	erreur.set('');
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

		const response = await fetch('../api?/nouvelUtilisateur', {
			method: 'POST',
			body: formData
		});
		const result = await response.json();

		if (result.status == 200)
			//lien vers où ça doit aller après avoir envoyé le form
			window.location.href = '/[id]/mes_evenements/inscription_evenement_abonne';
		if (result.status == 401) erreur.set(JSON.parse(result.data)[0]);
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
		if (result.status == 200) window.location.href = origine; //redirection a discuter avec le groupe
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

		const response = await fetch('../../api?/nouvelEvenement', {
			method: 'POST',
			body: formData
		});
		const result = await response.json();
		if (result.status == 200) window.location.href = '/'; //redirection a discuter avec le groupe
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
		//log("formhandler response = ", response);
		const result = await response.json();
		//log("formhandler recuperation, result = ",result);

		if (result.status == 200) window.location.href = '/connexion/demandeEnvoye';
		if (result.status == 401) {
			//log("formhandler error recuperation = ",JSON.parse(result.data)[0])
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
		//log("formhandler changementMotDePasse formdata = ", formData);
		const response = await fetch('../../api?/changement', {
			method: 'POST',
			body: formData
		});
		//log("formhandler changementMDP response = ", response);
		const result = await response.json();
		//log("formhandler changementMDP result = ", result);
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
	//log("formhandler utilisateur = ", utilisateur);
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
		console.log(responsetAuth);
		let result = await responsetAuth.json();
		console.log(result);

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
		for (const [key, value] of formData.entries()) {
			console.log(key, value);
		}
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
			if (checkboxes.length < 1 || checkboxes.length > 3) {
				erreur.set(
					"Merci de sélectionner entre 1 et 3 domaine(s) d'activité(s) selon l'abonnement choisi."
				);
				return;
			}
            
		}
		const response = await fetch('../api?/modifUtilisateur', {
			method: 'POST',
			body: formData
		});
		const result = await response.json();
		log("dans le formhandler, result = ", result);
		if (result.status == 200) success.set('Modifications enregistrées');
		else erreur.set(JSON.parse(result.data)[1] || JSON.parse(result.data)[0]);
		log(JSON.parse(result.data))
	} catch (error) {
		console.error('erreur inattendue : ', error);
		log
		erreur.set("Une erreur inattendue s'est produite, veuillez réessayer.");
	}
}
