import { error } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { Panier } from '$lib/db/models/Panier.model';
import { Utilisateur } from "$lib/db/models/Utilisateur.model";
import { Produit } from "$lib/db/models/Produit.model";
import { Type } from "$lib/db/models/Type.model";
import { findOne } from '$lib/db/controllers/Utilisateurs.controller';
import { log } from '../../lib/outils/debug';

/**
 * Charge tous les paniers de l'utilisateur avec les détails des produits, incluant les types.
 * @param {Object} cookies - Les cookies de la requête.
 * @returns {Object} - Les éléments des paniers avec les détails des produits.
 */
export async function load({ cookies }){
    const session = cookies.get('session');
    if (!session) {
        throw redirect(307, '/login');
    }
    const sessionId = cookies.get('id');
    const utilisateur = await findOne({ id: sessionId });

    const paniers = await Panier.findAll({
        where: { utilisateur_id: sessionId },
        include: [
            { model: Utilisateur, as: "utilisateur" },
            { model: Produit, as: "produit",
                include: [
                  { model: Type, as: "type" }
                ]
            }
        ]
    })

    let resultat = paniers.map(panier => ({
        ...panier.dataValues,
        utilisateur: panier.utilisateur ? panier.utilisateur.dataValues : null,
        produit: panier.produit ? {
            ...panier.produit.dataValues,
            type: panier.produit.type ? panier.produit.type.dataValues : null
        } : null
    }));

    // log("dans le load le paniers = ", resultat)

    return { paniers: resultat, utilisateur }
}