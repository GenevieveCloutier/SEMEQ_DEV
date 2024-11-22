import { fail, redirect } from '@sveltejs/kit';
import {
	createCookie,
	findOne as findOneSession
} from '../../lib/db/controllers/Sessions.controller.js';
import {
	authenticate,
	changementMDP,
	modificationUtilisateur,
	newUser,
	recuperationMDP,
	deleteUser,
	findOne as findOneUser
} from '../../lib/db/controllers/Utilisateurs.controller.js';
import {
	domaines,
	emplacements,
	envoieDomaine,
	envoieMappage,
	types,
	verifs
} from '../../lib/outils/compteurBinaire.js';
import {
	creationEvenement,
	findOne as findEvenement,
	modificationEvenement,
	suppressionEvenement
} from '../../lib/db/controllers/Evenements.controller.js';
import { ajoutProduitPanier, deleteCart } from '../../lib/db/controllers/Paniers.controller.js';
import { envoieCourriel } from '../../lib/outils/nodeMailer.js';
import { log } from '../../lib/outils/debug.js';
import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import { Utilisateur } from '../../lib/db/models/Utilisateur.model.js';
import { nouveauBillet, modifBillet, findOne as findOneBlogue, suppressionBillet } from '../../lib/db/controllers/Blogs.controller.js';
import { request } from 'http';
import { findOne as findOneProduit, suppressionProduit, nouveauProduit, modifProduit } from '../../lib/db/controllers/Produits.controller.js';
import { nouveauCodePromo, modifCodePromo, findOne as findOneCodePromo, suppressionCodePromo } from '../../lib/db/controllers/Partenaires.controller.js';

//Chemins de base pour stocker les photos
const cheminPhotosEven = path.join(process.cwd(), 'src/lib/img/app/evenements');
const cheminLogos = path.join(process.cwd(), 'src/lib/img/app/logos');
const cheminPhotosUtilisateurs = path.join(process.cwd(), 'src/lib/img/app/utilisateurs');
const cheminPhotosBlog = path.join(process.cwd(), 'src/lib/img/app/blog');
const cheminPhotosProduits = path.join(process.cwd(), 'src/lib/img/app/produits');
const cheminPhotosPartenaires = path.join(process.cwd(), 'src/lib/img/app/partenaires');

//*Import de la clé secrete stocké dans .env
import { TURNSTILE_SECRET_KEY } from '$env/static/private';
import { COURRIEL_GESTIONNAIRE } from '$env/static/private';

