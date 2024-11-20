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
        log('plop',)
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