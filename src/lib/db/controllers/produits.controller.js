import { Produits } from "../models/produits.model.js";
import { Types } from "../models/types.model.js";
/**
 * 
 *
 * @export
 * @async
 * @returns {Object}
 */
export async function findAll(){
    return await Produits.findAll({
        include: [
            { model: Types, as: "type" },
        ],
    }).then(resultat => {
        if(resultat.length === 0){
            console.log("Pas de résultat à afficher")
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