export const actions = {
	/**
	 ** Action pour supprimer un utilisateur à partir de son identifiant, avec option de redirection.
	 *
	 * @param {Cookies} cookies - Les cookies pour gérer la session utilisateur si nécessaire.
	 * @param {Request} request - La requête contenant les données du formulaire, incluant l'identifiant de l'utilisateur à supprimer.
	 *
	 * @returns {Object} - Le résultat de la suppression de l'utilisateur, ou une redirection éventuelle après suppression.
	 */
	supprimeUtilisateur: async ({ cookies, request }) => {
		const data = await request.formData();
		const result = await deleteUser(data.get('id'));
		return result;
	},

	/**
	 ** Action pour authentifier un utilisateur en vérifiant les informations d'identification et en créant un cookie de session.
	 *
	 * @param {Cookies} cookies - Les cookies pour enregistrer la session utilisateur après authentification.
	 * @param {Request} request - La requête contenant les données du formulaire de connexion (courriel et mot de passe).
	 *
	 * @returns {Object} - Objet de réponse avec `success: true`, la session et l'identifiant utilisateur en cas de succès,
	 *                     ou un échec avec statut 401 en cas d'erreur d'authentification.
	 */
	connexionUtilisateur: async ({ cookies, request }) => {
		const data = await request.formData();

		try {
			let res = await authenticate(data.get('courriel'), data.get('pwd'));
			createCookie(res.id, cookies, res.role_id);

			//*Enlève l'abonnement si la date est dépassée au moment de la connexion.
			let finAbonnement = false;
			if (res.abonne && res.fin_abo < new Date()) {
				finAbonnement = true;
				try {
					const utilisateur = await Utilisateur.findByPk(res.id);
					await utilisateur.update({ abonne: false, fin_abo: null });
				} catch (error) {
					log('erreur = ', error);
				}
			}

			return { success: true, session: cookies.get('session'), res: res.id, finAbonnement };
		} catch (error) {
			return fail(401, error);
		}
	},

	//tous les utilisateurs (gratuit, exposant, organisateur à venir) doivent être créés par ici
	/**
	 ** Action pour créer un nouvel utilisateur en enregistrant les données de formulaire et les photos, puis en définissant
	 * le rôle et la durée d'abonnement de l'utilisateur selon les paramètres fournis.
	 *
	 * @param {Cookies} cookies - Les cookies utilisés pour définir la session utilisateur.
	 * @param {Request} request - La requête contenant les données du formulaire d'inscription de l'utilisateur.
	 *
	 * @returns {Object} - Objet de réponse avec un statut 200 et l'utilisateur créé en cas de succès,
	 *                     ou un échec avec statut 401 en cas d'erreur.
	 */
	nouvelUtilisateur: async ({ cookies, request }) => {
		const data = await request.formData();

		const dataEntree = [...data.entries()];
		const role = dataEntree.length == 6 ? '4' : envoieMappage(data, domaines) == 0 ? '2' : '3';
		const finAbo = data.get('abonne') == 'on' ? new Date(Date.now() + 3.1536e10) : null;

		const domaine = envoieMappage(data, domaines);

		// Pour uploader et stocker les logos
		const uploadLogo = async (nomFichier) => {
			const logo = data.get(nomFichier);

			if (logo && logo.name) {
				const buffer = Buffer.from(await logo.arrayBuffer());
				const nomTemporaire = randomUUID() + logo.name;
				const filePath = path.resolve(cheminLogos, nomTemporaire);
				fs.writeFileSync(filePath, buffer);
				return path.relative(process.cwd(), filePath);
			}
			// Si pas de logo, retourne null
			return null;
		};
		const logo = await uploadLogo('logo');

		// Pour uploader et stocker les photos des utilisateurs
		const uploadPhotoUtilisateur = async (nomFichier) => {
			const photo = data.get(nomFichier);

			if (photo && photo.name) {
				const buffer = Buffer.from(await photo.arrayBuffer());
				const nomTemporaire = randomUUID() + photo.name;
				const filePath = path.resolve(cheminPhotosUtilisateurs, nomTemporaire);
				fs.writeFileSync(filePath, buffer);
				return path.relative(process.cwd(), filePath);
			}
			// Si pas de photo, retourne null
			return null;
		};
		const photo_1 = await uploadPhotoUtilisateur('photo_1');
		const photo_2 = await uploadPhotoUtilisateur('photo_2');
		const photo_3 = await uploadPhotoUtilisateur('photo_3');

		try {
			let res = await newUser(
				data.get('nom'),
				data.get('prenom'),
				role,
				data.get('entreprise'),
				data.get('neq'),
				data.get('courriel'),
				data.get('pwd'),
				data.get('site'),
				data.get('facebook'),
				data.get('insta'),
				data.get('tiktok'),
				domaine,
				data.get('ville_id'),
				data.get('partage') == 'on' ? 1 : 0,
				data.get('affichage') == 'on' ? 1 : 0,
				data.get('abonne') == 'on' ? 1 : 0,
				finAbo,
				data.get('description'),
				data.get('adresse'),
				data.get('publique') == 'on' ? 1 : 0,
				photo_1,
				photo_2,
				photo_3,
				logo
			);

			createCookie(res.id, cookies, res.role_id);
			return {
				status: 200,
				body: {
					message: 'Utilisateur créé avec succès',
					utilisateur: res
				}
			};
		} catch (error) {
			return fail(401, error);
		}
	},

	nouveauBillet: async ({ request, cookies }) => {
		const data = await request.formData();
		//J'ai mis la fonction de photo en dehors des actions pour qu'elle puisse etre utilisé sans la répéter
		const uploadPhoto = async (nomFichier) => {
			const photo = data.get(nomFichier);

			if (photo && photo.name) {
				const buffer = Buffer.from(await photo.arrayBuffer());
				const extension = photo.name.substring(photo.name.lastIndexOf("."));
				const nomTemporaire = randomUUID() + photo.name.replaceAll(/[\s\W]/g, "_") + extension;
				const filePath = path.resolve(cheminPhotosBlog, nomTemporaire);
				fs.writeFileSync(filePath, buffer);
				return path.relative(process.cwd(), filePath);
			}
			// si pas de photo, retourne null
			return null;
		};
		let photo_1 = await uploadPhoto('photo_1');
		const photo_2 = await uploadPhoto('photo_2');
		if (!photo_1)
			photo_1 = path.relative(process.cwd(), '\\src\\lib\\img\\app\\produit_defaut.png');
		try {
			const res = await nouveauBillet(data.get('titre'), data.get('article'), photo_1, photo_2);
			return {
				status: 200,
				body: {
					message: 'Article créé avec succès',
					article: res
				}
			};
		} catch (error) {
			return fail(401, error);
		}
	},

	nouveauProduit: async ({ request, cookies }) => {
		const data = await request.formData();
		//J'ai mis la fonction de photo en dehors des actions pour qu'elle puisse etre utilisé sans la répéter
		const uploadPhoto = async (nomFichier) => {
			const photo = data.get(nomFichier);

			if (photo && photo.name) {
				const buffer = Buffer.from(await photo.arrayBuffer());
				const extension = photo.name.substring(photo.name.lastIndexOf("."));
				const nomTemporaire = randomUUID() + photo.name.replaceAll(/[\s\W]/g, "_") + extension;
				const filePath = path.resolve(cheminPhotosProduits, nomTemporaire);
				fs.writeFileSync(filePath, buffer);
				return path.relative(process.cwd(), filePath);
			}
			// si pas de photo, retourne null
			return null;
		};
		let photo = await uploadPhoto('photo');
		if (!photo)
			photo = path.relative(process.cwd(), '\\src\\lib\\img\\app\\produit_defaut.png');
		try {
			const res = await nouveauProduit(
				data.get('nom'),
				data.get('type_id'),
				data.get('desc'),
				data.get('prix_v'),
				data.get('prix_a'),
				photo,
				data.get('dispo') == 'on' ? true : false
			);
			return {
				status: 200,
				body: {
					message: 'Produit créé avec succès',
					produit: res
				}
			};
		} catch (error) {
			return fail(401, error);
		}
	},

	modificationProduit: async ({request}) => {
		const data = await request.formData();
		//J'ai mis la fonction de photo en dehors des actions pour qu'elle puisse etre utilisé sans la répéter
		const uploadPhoto = async (nomFichier) => {
			const photo = data.get(nomFichier);

			if (photo && photo.name) {
				const buffer = Buffer.from(await photo.arrayBuffer());
				const extension = photo.name.substring(photo.name.lastIndexOf("."));
				const nomTemporaire = randomUUID() + photo.name.replaceAll(/[\s\W]/g, "_") + extension;
				const filePath = path.resolve(cheminPhotosProduits, nomTemporaire);
				fs.writeFileSync(filePath, buffer);
				return path.relative(process.cwd(), filePath);
			}
			// si pas de photo, retourne null
			return null;
		};
		let photo = await uploadPhoto('photo');
		try {
			const res = await modifProduit(data.get('id'), {
				nom: data.get('nom'),
				type_id: data.get('type_id'),
				desc: data.get('desc'),
				prix_v: data.get('prix_v'),
				prix_a: data.get('prix_a'),
				photo: photo,
				dispo: data.get('dispo') == 'on' ? true : false
		});
			return {
				status: 200,
				body: {
					message: 'Produit modifié avec succès',
					produit: res
				}
			};
		} catch (error) {
			return fail(401, error);
		}
	},

	modificationBillet: async ({request}) => {
		const data = await request.formData();
		//J'ai mis la fonction de photo en dehors des actions pour qu'elle puisse etre utilisé sans la répéter
		const uploadPhoto = async (nomFichier) => {
			const photo = data.get(nomFichier);

			if (photo && photo.name) {
				const buffer = Buffer.from(await photo.arrayBuffer());
				const extension = photo.name.substring(photo.name.lastIndexOf("."));
				const nomTemporaire = randomUUID() + photo.name.replaceAll(/[\s\W]/g, "_") + extension;
				const filePath = path.resolve(cheminPhotosBlog, nomTemporaire);
				fs.writeFileSync(filePath, buffer);
				return path.relative(process.cwd(), filePath);
			}
			// si pas de photo, retourne null
			return null;
		};
		let photo_1 = await uploadPhoto('photo_1');
		const photo_2 = await uploadPhoto('photo_2');
		try {
			const res = await modifBillet(data.get('id'), {
				titre: data.get('titre'),
				article: data.get('article'),
				image_1: photo_1,
				image_2: photo_2
		});
			return {
				status: 200,
				body: {
					message: 'Article modifié avec succès',
					article: res
				}
			};
		} catch (error) {
			return fail(401, error);
		}
	},

	supprimeBillet: async ({ cookies, request }) => {
		const data = await request.formData();
		if (cookies.get('id') == 1) {
			const res = await suppressionBillet(data.get('id'));
			return res;
		} else return fail(403, 'Vous ne disposez pas des droits nécessaires pour cette action');
	},

	supprimeProduit: async ({cookies, request}) => {
		const data = await request.formData();
		console.log(cookies.get('id'));
		
		if (cookies.get('id') == 1)
			return await suppressionProduit(data.get('id'));
		else return fail(403, 'Vous ne disposez pas des droits nécessaires pour cette action');
	},

	/**
	 ** Action pour créer un nouvel événement avec données et photos, et gérer l'approbation en fonction de l'abonnement de l'utilisateur.
	 *
	 * @param {Cookies} cookies - Les cookies contenant la session utilisateur.
	 * @param {Request} request - La requête contenant les données du formulaire pour créer un événement.
	 *
	 * @returns {Object} - Objet de réponse avec un statut 200 et l'événement créé en cas de succès,
	 *                     ou un échec avec statut 401 en cas d'erreur.
	 */

	nouvelEvenement: async ({ cookies, request }) => {
		//reste à changer la variable approuvé? Enregistre 1 si le form est payant, NULL si le form est gratuit, c'est ok?

		const data = await request.formData();
		const type = envoieMappage(data, types);
		const verif = envoieMappage(data, verifs);
		const emplacement = envoieMappage(data, emplacements);

		//pour uploader et stocker les photos

		const uploadPhoto = async (nomFichier) => {
			const photo = data.get(nomFichier);

			if (photo && photo.name) {
				const buffer = Buffer.from(await photo.arrayBuffer());
				const nomTemporaire = randomUUID() + photo.name;
				const filePath = path.resolve(cheminPhotosEven, nomTemporaire);
				fs.writeFileSync(filePath, buffer);
				return path.relative(process.cwd(), filePath);
			}
			// si pas de photo, retourne null
			return null;
		};

		let photo_1 = await uploadPhoto('photo_1');
		const photo_2 = await uploadPhoto('photo_2');
		const photo_3 = await uploadPhoto('photo_3');

		if (!photo_1)
			photo_1 = path.relative(process.cwd(), '\\src\\lib\\img\\app\\produit_defaut.png');

		let session;
		try {
			session = await findOneSession({ uuid: cookies.get('session') }); //ça fonctionne :D
			//log("session dans api = ", session.utilisateur.abonne);
		} catch (error) {
			throw error;
		}
		try {
			let res = await creationEvenement(
				data.get('nom'),
				session.utilisateur.id,
				data.get('contact'),
				data.get('entreprise'),
				data.get('debut_even'),
				data.get('fin_even'),
				data.get('horaire_even'),
				data.get('debut_cand'),
				data.get('fin_cand'),
				data.get('fondation'),
				data.get('nb_visiteur'),
				data.get('nb_expo'),
				data.get('profil'),
				data.get('site'),
				data.get('fb_even'),
				data.get('insta_even'),
				data.get('tiktok_even'),
				data.get('courriel'),
				data.get('ville_id'),
				data.get('adresse'),
				emplacement,
				type,
				data.get('type_autre'),
				data.get('form_cand'),
				verif,
				data.get('verification_autre'),
				data.get('selection') == 'on' ? 1 : 0,
				data.get('limite') == 'on' ? 1 : 0,
				data.get('description'),
				photo_1,
				photo_2,
				photo_3,
				session.utilisateur.abonne
			);
			return {
				status: 200,
				body: {
					message: 'Evénement créé avec succès',
					evenement: res
				}
			};
		} catch (error) {
			return fail(401, error);
		}
	},

	supprimeEvenement: async ({ cookies, request }) => {
		const data = await request.formData();
		const utilisateur = await findOne({ id: cookies.get('id') });
		const evenement = await findEvenement({ id: data.get('id') });
		if (utilisateur.role_id == 1 || utilisateur.id == evenement.utilisateur_id) {
			const res = await suppressionEvenement(data.get('id'));
			return res;
		} else return fail(403, 'Vous ne disposez pas des droits nécessaires pour cette action');
	},

	/**
	 ** Action pour initier la récupération de mot de passe en envoyant un courriel de réinitialisation.
	 *
	 * @param {Object} context - Le contexte de l'action.
	 * @param {Cookies} context.cookies - Les cookies pour gérer la session utilisateur.
	 * @param {Request} context.request - La requête contenant les données du formulaire avec l'adresse courriel de l'utilisateur.
	 *
	 * @returns {Object} - Objet de réponse avec un statut 200 et le jeton de réinitialisation si réussi,
	 *                     ou retourne un échec avec un statut 401 en cas d'erreur.
	 */
	recuperation: async ({ cookies, request }) => {
		const data = await request.formData();
		try {
			let res = await recuperationMDP(data.get('courriel'));
			const lien = `http://localhost:5173/connexion/validation/${res.jeton}`;
			const courrielComplet = redacteurCourriel(res.utilisateur.prenom, lien);
			await envoieCourriel(
				data.get('courriel'),
				'Réinitialisation de mot de passe',
				courrielComplet
			);
			return {
				status: 200,
				body: {
					message: 'Jeton créé avec succès',
					jeton: res.jeton
				}
			};
		} catch (error) {
			return fail(401, error);
		}
	},

	/**
	 ** Action pour changer le mot de passe d'un utilisateur.
	 *
	 * @param {Object} context - Le contexte de l'action.
	 * @param {Cookies} context.cookies - Les cookies pour identifier l'utilisateur.
	 * @param {Request} context.request - La requête contenant les données du formulaire, y compris l'ID de l'utilisateur et le nouveau mot de passe.
	 *
	 * @returns {Object} - Objet de réponse contenant le statut et le message de succès
	 *                     ou retourne un échec avec un statut 401 en cas d'erreur.
	 */
	changement: async ({ cookies, request }) => {
		const data = await request.formData();
		try {
			let res = await changementMDP(data.get('utilisateur_id'), data.get('nouveau_pwd'));
			return {
				status: 200,
				body: {
					message: res.message
				}
			};
		} catch (error) {
			return fail(401, error);
		}
	},

	/**
	 ** Action pour modifier les informations d'un utilisateur.
	 *
	 * @param {Object} context - Le contexte de l'action.
	 * @param {Cookies} context.cookies - Les cookies pour identifier l'utilisateur.
	 * @param {Request} context.request - La requête contenant les données du formulaire.
	 *
	 * @returns {Object} - Objet de réponse contenant le statut et le message de succès
	 *                     ou retourne un échec avec un statut 401 en cas d'erreur.
	 */
	modifUtilisateur: async ({ cookies, request }) => {
		const data = await request.formData();
		try {
			if (cookies.get('role') == 4 && !data.get('role_id')) {
				let res = await modificationUtilisateur(cookies.get('id'), {
					nom: data.get('nom'),
					prenom: data.get('prenom'),
					courriel: data.get('courriel'),
					ville_id: data.get('ville_id')
				});
			} else if (cookies.get('role') == 3 && !data.get('role_id')) {
				const domaine = envoieMappage(data, domaines);
				//*Reprise du code de Gen pour les upload d'image
				// Pour uploader et stocker les logos
				const uploadLogo = async (nomFichier) => {
					const logo = data.get(nomFichier);

					if (logo && logo.name) {
						const buffer = Buffer.from(await logo.arrayBuffer());
						const filePath = path.resolve(cheminLogos, logo.name);
						fs.writeFileSync(filePath, buffer);
						return path.relative(process.cwd(), filePath);
					}
					// Si pas de logo, retourne null
					return null;
				};
				const logo = await uploadLogo('logo');

				// Pour uploader et stocker les photos des utilisateurs
				const uploadPhotoUtilisateur = async (nomFichier) => {
					const photo = data.get(nomFichier);

					if (photo && photo.name) {
						const buffer = Buffer.from(await photo.arrayBuffer());
						const filePath = path.resolve(cheminPhotosUtilisateurs, photo.name);
						fs.writeFileSync(filePath, buffer);
						return path.relative(process.cwd(), filePath);
					}
					// Si pas de photo, retourne null
					return null;
				};
				const photo_1 = await uploadPhotoUtilisateur('photo_1');
				const photo_2 = await uploadPhotoUtilisateur('photo_2');
				const photo_3 = await uploadPhotoUtilisateur('photo_3');
				let res = await modificationUtilisateur(cookies.get('id'), {
					nom: data.get('nom'),
					prenom: data.get('prenom'),
					entreprise: data.get('entreprise'),
					neq: data.get('neq'),
					courriel: data.get('courriel'),
					site: data.get('site'),
					insta: data.get('insta'),
					tiktok: data.get('tiktok'),
					domaine: domaine,
					ville_id: data.get('ville_id'),
					partage: data.get('partage') == 'on' ? 1 : 0,
					affichage: data.get('affichage') == 'on' ? 1 : 0,
					description: data.get('description'),
					adresse: data.get('adresse'),
					publique: data.get('publique') == 'on' ? 1 : 0,
					photo_1: photo_1,
					photo_2: photo_2,
					photo_3: photo_3,
					log: logo
				});
			} else if (cookies.get('role') == 2 && !data.get('role_id')) {
				// Pour uploader et stocker les logos
				const uploadLogo = async (nomFichier) => {
					const logo = data.get(nomFichier);

					if (logo && logo.name) {
						const buffer = Buffer.from(await logo.arrayBuffer());
						const filePath = path.resolve(cheminLogos, logo.name);
						fs.writeFileSync(filePath, buffer);
						return path.relative(process.cwd(), filePath);
					}
					// Si pas de logo, retourne null
					return null;
				};
				const logo = await uploadLogo('logo');
				let res = await modificationUtilisateur(cookies.get('id'), {
					nom: data.get('nom'),
					prenom: data.get('prenom'),
					entreprise: data.get('entreprise'),
					neq: data.get('neq'),
					courriel: data.get('courriel'),
					site: data.get('site'),
					insta: data.get('insta'),
					tiktok: data.get('tiktok'),
					ville_id: data.get('ville_id'),
					logo: logo
				});
			}
			return {
				status: 200,
				body: {
					message: 'Utilisateur modifié avec succès'
				}
			};
		} catch (error) {
			log("Erreur dans l'API de modification = ", error);
			return fail(401, error);
		}
	},

	modifEvenement: async ({ cookies, request }) => {
		try {
			const data = await request.formData();
			const toujours = await Utilisateur.findOne({
				where: { id: cookies.get('id') },
				attributes: ['abonne']
			});
			const type = envoieMappage(data, types);
			const verif = envoieMappage(data, verifs);
			log('api les verifs = ', verif);
			const emplacement = envoieMappage(data, emplacements);
			const uploadPhoto = async (nomFichier) => {
				const photo = data.get(nomFichier);

				if (photo && photo.name) {
					const buffer = Buffer.from(await photo.arrayBuffer());
					const filePath = path.resolve(cheminPhotosEven, photo.name);
					fs.writeFileSync(filePath, buffer);
					return path.relative(process.cwd(), filePath);
				}
				// si pas de photo, retourne null
				return null;
			};
			log('api date debut = ', data.get('debut_even'));
			log('api id evenement = ', data.get('id'));

			const photo_1 = await uploadPhoto('photo_1');
			const photo_2 = await uploadPhoto('photo_2');
			const photo_3 = await uploadPhoto('photo_3');
			let res = await modificationEvenement(data.get('id'), {
				nom: data.get('nom'),
				contact: data.get('contact'),
				entreprise: data.get('entreprise'),
				debut_even: data.get('debut_even'),
				fin_even: data.get('fin_even'),
				horaire_even: data.get('horaire_even'),
				debut_cand: data.get('debut_cand'),
				fin_cand: data.get('fin_cand'),
				fondation: data.get('fondation'),
				nb_visiteur: data.get('nb_visiteur'),
				nb__expo: data.get('nb_expo'),
				profil: data.get('profil'),
				site: data.get('site'),
				fb_even: data.get('fb_even'),
				courriel: data.get('courriel'),
				ville_id: data.get('ville_id'),
				adresse: data.get('adresse'),
				emplacement: emplacement,
				type: type,
				type_autre: data.get('type_autre'),
				form_cand: data.get('form_cand'),
				verification: verif,
				verification_autre: data.get('verification_autre'),
				selection: data.get('selection') == 'on' ? 1 : 0,
				limite: data.get('limite') == 'on' ? 1 : 0,
				description: data.get('description'),
				photo_1: photo_1,
				photo_2: photo_2,
				photo_3: photo_3,
				approuve: toujours.abonne || cookies.get('role_id') === 1
			});
			return {
				status: 200,
				body: {
					message: 'Evénement modifié avec succès',
					evenement: res
				}
			};
		} catch (error) {
			log("Erreur dans l'API de modification = ", error);
			return fail(401, error);
		}
	},

	ajouterPanier: async ({ cookies, request }) => {
		const data = await request.formData();

		let session;
		try {
			session = await findOneSession({ uuid: cookies.get('session') });
		} catch (error) {
			throw error;
		}
		try {
			let res = await ajoutProduitPanier(session.utilisateur.id, data.get('produit_id'));
			return {
				status: 200,
				body: {
					message: 'Produit ajouté au panier avec succès',
					evenement: res
				}
			};
		} catch (error) {
			return fail(401, error);
		}
	},

	deleteOnePanier: async ({ request }) => {
		const data = await request.formData();

		try {
			let res = await deleteCart({ id: data.get('panier_id') });
			return {
				status: 200,
				body: {
					message: 'Produit retiré du panier avec succès',
					evenement: res
				}
			};
		} catch (error) {
			return fail(401, error);
		}
	},

	nouveauCodePromo: async ({ request, cookies }) => {
		const data = await request.formData();
	
		const uploadLogo = async (nomFichier) => {
			const logo = data.get(nomFichier);
	
			if (logo && logo.name) {
				const buffer = Buffer.from(await logo.arrayBuffer());
				const extension = logo.name.substring(logo.name.lastIndexOf("."));
				const nomTemporaire = randomUUID() + logo.name.replaceAll(/[\s\W]/g, "_") + extension;
				const filePath = path.resolve(cheminPhotosPartenaires, nomTemporaire);
				fs.writeFileSync(filePath, buffer);
				return path.relative(process.cwd(), filePath);
			}
			// si pas de logo, retourne null
			return null;
		};
		let logo = await uploadLogo('logo');
		if (!logo) {
			logo = path.relative(process.cwd(), '\\src\\lib\\img\\app\\produit_defaut.png');
		}
	
		const expiration = data.get('expiration') ? data.get('expiration') : null;
	
		try {
			const res = await nouveauCodePromo(data.get('nom'), data.get('avantage'), data.get('code'), logo, expiration);
			return {
				status: 200,
				body: {
					message: 'Code promo créé avec succès.',
					article: res
				}
			};
		} catch (error) {
			return fail(401, error);
		}
	},

	modificationCodePromo: async ({request}) => {
		const data = await request.formData();
		const uploadLogo = async (nomFichier) => {
			const logo = data.get(nomFichier);
	
			if (logo && logo.name) {
				const buffer = Buffer.from(await logo.arrayBuffer());
				const extension = logo.name.substring(logo.name.lastIndexOf("."));
				const nomTemporaire = randomUUID() + logo.name.replaceAll(/[\s\W]/g, "_") + extension;
				const filePath = path.resolve(cheminPhotosPartenaires, nomTemporaire);
				fs.writeFileSync(filePath, buffer);
				return path.relative(process.cwd(), filePath);
			}
			// si pas de logo, retourne null
			return null;
		};
		let logo = await uploadLogo('logo');

		const expiration = data.get('expiration') ? data.get('expiration') : null;

		try {
			const res = await modifCodePromo(data.get('id'), {
				nom: data.get('nom'),
				avantage: data.get('avantage'),
				code: data.get('code'),
				logo: logo,
				expiration: expiration
		});
			return {
				status: 200,
				body: {
					message: 'Code promo modifié avec succès',
					article: res
				}
			};
		} catch (error) {
			return fail(401, error);
		}
	},

	supprimeCodePromo: async ({ cookies, request }) => {
		const data = await request.formData();
		const code = await findOneCodePromo({ id: data.get('id') });
		if (cookies.get('id')) {
			const res = await suppressionCodePromo(data.get('id'));
			return res;
		} else return fail(403, 'Vous ne disposez pas des droits nécessaires pour cette action.');
	},
	
	contactMessage: async ({request}) => {
		const data = await request.formData();
		try {
			const captcha = await verifCloudflare(data.get('cf-turnstile-response'));
			if(!captcha) return fail(401,{message: "Le captcha n'est pas valide."});
			const messageContact = redacteurContact(data.get('nom'), data.get('courriel'), data.get('message'));
			await envoieCourriel(
				COURRIEL_GESTIONNAIRE,
				'Contacte du SEMEQ',
				messageContact
			);
			return {
				status: 200,
				body: {
					message: 'Message envoyé avec succès'
				}
			};
			
		} catch (error) {
			return fail(401, error);
		}
	}
};

