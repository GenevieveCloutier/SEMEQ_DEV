import { Panier } from "../models/Panier.model";
import { Utilisateur } from "../models/Utilisateur.model";
import { Produit } from "../models/Produit.model";

/**
 * 
 *
 * @export
 * @async
 * @returns {Object}
 */
export async function findAll(){
    return await Panier.findAll({
        include: [
            { model: Utilisateur, as: "utilisateur" },
            { model: Produit, as: "produit" }
        ],
    }).then(resultat => {
        if(resultat.length === 0){
            console.log("Pas de résultat à afficher")
        }
        return resultat.map(panier => ({
            ...panier.dataValues,
            utilisateur: panier.utilisateur ? panier.utilisateur.dataValues : null,
            produit: panier.produit ? panier.produit.dataValues : null
        }));
    })
    .catch((error)=>{
        throw error;
    });
};