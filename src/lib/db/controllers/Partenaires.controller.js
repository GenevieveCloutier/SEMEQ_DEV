import { Partenaire } from "../models/Partenaire.model";
import { Categorie } from "../models/Categorie.model";
import { error } from "@sveltejs/kit";

/**
 * Récupère tous les partenaires de la base de données.
 * 
 * Retourne un tableau contenant les valeurs de chaque partenaire trouvé.
 * 
 * @returns {Array<Object>} Un tableau des valeurs de chaque partenaire.
 */
export async function findAll(){
    return await Partenaire.findAll({
        include: [
            { model: Categorie, as: "categorie" },
        ],
    }).then(resultat => {
        if(resultat.length === 0){
            console.log("Aucun partenaire à afficher")
        }
        return resultat.map(partenaire => ({
            ...partenaire.dataValues,
            type: partenaire.type ? partenaire.type.dataValues : null
        }));
    })
    .catch((error)=>{
        throw error;
    });
};


/**
 * Trouve un partenaire selon les critères de recherche spécifiés.
 *
 * Cette fonction cherche un partenaire en fonction des critères passés dans `p_where`.
 * Elle inclut également les informations de la catégorie associée au partenaire, si disponible.
 *
 * @param {Object} p_where - Critères de recherche pour trouver un partenaire.
 *
 * @return {Object|null} res - L'objet partenaire avec sa catégorie associée, ou `null` si aucun partenaire n'est trouvé.
 *
 * @throws {Error} - Lance une erreur en cas de problème lors de la recherche.
 */
export async function findOne(p_where){
    return await Partenaire.findOne({ where: p_where, include: [{
        model: Categorie,
        as: 'categorie'
    }]})
    .then(res => {
        if(res)
        return {
            ...res.dataValues,
            type: res.categorie ? res.categorie.dataValues : null
        };
        else
            return null;
    }).catch((error) => {;
        throw error;
    });
}


export async function nouveauCodePromo(p_nom, p_avantage, p_code, p_logo, p_expiration, p_categorie) {
	try {
        const doublonPartenaire = await findOne({nom: p_nom});
        const doublonCode = await findOne({code: p_code});
        if (doublonPartenaire && doublonCode) throw "Ce code promo existe déjà pour ce partenaire.";
		const resultat = await Partenaire.create({
			nom: p_nom,
			avantage: p_avantage,
			code: p_code,
			logo: p_logo,
            expiration: p_expiration,
			categorie: p_categorie
		});
		return resultat.dataValues;
	} catch (error) {
		throw error;
	}
}

export async function modifCodePromo(p_id, p_modifications) {
	try {
		const partenaire = await Partenaire.findByPk(p_id);
		await partenaire.update({
			nom: p_modifications.nom ?? partenaire.nom,
			avantage: p_modifications.avantage ?? partenaire.avantage,
			code: p_modifications.code ?? partenaire.code,
			logo: p_modifications.logo ?? partenaire.logo,
            expiration: p_modifications.expiration ?? partenaire.expiration,
			categorie: p_modifications.categorie ?? partenaire.categorie,
		});
		return partenaire.dataValue
	} catch (error) {
		throw error;
	}
}

export async function suppressionCodePromo(p_id) {
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