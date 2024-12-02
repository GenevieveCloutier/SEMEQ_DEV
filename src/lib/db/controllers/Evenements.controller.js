import { Op } from 'sequelize';
import { Evenement } from '../models/Evenement.model';
import { Utilisateur } from '../models/Utilisateur.model';
import { Ville } from '../models/Ville.model';
import { Region } from '../models/Region.model';
import { log } from '../../outils/debug';

/**
 * Récupère tous les événements de la base de données.
 *
 * Inclut les informations sur l'utilisateur associé et la ville,
 * ainsi que la région de la ville.
 * Si aucun événement n'est trouvé, un message est affiché.
 *
 * @returns {Array} Un tableau d'objets représentant les événements.
 */
export async function findAll() {
	return await Evenement.findAll({
		include: [
			{ model: Utilisateur, as: 'utilisateur' },
			{ model: Ville, as: 'ville', include: [{ model: Region, as: 'region' }] }
		]
	})
		.then((resultat) => {
			if (resultat.length === 0) {
				console.log('Aucun evenement à afficher');
			}
			return resultat.map((evenement) => ({
				...evenement.dataValues,
				utilisateur: evenement.utilisateur ? evenement.utilisateur.dataValues : null,
				ville: evenement.ville
					? {
							...evenement.ville.dataValues,
							region: evenement.ville.region ? evenement.ville.region.dataValues : null
						}
					: null
			}));
		})
		.catch((error) => {
			throw error;
		});
}

export async function findAllWhere(p_where) {
	return await Evenement.findAll({
		where: p_where,
		include: [
			{ model: Utilisateur, as: 'utilisateur' },
			{ model: Ville, as: 'ville', include: [{ model: Region, as: 'region' }] }
		]
	})
		.then((resultat) => {
			if (resultat.length === 0) {
				console.log('Aucun evenement à afficher');
			}
			return resultat.map((evenement) => ({
				...evenement.dataValues,
				utilisateur: evenement.utilisateur ? evenement.utilisateur.dataValues : null,
				ville: evenement.ville
					? {
							...evenement.ville.dataValues,
							region: evenement.ville.region ? evenement.ville.region.dataValues : null
						}
					: null
			}));
		})
		.catch((error) => {
			throw error;
		});
}

export async function findOne(p_where) {
	return await Evenement.findOne({
		where: p_where,
		include: [
			{
				model: Utilisateur,
				as: 'utilisateur'
			},
			{
				model: Ville,
				as: 'ville'
			}
		]
	})
		.then((res) => {
			if (res)
				return {
					...res.dataValues,
					utilisateur: res.utilisateur ? res.utilisateur.dataValues : null,
					ville: res.ville ? res.ville.dataValues : null
				};
			else return null;
		})
		.catch((error) => {
			throw error;
		});
}

/**
 * Crée un nouvel événement avec les informations fournies.
 *
 * Vérifie d'abord si un événement similaire existe déjà.
 * Si c'est le cas, une erreur est levée.
 * Sinon, l'événement est créé dans la base de données.
 *
 * @param {string} p_nom - Le nom de l'événement.
 * @param {number} p_utilisateur_id - L'ID de l'utilisateur créateur de l'événement.
 * @param {string} p_contact - Le contact de l'événement.
 * @param {string} p_entreprise - Le nom de l'entreprise organisatrice.
 * @param {string} p_debut_even - La date de début de l'événement.
 * @param {string} p_fin_even - La date de fin de l'événement.
 * @param {string} p_horaire_even - L'horaire de l'événement.
 * @param {string} p_debut_cand - La date de début de la période de candidature.
 * @param {string} p_fin_cand - La date de fin de la période de candidature.
 * @param {string} p_fondation - Le nom de la fondation organisatrice.
 * @param {number} p_nb_visiteur - Le nombre prévu de visiteurs.
 * @param {number} p_nb_expo - Le nombre d'exposants.
 * @param {string} p_profil - Le profil de visiteurs attendus.
 * @param {string} p_site - L'URL du site de l'événement.
 * @param {string} p_fb_even - L'URL de la page Facebook de l'événement.
 * @param {string} p_insta_even - L'URL de la page instagram de l'événement.
 * @param {string} p_tiktok_even - L'URL de la page Tiktok de l'événement.
 * @param {string} p_courriel - L'adresse courriel de l'événement.
 * @param {number} p_ville_id - L'ID de la ville de l'événement.
 * @param {string} p_adresse - L'adresse de l'événement.
 * @param {string} p_code_postal - Le code postal de l'événement.
 * @param {string} p_telephone - Le numéro de téléphone de l'événement.
 * @param {string} p_emplacement - L'emplacement spécifique de l'événement.
 * @param {string} p_type - Le type de l'événement.
 * @param {string} p_type_autre - Autre type d'événement, si applicable.
 * @param {string} p_form_cand - Le formulaire de candidature.
 * @param {string} p_verification - Le processus de vérification.
 * @param {string} p_verification_autre - Autre méthode de vérification, si applicable.
 * @param {string} p_selection - La méthode de sélection.
 * @param {number} p_limite - La limite de participants.
 * @param {string} p_description - La description de l'événement.
 * @param {string} p_photo_1 - L'URL de la première photo de l'événement.
 * @param {string} p_photo_2 - L'URL de la deuxième photo de l'événement.
 * @param {string} p_photo_3 - L'URL de la troisième photo de l'événement.
 * @param {boolean} p_approuve - Statut d'approbation de l'événement.
 *
 * @returns {Object} Les valeurs de l'événement créé.
 */