async function verifCloudflare(token){
		const verifyUrl = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'; //*L'url de l'api de verification de token chez cloudflare
		const response = await fetch(verifyUrl, {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: `secret=${TURNSTILE_SECRET_KEY}&response=${token}` //*On envoie notre cle secrete turnstile avec le token
		});
		const cloudflare = await response.json();
		if (cloudflare.success) {
			//*Token validé, continue avec le traitement
			return true;
		} else {
			//*Si le captcha ne renvoie pas de succcess, on envoie une erreur
			return false;
		} //*L'objet renvoyé par l'api
		return cloudflare;
};

/**
 ** Génère un template HTML pour un courriel de réinitialisation de mot de passe.
 *
 * @param {string} prenom - Le prénom du destinataire du courriel.
 * @param {string} lien - L'URL pour réinitialiser le mot de passe.
 * @returns {string} - Le contenu HTML du courriel.
 */
//!faudras changer le lien pour le logo, tant qu'on travail en local ca marche pas.
function redacteurCourriel(prenom, lien) {
	return `
    <!doctype html>
    <html lang="fr-CA">
        <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <style>
                body {
                    font-family: 'Poppins', 'Gill Sans MT', 'Calibri', 'Trebuchet MS', sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    width: 100%;
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    padding: 20px;
                    border-radius: 10px;
                }
                .header {
                    text-align: center;
                    background-color: #f4f4f4;
                    padding: 20px;
                    border-radius: 10px 10px 0 0;
                }
                .header img {
                    max-width: 150px;
                }
                .header p {
                    font-size: 16px;
                    text-transform: uppercase;
                    font-weight: bold;
                    text-align: left;
                    margin-top: 10px;
                }
                h1 {
                    font-size: 24px;
                    color: #184287;
                }
                .button {
                    background-color: #184287;
                    color: white;
                    padding: 10px 20px;
                    text-decoration: none;
                    border-radius: 5px;
                    display: inline-block;
                    margin-top: 20px;
                }
                .footer {
                    margin-top: 30px;
                    font-size: 10px; /* Réduis cette valeur pour que le texte soit plus petit */
                    color: #666666;
                    text-align: center;
                }
                p {
                    font-size: 14px;
                    color: #333333;
                    line-height: 1.5;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <figure>
                        <a href="/">
                            <img src="/src/lib/img/app/logo.png" alt="logo SEMEQ" /> 
                        </a>
                    </figure>
                    <p>Le répertoire des salons, événements, marchés et expositions du Québec</p>
                </div>
                <h1>Réinitialisation de mot de passe</h1>
                <p>Bonjour ${prenom}.</p>
                <p>Une demande de réinitialisation de mot de passe a été reçue pour votre compte.</p>
                <p>Si vous n'êtes pas à l'origine de cette demande, vous pouvez simplement ignorer ce message.</p>
                <p>Pour réinitialiser votre mot de passe, cliquez sur le bouton ci-dessous pour être redirigé vers le répertoire SEMEQ.</p>
                <a href="${lien}" class="button">Changer de mot de passe</a>
                <footer class="footer">
                    <p>Si vous rencontrez un problème avec le bouton, vous pouvez aussi copier/coller cette adresse dans votre navigateur :</p>
                    <p>${lien}</p>
                    <p>© 2024 Répertoire SEMEQ - Tous droits réservés</p>
                </footer>
            </div>
        </body>
    </html>
    `;
}

