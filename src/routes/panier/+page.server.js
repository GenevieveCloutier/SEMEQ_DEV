import { redirect } from '@sveltejs/kit';
import { findOne } from '$lib/db/controllers/Utilisateurs.controller';
import { findAllInCart } from '$lib/db/controllers/Paniers.controller';

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

    const paniers = await findAllInCart({ utilisateur_id: sessionId });

    return { paniers, utilisateur }
}