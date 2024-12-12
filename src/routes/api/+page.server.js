import { fail, redirect, error } from '@sveltejs/kit';
import {
	createCookie,
	findOne as findOneSession
} from '$lib/db/controllers/Sessions.controller.js';
import {
	authenticate,
	changementMDP,
	modificationUtilisateur,
	newUser,
	recuperationMDP,
	deleteUser,
	findOne as findOneUser,
	activeAbonnement
} from '../../lib/db/controllers/Utilisateurs.controller.js';
import {
	domaines,
	emplacements,
	envoieDomaine,
	envoieMappage,
	types,
	verifs
} from '$lib/outils/compteurBinaire.js';
import {
	creationEvenement,
	findOne as findEvenement,
	modificationEvenement,
	suppressionEvenement
} from '../../lib/db/controllers/Evenements.controller.js';
import { ajoutProduitPanier, deleteCart, deleteUserCart } from '../../lib/db/controllers/Paniers.controller.js';
import { Panier } from '../../lib/db/models/Panier.model.js';
import { envoieCourriel } from '../../lib/outils/nodeMailer.js';
import { log } from '../../lib/outils/debug.js';
import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import { Utilisateur } from '$lib/db/models/Utilisateur.model.js';
import { nouveauBillet, modifBillet, findOne as findOneBlogue, suppressionBillet } from '$lib/db/controllers/Blogs.controller.js';
import { request } from 'http';
import { findOne as findOneProduit, suppressionProduit, nouveauProduit, modifProduit } from '../../lib/db/controllers/Produits.controller.js';
import { nouveauCodePromo, modifCodePromo, findOne as findOneCodePromo, suppressionCodePromo } from '../../lib/db/controllers/Partenaires.controller.js';
import { json } from '@sveltejs/kit';
import StorageAbonnements from '$lib/data/storageAbonnements.json';

//*Import de la clé secrete stocké dans .env
import { TURNSTILE_SECRET_KEY } from '$env/static/private';
//import { TURNSTILE_SECRET_KEY } from 'virtual:$env/static/private';
import { COURRIEL_GESTIONNAIRE } from '$env/static/private';
import { transactionPanier } from '$lib/db/controllers/Transaction.controller.js';

//ajouts pour cloudinary
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { writeFile, unlink, stat } from 'fs/promises'; 
import { fileURLToPath } from 'url';
import { mkdir } from 'fs/promises';
import { CLOUD_NAME } from '$env/static/private';
import {API_KEY} from '$env/static/private';
import {API_SECRET} from '$env/static/private';


// Obtenir le chemin de base du projet
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Répertoire temporaire pour stocker les fichiers (relatif au projet)
const tempDir = path.join(__dirname, '../../uploads');

//créer le répertoire si il n'existe pas
await mkdir(tempDir, { recursive: true });

cloudinary.config({
	cloud_name: CLOUD_NAME,
	api_key: API_KEY, 
	api_secret: API_SECRET
  });

