import { log } from '../../outils/debug.js';
import { Blog } from '../models/Blog.model.js';

/**
 * Récupère tous les blogs de la base de données.
 *
 * @returns {Array} Un tableau d'objets représentant les blogs.
 */
export async function findAll() {
	return await Blog.findAll()
		.then((resultat) => {
			return resultat.map((blogs) => blogs.dataValues);
		})
		.catch((error) => {
			throw error;
		});
}

export async function findOne(p_where) {
	return await Blog.findOne({ where: p_where })
		.then((res) => {
			if (res) return res.dataValues;
			else return null;
		})
		.catch((error) => {
			throw error;
		});
}

export async function nouveauBillet(p_titre, p_article, p_image_1, p_image_2) {
	try {
        const doublon = await findOne({titre: p_titre});
        if (doublon) throw "Un article avec ce titre éxiste déjà";
		const resultat = await Blog.create({
			titre: p_titre,
			article: p_article,
			image_1: p_image_1,
			image_2: p_image_2
		});
		return resultat.dataValues;
	} catch (error) {
		throw error;
	}
}

export async function modifBillet(p_id, p_modifications) {
	try {
		const billet = await Blog.findByPk(p_id);
		await billet.update({
			titre: p_modifications.titre ?? billet.titre,
			article: p_modifications.article ?? billet.article,
			image_1: p_modifications.image_1 ?? billet.image_1,
			image_2: p_modifications.image_2 ?? billet.image_2,
		});
		return billet.dataValue
	} catch (error) {
		throw error;
	}
}