function redacteurContact(nom, courriel, message) {
	return `
    <!doctype html>
    <html lang="fr-CA">
        <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <style>
                body {
                    font-family: 'Poppins', 'Gill Sans MT', 'Calibri', 'Trebuchet MS', sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    width: 100%;
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    padding: 20px;
                    border-radius: 10px;
                }
                .header {
                    text-align: center;
                    background-color: #f4f4f4;
                    padding: 20px;
                    border-radius: 10px 10px 0 0;
                }
                .header img {
                    max-width: 150px;
                }
                .header p {
                    font-size: 16px;
                    text-transform: uppercase;
                    font-weight: bold;
                    text-align: left;
                    margin-top: 10px;
                }
                h1 {
                    font-size: 24px;
                    color: #184287;
                }
                .button {
                    background-color: #184287;
                    color: white;
                    padding: 10px 20px;
                    text-decoration: none;
                    border-radius: 5px;
                    display: inline-block;
                    margin-top: 20px;
                }
                .footer {
                    margin-top: 30px;
                    font-size: 10px; /* Réduis cette valeur pour que le texte soit plus petit */
                    color: #666666;
                    text-align: center;
                }
                p {
                    font-size: 14px;
                    color: #333333;
                    line-height: 1.5;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <figure>
                        <a href="/">
                            <img src="/src/lib/img/app/logo.png" alt="logo SEMEQ" /> 
                        </a>
                    </figure>
                    <p>Le répertoire des salons, événements, marchés et expositions du Québec</p>
                </div>
                <h1>Message du formulaire de contact</h1>
                <p>Bonjour Nancy.</p>
                <p>Une demande de contacte a été faite sur le site du répertoire SEMEQ</p>
                <p>Nom de l’expéditeur: ${nom}</p>
                <p>Courriel de l'expéditeur: ${courriel}</p>
                <p>Message:</p>
				<p style="border: solid 1px black;">${message}</p>
                <footer class="footer">
                    <p>© 2024 Répertoire SEMEQ - Tous droits réservés</p>
                </footer>
            </div>
        </body>
    </html>
    `;
}
