import { Achat } from "../models/Achat.model.js";
import { Utilisateur } from "../models/Utilisateur.model.js";
import { Produit } from "../models/Produit.model.js";
/**
 * 
 *
 * @export
 * @async
 * @returns {Object}
 */
export async function findAll(){
    return await Achat.findAll({
        include: [
            { model: Utilisateur, as: "utilisateur" },
            { model: Produit, as: "produit" }
        ],
    }).then(resultat => {
        if(resultat.length === 0){
            console.log("Pas de résultat à afficher")
        }
        return resultat.map(achats => ({
            ...achats.dataValues,
            utilisateur: achats.utilisateur ? achats.utilisateur.dataValues : null,
            produit: achats.produit ? achats.produit.dataValues : null,
        }));
    })
    .catch((error)=>{
        throw error;
    });
}; 