import { Panier } from "../models/Panier.model";
import { Utilisateur } from "../models/Utilisateur.model";
import { Produit } from "../models/Produit.model";

/**
 * Récupère tous les paniers de la base de données en incluant les informations de l'utilisateur et du produit associés.
 * 
 * Retourne un tableau contenant les valeurs de chaque panier ainsi que celles de l'utilisateur et du produit associés.
 * 
 * @returns {Array<Object>} Un tableau des valeurs de chaque panier et des données de l'utilisateur et du produit associés.
 */
export async function findAll(){
    return await Panier.findAll({
        include: [
            { model: Utilisateur, as: "utilisateur" },
            { model: Produit, as: "produit" }
        ],
    }).then(resultat => {
        if(resultat.length === 0){
            console.log("Aucun panier à afficher")
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