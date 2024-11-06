import { redirect } from '@sveltejs/kit';
import { Panier } from "$lib/db/models/Panier.model.js"
import { Produit } from "$lib/db/models/Produit.model.js"
import { Type } from "$lib/db/models/Type.model";
import { Utilisateur } from "$lib/db/models/Produit.model.js"
import { findOne } from '$lib/db/controllers/Utilisateurs.controller';
import { findAllInCart } from '$lib/db/controllers/Paniers.controller';

/**
 * Charge les éléments du panier de l'utilisateur avec les détails du film.
 * @param {Object} params - Les paramètres de la requête.
 * @param {Object} cookies - Les cookies de la requête.
 * @returns {Object} - Les éléments du panier avec les détails du film.
 */
export async function load({ params, cookies }){
    const session = cookies.get('session');
    if (!session) {
        throw redirect(307, '/login');
    }
    const sessionId = cookies.get('id');
    const utilisateur = await findOne({ id: sessionId });

    const paniers = await findAllInCart({ utilisateur_id: sessionId });

    return { paniers:paniers, utilisateur }
}