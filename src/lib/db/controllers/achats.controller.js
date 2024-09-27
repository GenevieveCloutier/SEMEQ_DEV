import { Achats } from "../models/achats.model.js";
import { Utilisateurs } from "../models/utilisateurs.model.js";
import { Produits } from "../models/produits.model.js";
/**
 * 
 *
 * @export
 * @async
 * @returns {Object}
 */
export async function findAll(){
    return await Achats.findAll({
        include: [
            { model: Utilisateurs, as: "utilisateur" },
            { model: Produits, as: "produit" }
        ],
    }).then(resultat => {
        if(resultat.length === 0){
            console.log("Pas de résultat à afficher")
        }
        return resultat.map(achat => ({
            ...achat.dataValues,
            utilisateur: achat.utilisateur ? achat.utilisateur.dataValues : null,
            produit: achat.produit ? achat.produit.dataValues : null,
        }));
    })
    .catch((error)=>{
        throw error;
    });
};