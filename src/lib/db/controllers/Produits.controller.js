import { Produit } from "../models/Produit.model.js";
import { Type } from "../models/Type.model.js";

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