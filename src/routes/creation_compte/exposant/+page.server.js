import { findAll } from '$lib/db/controllers/Villes.controller.js'; "$lib/db/controllers/Utilisateurs.controller";
import { redirect } from '@sveltejs/kit';

export async function load({cookies}){
    const villes = await findAll();   

    // Aller chercher tous les utilisateurs de la BD
    const users = await findAll();
    const session = cookies.get('session');
    const role = cookies.get('role');

    if(session)
        redirect(301,'/panier/paiement_abonnement');

    
    return {users: users, session: session, role:role, villes:villes};
}