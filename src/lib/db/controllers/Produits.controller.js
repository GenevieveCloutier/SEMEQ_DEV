import { Produit } from "../models/Produit.model.js";
import { Type } from "../models/Type.model.js";
/**
 * 
 *
 * @export
 * @async
 * @returns {Object}
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