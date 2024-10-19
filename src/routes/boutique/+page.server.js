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
        where: { dispo: 1 }, //true
        include: [
            { model: Type, as: "type" },
        ]
    })

    let resultat = produits.map(produit => ({
        ...produit.dataValues,
        type: produit.type ? produit.type.dataValues : null,
    }));

    return { produits: resultat }
}