export async function creationEvenement(
	p_nom,
	p_utilisateur_id,
	p_contact,
	p_entreprise,
	p_debut_even,
	p_fin_even,
	p_horaire_even,
	p_debut_cand,
	p_fin_cand,
	p_fondation,
	p_nb_visiteur,
	p_nb_expo,
	p_profil,
	p_site,
	p_fb_even,
	p_insta_even,
	p_tiktok_even,
	p_courriel,
	p_ville_id,
	p_adresse,
	p_code_postal,
	p_telephone,
	p_emplacement,
	p_type,
	p_type_autre,
	p_form_cand,
	p_verification,
	p_verification_autre,
	p_selection,
	p_limite,
	p_description,
	p_photo_1,
	p_photo_2,
	p_photo_3,
	p_approuve
) {
	try {
		const doublon = await Evenement.findAll({
			where: {
				nom: p_nom,
				ville_id: p_ville_id,
				[Op.or]: [
					{ debut_even: new Date(p_debut_even).toISOString() },
					{ fin_even: new Date(p_fin_even).toISOString() }
				]
			}
		});
		if (doublon.length > 0) {
			throw 'Un événement similaire existe déjà';
		}

		const resultat = await Evenement.create({
			nom: p_nom,
			utilisateur_id: p_utilisateur_id,
			entreprise: p_entreprise,
			contact: p_contact,
			debut_even: p_debut_even,
			fin_even: p_fin_even,
			horaire_even: p_horaire_even,
			debut_cand: p_debut_cand,
			fin_cand: p_fin_cand,
			fondation: p_fondation,
			nb_visiteur: p_nb_visiteur,
			nb_expo: p_nb_expo,
			profil: p_profil,
			site: p_site,
			fb_even: p_fb_even,
			insta_even: p_insta_even,
			tiktok_even: p_tiktok_even,
			courriel: p_courriel,
			ville_id: p_ville_id,
			adresse: p_adresse,
			code_postal: p_code_postal,
			telephone: p_telephone,
			emplacement: p_emplacement,
			type: p_type,
			type_autre: p_type_autre,
			form_cand: p_form_cand,
			verification_autre: p_verification_autre,
			verification: p_verification,
			selection: p_selection,
			limite: p_limite,
			description: p_description,
			photo_1: p_photo_1,
			photo_2: p_photo_2,
			photo_3: p_photo_3,
			approuve: p_approuve
		});
		return resultat.dataValues;
	} catch (error) {
		throw error;
	}
}

export async function suppressionEvenement(p_id) {
	try {
		const evenement = await Evenement.findByPk(p_id);
		if (!evenement) throw new Error('Evénement non trouvé');
		await evenement.destroy();
		return {
			status: 200,
			body: {
				message: 'Evénement supprimé.',
				utilisateur: evenement.utilisateur_id
			}
		};
	} catch (error) {
		throw error;
	}
}

export async function modificationEvenement(p_even_id, p_modifications) {
	try {
		const doublon = await Evenement.findAll({
			where: {
				nom: p_modifications.nom,
				ville_id: p_modifications.ville_id,
				[Op.or]: [
					{ debut_even: new Date(p_modifications.debut_even).toISOString() },
					{ fin_even: new Date(p_modifications.fin_even).toISOString() }
				],
				id: { [Op.ne]: p_even_id }
			}
		});
		if (doublon.length > 0) {
			throw 'Un événement similaire existe déjà';
		}
		const evenement = await Evenement.findByPk(p_even_id);
		if (!evenement) throw new Error('Evénement non trouvé');
		await evenement.update({
			nom: p_modifications.nom ?? evenement.nom,
			contact: p_modifications.contact ?? evenement.contact,
			entreprise: p_modifications.entreprise ?? evenement.entreprise,
			debut_even: p_modifications.debut_even ?? evenement.debut_even,
			fin_even: p_modifications.fin_even ?? evenement.fin_even,
			horaire_even: p_modifications.horaire_even ?? evenement.horaire_even,
			debut_cand: p_modifications.debut_cand ?? evenement.debut_cand,
			fin_cand: p_modifications.fin_cand ?? evenement.fin_cand,
			fondation: p_modifications.fondation ?? evenement.fondation,
			nb_visiteur: p_modifications.nb_visiteur ?? evenement.nb_visiteur,
			nb_expo: p_modifications.nb_expo ?? evenement.nb_expo,
			profil: p_modifications.profil ?? evenement.profil,
			site: p_modifications.site ?? evenement.site,
			fb_even: p_modifications.fb_even ?? evenement.fb_even,
			tiktok_even: p_modifications.tiktok_even ?? evenement.tiktok_even,
			insta_even: p_modifications.insta_even ?? evenement.insta_even,
			telephone: p_modifications.telephone ?? evenement.telephone,
			code_postal: p_modifications.code_postal ?? evenement.code_postal,
			courriel: p_modifications.courriel ?? evenement.courriel,
			ville_id: p_modifications.ville_id ?? evenement.ville_id,
			adresse: p_modifications.adresse ?? evenement.adresse,
			emplacement: p_modifications.emplacement ?? evenement.emplacement,
			type: p_modifications.type ?? evenement.type,
			type_autre: p_modifications.type_autre ?? evenement.type_autre,
			form_cand: p_modifications.form_cand ?? evenement.form_cand,
			verification: p_modifications.verification ?? evenement.verification,
			verification_autre: p_modifications.verification_autre ?? evenement.verification_autre,
			selection: p_modifications.selection,
			limite: p_modifications.limite,
			description: p_modifications.description ?? evenement.description,
			photo_1: p_modifications.photo_1 ?? evenement.photo_1,
			photo_2: p_modifications.photo_2 ?? evenement.photo_2,
			photo_3: p_modifications.photo_3 ?? evenement.photo_3,
			approuve: p_modifications.approuve ?? evenement.approuve
		});
		return evenement.dataValues;
	} catch (error) {
		throw error;
	}
}
