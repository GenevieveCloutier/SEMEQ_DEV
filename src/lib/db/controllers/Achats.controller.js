import { Achat } from "../models/Achat.model.js";
import { Utilisateur } from "../models/Utilisateur.model.js";
import { Produit } from "../models/Produit.model.js";

/**
 * Récupère tous les achats de la base de données.
 * 
 * @returns {Array} Un tableau d'objets représentant les achats, incluant les utilisateurs et les produits associés.
 */
export async function findAll(){
    return await Achat.findAll({
        include: [
            { model: Utilisateur, as: "utilisateur" },
            { model: Produit, as: "produit" }
        ],
    }).then(resultat => {
        if(resultat.length === 0){
            console.log("Aucun achat à afficher")
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