//fonction d'upload des photos, à utiliser pour tous les nouveaux ajouts
async function uploadPhoto(photo, dossier){
			if (!photo || !(photo instanceof Blob)) {
				//si aucun fichier, retourne null
				return null; 
			}

			// Convertir le fichier en un buffer
			const arrayBuffer = await photo.arrayBuffer();
			const buffer = Buffer.from(arrayBuffer);

			// Construire un chemin temporaire avec un nom unique
			const extension = photo.name.substring(photo.name.lastIndexOf("."));
			const nomTemporaire = randomUUID() +  photo.name.replaceAll(/[\s\W]/g, "_") + extension;
			const tempFilePath = path.join(tempDir, nomTemporaire);

			// Écrire le fichier localement
			await writeFile(tempFilePath, buffer);

			try {
			//upload des photos sur Cloudinary
				const result = await cloudinary.uploader.upload(tempFilePath, {
				folder: dossier,
				use_filename: true,
				unique_filename: false
				});

				//supprimer le fichier temporaire
				await unlink(tempFilePath);

				//retourner l'URL publique de l'image de cloudinairy. C'est ça qui est stocké dans la bd
				return result.secure_url;

			} catch (error) {

				// supprimer le fichier temporaire en cas d'erreur - supprime localement mais pas sur cloudinary, marche moyen
				await unlink(tempFilePath).catch(() => {});
				console.error('Erreur d\'upload Cloudinary:', error.message);
				//retourne null en cas d'erreur
				return null; 
			}
		};


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
	// 
	nouvelUtilisateur: async ({ cookies, request }) => {
		const data = await request.formData();

		const dataEntree = [...data.entries()];
		const role = dataEntree.length == 6 ? '4' : envoieMappage(data, domaines) == 0 ? '2' : '3';
		const finAbo = data.get('abonne') == 'on' ? new Date(Date.now() + 3.1536e10) : null;

		const domaine = envoieMappage(data, domaines);

		//récupérer le cookie du type d'abonnement sélectionné
		const typeAbonnementCookie = cookies.get('typeAbonnement');

		//tranformer le fichier json en tableau
		const tableauAbonnements = Object.entries(StorageAbonnements).map(([key, value]) => ({
			id: key,
			...value,
			}));
	
		let id = typeAbonnementCookie;
		let abonnement = tableauAbonnements.find((abonnement) => abonnement.id === id);

		//récupérer le nombre d'événements payés
		const nb_even_paye = abonnement.nb_even_paye;
	

		// Pour uploader et stocker les logos
		const uploadLogo = async (nomFichier) => {

				const photo = data.get(nomFichier);
				const dossier= "logos";
	
				//attendre que la fonction d'upload ait terminé puis retourner l'url pour la bd
				const photoUrl = await uploadPhoto(photo, dossier);
					return photoUrl		
			};

		const logo = await uploadLogo('logo');

		// Pour uploader et stocker les photos des utilisateurs
		const uploadPhotoUtilisateur = async (nomFichier) => {
			const photo = data.get(nomFichier);
			const dossier= "utilisateurs";

			//attendre que la fonction d'upload ait terminé puis retourner l'url pour la bd
			const photoUrl = await uploadPhoto(photo, dossier);
				return photoUrl		
		}
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
                data.get("code_postal"),
				data.get('partage') == 'on' ? 1 : 0,
				data.get('affichage') == 'on' ? 1 : 0,
				data.get('abonne') == 'on' ? 1 : 0,
				nb_even_paye,
				finAbo,
				data.get('description'),
				data.get('adresse'),
				data.get('publique') == 'on' ? 1 : 0,
				photo_1,
				photo_2,
				photo_3,
				logo,
                data.get("telephone")
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
		const uploadPhotoBlog = async (nomFichier) => {
			const photo = data.get(nomFichier);
			const dossier= "blogs";

			//attendre que la fonction d'upload ait terminé puis retourner l'url pour la bd
			const photoUrl = await uploadPhoto(photo, dossier);
				return photoUrl		
		};

		let photo_1 = await uploadPhotoBlog('photo_1');
		const photo_2 = await uploadPhotoBlog('photo_2');
		if (!photo_1)
			photo_1 = path.relative(process.cwd(), '\\img\\app\\produit_defaut.png');
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

		const uploadPhotoProduits = async (nomFichier) => {
			const photo = data.get(nomFichier);
			const dossier= "produits";

			//attendre que la fonction d'upload ait terminé puis retourner l'url pour la bd
			const photoUrl = await uploadPhoto(photo, dossier);
				return photoUrl	
		};

		let photo = await uploadPhotoProduits('photo');

		if (!photo)
			photo = path.relative(process.cwd(), '\\img\\app\\produit_defaut.png');

		try {
			const res = await nouveauProduit(
				data.get('nom'),
				data.get('type_id'),
				data.get('desc'),
				data.get('url'),
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
		// fait juste pousser une nouvelle photo, l'ancienne n'est pas supprimée...
		const uploadPhotoProduit = async (nomFichier) => {
			const photo = data.get(nomFichier);
			const dossier= "produits";

			//attendre que la fonction d'upload ait terminé puis retourner l'url pour la bd
			const photoUrl = await uploadPhoto(photo, dossier);
				return photoUrl	
		};

		let photo = await uploadPhotoProduit('photo');
		log("api data = ", data);
		try {
			const res = await modifProduit(data.get('id'), {
				nom: data.get('nom'),
				type_id: data.get('type_id'),
				desc: data.get('desc'),
				url: data.get('url'),
				prix_v: data.get('prix_v'),
				prix_a: data.get('prix_a'),
				photo: photo,
				dispo: data.get('dispo') == 'on' ? true : false
		});
		log("api res = ", res)
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
		// fait juste pousser une nouvelle photo, l'ancienne n'est pas supprimée...
		const uploadPhotoBlog = async (nomFichier) => {
			const photo = data.get(nomFichier);
			const dossier= "blogs";

			//attendre que la fonction d'upload ait terminé puis retourner l'url pour la bd
			const photoUrl = await uploadPhoto(photo, dossier);
				return photoUrl
		};
		let photo_1 = await uploadPhotoBlog('photo_1');
		const photo_2 = await uploadPhotoBlog('photo_2');
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

		const uploadPhotoEvenement = async (nomFichier) => {
			const photo = data.get(nomFichier);
				const dossier= "evenements";
	
				//attendre que la fonction d'upload ait terminé puis retourner l'url pour la bd
				const photoUrl = await uploadPhoto(photo, dossier);
					return photoUrl		
			};

		let photo_1 = await uploadPhotoEvenement('photo_1');
		const photo_2 = await uploadPhotoEvenement('photo_2');
		const photo_3 = await uploadPhotoEvenement('photo_3');

		if (!photo_1)
			photo_1 = path.relative(process.cwd(), '\\img\\app\\produit_defaut.png');

		let session;
		try {
			session = await findOneSession({ uuid: cookies.get('session') }); 
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
                data.get('code_postal'),
                data.get('telephone'),
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
				session.utilisateur.abonne,
				data.get('payant')
			);
			log("api creation = ", res)
			return {
				status: 200,
				body: {
					message: 'Evénement créé avec succès',
					evenement: res
				}
			};
		} catch (error) {
			log("erreur dans l'api = ", error)
			return fail(401, error);
		}
	},

	supprimeEvenement: async ({ cookies, request }) => {
		const data = await request.formData();
		const utilisateur = await findOneUser({ id: cookies.get('id') });
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
		log("dans l'api data = ", data)
		try {
			if (cookies.get('role') == 4 || data.get('gestionnaire') == 4) {
				let res = await modificationUtilisateur(data.get('user_id') ?? cookies.get('id'), {
					nom: data.get('nom'),
					prenom: data.get('prenom'),
					courriel: data.get('courriel'),
					ville_id: data.get('ville_id')
				});
			} else if (cookies.get('role') == 3 || data.get('gestionnaire') == 3) {
				const domaine = envoieMappage(data, domaines);
		
				// Pour uploader et stocker les logos
				const uploadLogo = async (nomFichier) => {
					const photo = data.get(nomFichier);
					const dossier= "logos";
	
					//attendre que la fonction d'upload ait terminé puis retourner l'url pour la bd
					const photoUrl = await uploadPhoto(photo, dossier);
						return photoUrl	
				};
				const logo = await uploadLogo('logo');

				// Pour uploader et stocker les photos des utilisateurs
				const uploadPhotoUtilisateur = async (nomFichier) => {
					const photo = data.get(nomFichier);
					const dossier= "utilisateurs";
	
					//attendre que la fonction d'upload ait terminé puis retourner l'url pour la bd
					const photoUrl = await uploadPhoto(photo, dossier);
						return photoUrl	
				};
				const photo_1 = await uploadPhotoUtilisateur('photo_1');
				const photo_2 = await uploadPhotoUtilisateur('photo_2');
				const photo_3 = await uploadPhotoUtilisateur('photo_3');

				let res = await modificationUtilisateur(data.get('user_id') ?? cookies.get('id'), {
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
			} else if (cookies.get('role') == 2 || data.get('gestionnaire') == 2) {

				// Pour uploader et stocker les logos
				//pourquoi c'était ic deux fois? J'ai juste modifié l'import des photo, le code était en double...
				const uploadLogo = async (nomFichier) => {
					const photo = data.get(nomFichier);
					const dossier= "logos";
	
				//attendre que la fonction d'upload ait terminé puis retourner l'url pour la bd
				const photoUrl = await uploadPhoto(photo, dossier);
					return photoUrl	
				};
				const logo = await uploadLogo('logo');

				let res = await modificationUtilisateur(data.get('user_id') ?? cookies.get('id'), {
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

			const uploadPhotoEvenements = async (nomFichier) => {
				const photo = data.get(nomFichier);
				// fait juste ajouter une nouvelle photo, ne supprime pas l'ancienne sur cloudinary
				const dossier= "evenements";

			//attendre que la fonction d'upload ait terminé puis retourner l'url pour la bd
			const photoUrl = await uploadPhoto(photo, dossier);
				return photoUrl	
			};
			log('api date debut = ', data.get('debut_even'));
			log('api id evenement = ', data.get('id'));

			const photo_1 = await uploadPhotoEvenements('photo_1');
			const photo_2 = await uploadPhotoEvenements('photo_2');
			const photo_3 = await uploadPhotoEvenements('photo_3');
			log("api data = ", data)
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
				nb_expo: data.get('nb_expo'),
				profil: data.get('profil'),
				site: data.get('site'),
				fb_even: data.get('fb_even'),
				insta_even: data.get('insta_even'),
				tiktok_even:data.get('tiktok_even'),
				courriel: data.get('courriel'),
				ville_id: data.get('ville_id'),
				adresse: data.get('adresse'),
				emplacement: emplacement,
				type: type,
				type_autre: data.get('type_autre'),
				form_cand: data.get('form_cand'),
                code_postal: data.get('code_postal'),
                telephone: data.get('telephone'),
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

	codePromoPanier: async ({request}) => {
		const data = await request.formData();
		try {
			const code = data.get('code');
			const partenaire = await findOneCodePromo({ code: code });
			if (!partenaire) {
                return fail(401, { message: "Ce code promo n\'est pas valide." });
            }

			// Vérification de la catégorie de partenaire
			if (!partenaire.categorie_id || partenaire.categorie.nom !== 'Rabais boutique SÉMEQ') {
				return fail(401, { message: "Ce code promo n\'est pas applicable sur la boutique." });
			}

			// Vérification de la date d'expiration
			let aujourdhui = new Date().toLocaleDateString('fr-CA', {timeZone: 'UTC'})
			const expirationDate = (partenaire.expiration).toLocaleDateString('fr-CA', {timeZone: 'UTC'});
			if (expirationDate < aujourdhui) {
                return fail(401, { message: "Ce code promo a expiré." });
            }

			const response = {
                status: 200,
                body: {
                    message: 'Code promo accepté!',
					rabais: partenaire.rabais,
					produit_id: partenaire.produit_id,
					type_id: partenaire.type_id
                }
            };
            return response;
		} catch (error) {
			return fail(401, error);
		}
	},

	deleteOnePanier: async ({ request }) => {
		const data = await request.formData();
		try {
			const res = await deleteCart({ id: data.get('panier_id') });
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

	deleteSelectedItemsCart: async ({ request }) => {
		const data = await request.formData();
		const panier_id = data.get('selectedItems').split(',');
		try {
			const res = await deleteCart({ id: panier_id });
			return {
				status: 200,
				body: {
					message: 'Produits retirés du panier avec succès',
					evenement: res
				}
			};
		} catch (error) {
			return fail(401, error);
		}
	},

	deleteAllUserCart: async ({ cookies, request }) => {
		const data = await request.formData();
		if (cookies.get('id')) {
			const res = await deleteUserCart(data.get('id'));
			console.log('deleteUserCart response:', res);
			return res;
		} else return fail(403, 'Vous ne disposez pas des droits nécessaires pour cette action.');
	},

	nouveauCodePromo: async ({ request, cookies }) => {
		const data = await request.formData();
	
		const uploadLogo = async (nomFichier) => {
			const photo = data.get(nomFichier);
			const dossier= "partenaires";

			//attendre que la fonction d'upload ait terminé puis retourner l'url pour la bd
			const photoUrl = await uploadPhoto(photo, dossier);
				return photoUrl	
		};
		let logo = await uploadLogo('logo');
		if (!logo) {
			logo = path.relative(process.cwd(), '\\img\\app\\produit_defaut.png');
		}
	
		const expiration = data.get('expiration') ? data.get('expiration') : null;

		// Vérification des valeurs de produit_id et type_id
		const produit_id = data.get('produit_id') ? data.get('produit_id') : null;
		const type_id = data.get('type_id') ? data.get('type_id') : null;
		if (produit_id !== null && type_id !== null) {
			return {
				status: 400,
				body: {
					message: 'Merci de choisir soit le produit, soit le type de produit admissible au rabais du code promo.'
				}
			};
		}
	
		try {
			const res = await nouveauCodePromo(
				data.get('nom'),
				data.get('avantage'),
				data.get('code'),
				data.get('rabais'),
				logo,
				expiration,
				data.get('categorie_id'),
				produit_id,
				type_id
			);
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
			const photo = data.get(nomFichier);
			// fait juste pousser une nouvelle photo, ne supprime pas l'ancienne
			const dossier= "partenaires";

			//attendre que la fonction d'upload ait terminé puis retourner l'url pour la bd
			const photoUrl = await uploadPhoto(photo, dossier);
				return photoUrl	
		};
		let logo = await uploadLogo('logo');
		if (!logo) {
			logo = path.relative(process.cwd(), '\\src\\lib\\img\\app\\produit_defaut.png');
		}

		const expiration = data.get('expiration') ? data.get('expiration') : null;

		// Vérification des valeurs de produit_id et type_id
		const produit_id = data.get('produit_id') ? data.get('produit_id') : null;
		const type_id = data.get('type_id') ? data.get('type_id') : null;
		if (produit_id !== null && type_id !== null) {
			return {
				status: 400,
				body: {
					message: 'Merci de choisir soit le produit, soit le type de produit admissible au rabais du code promo.'
				}
			};
		}

		try {
			const res = await modifCodePromo(data.get('id'), {
				nom: data.get('nom'),
				avantage: data.get('avantage'),
				code: data.get('code'),
				rabais: data.get('rabais'),
				logo: logo,
				expiration: expiration,
				categorie_id: data.get('categorie_id'),
				produit_id: data.get('produit_id'),
				type_id: data.get('type_id')
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
	},

	validationAchat: async ({request}) =>{
		const formData = await request.formData();
    	const json = formData.get('donnees');
    	const data = JSON.parse(json);
		try {
			const res = await transactionPanier(data);
			return res;
		} catch (error) {
			throw error
		}
	},

	activationAbonnement: async ({request}) =>{
		const formData = await request.formData();
    	const json = formData.get('id');
    	const data = JSON.parse(json);
		try {
			const res = await activeAbonnement(data);
			return res;
		} catch (error) {
			throw error
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
                            <img src="/img/app/logo.png" alt="logo SEMEQ" /> 
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
                            <img src="/img/app/logo.png" alt="logo SEMEQ" /> 
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
