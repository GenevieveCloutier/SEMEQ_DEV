import { log } from "../../outils/debug.js";
import { Produit } from "../models/Produit.model.js";
import { Type } from "../models/Type.model.js";
import { error } from "@sveltejs/kit";

/**
 * Récupère tous les produits de la base de données en incluant les informations de leur type.
 * 
 * Retourne un tableau contenant les valeurs de chaque produit ainsi que celles de son type associé.
 * 
 * @returns {Array<Object>} Un tableau des valeurs de chaque produit et des données de son type associé.
 */
export async function findAll(){
    return await Produit.findAll({
        include: [
            { model: Type, as: "type" },
        ],
    }).then(resultat => {
        if(resultat.length === 0){
            console.log("Aucun produit à afficher")
        }
        return resultat.map(produit => ({
            ...produit.dataValues,
            type: produit.type ? produit.type.dataValues : null
        }));
    })
    .catch((error)=>{
        throw error;
    });
};

/**
 * Trouve un produit selon les critères de recherche spécifiés.
 *
 * Cette fonction cherche un produit en fonction des critères passés dans `p_where`.
 * Elle inclut également les informations du type associé au produit, si disponible.
 *
 * @param {Object} p_where - Critères de recherche pour trouver un produit.
 *
 * @return {Object|null} res - L'objet produit avec son type associé, ou `null` si aucun produit n'est trouvé.
 *
 * @throws {Error} - Lance une erreur en cas de problème lors de la recherche.
 */
export async function findOne(p_where){
    return await Produit.findOne({ where: p_where, include: [{
        model: Type,
        as: 'type'
    }]})
    .then(res => {
        if(res)
        return {
            ...res.dataValues,
            type: res.type ? res.type.dataValues : null
        };
        else
            return null;
    }).catch((error) => {;
        throw error;
    });
}


export async function suppressionProduit(p_id){
    try {
        const produit = await Produit.findByPk(p_id);
        if(!produit) throw new error ('Produit non trouvé');
        await produit.destroy();
        return {
			status: 200,
			body: {
				message: 'Produit supprimé.',
			}
		};
    } catch (error) {
        
    }
}


export async function nouveauProduit(p_nom, p_type_id, p_desc, p_url, p_prix_v, p_prix_a, p_photo, p_dispo) {
	try {
        const doublon = await findOne({nom: p_nom});
        if (doublon) throw "Un produit avec ce nom éxiste déjà";
		const resultat = await Produit.create({
			nom: p_nom,
			type_id: p_type_id,
			desc: p_desc,
            url: p_url,
			prix_v: p_prix_v,
            prix_a: p_prix_a,
            photo: p_photo,
            dispo: p_dispo
		});
		return resultat.dataValues;
	} catch (error) {
		throw error;
	}
}

export async function modifProduit(p_id, p_modifications) {
	try {
		const produit = await Produit.findByPk(p_id);
		await produit.update({
			nom: p_modifications.nom ?? produit.nom,
			type_id: p_modifications.type_id ?? produit.type_id,
			desc: p_modifications.desc ?? produit.desc,
            url: p_modifications.url ?? produit.url,
			prix_v: p_modifications.prix_v ?? produit.prix_v,
			prix_a: p_modifications.prix_a ?? produit.prix_a,
			photo: p_modifications.photo ?? produit.photo,
			dispo: p_modifications.dispo,
		});
		return produit.dataValue
	} catch (error) {
        log("erreur dans le controler = ", error)
		throw error;
	}
}

