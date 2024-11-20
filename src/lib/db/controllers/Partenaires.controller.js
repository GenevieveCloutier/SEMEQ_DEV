import { Partenaire } from "../models/Partenaire.model";

/**
 * Récupère tous les partenaires de la base de données.
 * 
 * Retourne un tableau contenant les valeurs de chaque partenaire trouvé.
 * 
 * @returns {Array<Object>} Un tableau des valeurs de chaque partenaire.
 */
export async function findAll() {
	return await Partenaire.findAll()
		.then((resultat) => {
			return resultat.map((partenaires) => partenaires.dataValues);
		})
		.catch((error) => {
			throw error;
		});
}

export async function findOne(p_where) {
	return await Partenaire.findOne({ where: p_where })
		.then((res) => {
			if (res) return res.dataValues;
			else return null;
		})
		.catch((error) => {
			throw error;
		});
}

export async function nouveauPartenaire(p_nom, p_avantage, p_code, p_logo, p_expiration) {
	try {
        const doublon = await findOne({code: p_code});
        if (doublon) throw "Ce code promo existe déjà.";
		const resultat = await Partenaire.create({
			nom: p_nom,
			avantage: p_avantage,
			code: p_code,
			logo: p_logo,
            expiration: p_expiration
		});
		return resultat.dataValues;
	} catch (error) {
		throw error;
	}
}

export async function modifPartenaire(p_id, p_modifications) {
	try {
		const partenaire = await Partenaire.findByPk(p_id);
		await partenaire.update({
			nom: p_modifications.nom ?? partenaire.nom,
			avantage: p_modifications.avantage ?? partenaire.avantage,
			code: p_modifications.code ?? partenaire.code,
			logo: p_modifications.logo ?? partenaire.logo,
            expiration: p_modifications.expiration ?? partenaire.expiration,
		});
		return partenaire.dataValue
	} catch (error) {
		throw error;
	}
}

export async function suppressionPartenaire(p_id) {
	try {
		const partenaire = await Partenaire.findByPk(p_id);
		if (!partenaire) throw new Error('Code promo non trouvé.');
		await partenaire.destroy();
		return {
			status: 200,
			body: {
				message: 'Partenaire supprimé.'
			}
		};
	} catch (error) {
		throw error;
	}
}