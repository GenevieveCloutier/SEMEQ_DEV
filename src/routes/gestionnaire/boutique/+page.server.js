import { Op } from "sequelize";
import { Produit } from "$lib/db/models/Produit.model.js"
import { Type } from "$lib/db/models/Type.model.js"


/**
 * Récupèration de tous les produits.
 *
 * @param {Object} params - Les paramètres de la requête.
 * @returns {map} - Les produits et leurs détails pour ceux qui sont disponibles.
 */
export async function load({ params }){
    const produits = await Produit.findAll({
        order: [
            ['createdAt', 'DESC'] //Nouveaux produits en premiers
        ],
        where: {
            type_id: {
                [Op.ne]: 1 // Ne correspond PAS à "Abonnement"
            }
        },
        include: [
            { model: Type, as: "type" },
        ]
    })


    
    

    let resultat = produits.map(produit => ({
        ...produit.dataValues,
        // Afficher "Non défini" si le prix est null, "Gratuit" si le prix est égal à zéro, sinon afficher le prix suivit de " $"
        prix_a: produit.prix_a === null ? "Non défini" : produit.prix_a === 0 ? "Gratuit" : `${produit.prix_a.toFixed(2)} $`,
        prix_v: produit.prix_v === null ? "Non défini" : produit.prix_v === 0 ? "Gratuit" : `${produit.prix_v.toFixed(2)} $`,
        type: produit.type ? produit.type.dataValues : null,
    }));



    return { produits: resultat }
}