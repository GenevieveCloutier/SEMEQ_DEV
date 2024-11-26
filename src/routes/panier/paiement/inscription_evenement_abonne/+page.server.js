import { findAll } from '$lib/db/controllers/Villes.controller.js';
import { error, redirect } from '@sveltejs/kit';
import { findOne } from '$lib/db/controllers/Utilisateurs.controller';

export async function load({cookies}){
    const villes = await findAll();

    const session = cookies.get('session');
    const role = cookies.get('role');
    const cookiesId = cookies.get('id');
    const utilisateur = await findOne({ id: cookiesId });

    // ne laisser passer que les organisateurs abonnés ou admin
   
    if (!role || role == 3 || role == 4){
        throw error(403, 'Seuls les membres organisateur abonnés peuvent accéder à cette page.');
    }

    if(role == 2 && utilisateur.abonne != true){
        throw error(403, 'Seuls les organisateur abonnés peuvent accéder à cette page.');
    }

    return {session: session, role:role, villes:villes, utilisateur:utilisateur}; //tous les utilisateurs
}