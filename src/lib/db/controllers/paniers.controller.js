import { Paniers } from "../models/paniers.model";
import { Utilisateurs } from "../models/utilisateurs.model";
import { Produits } from "../models/produits.model";

/**
 * 
 *
 * @export
 * @async
 * @returns {Object}
 */
export async function findAll(){
    return await Paniers.findAll({
        include: [
            { model: Utilisateurs, as: "utilisateur" },
            { model: Produits, as: "produit" }
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