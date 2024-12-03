import { findAll } from '$lib/db/controllers/Villes.controller.js'; "$lib/db/controllers/Utilisateurs.controller";
import { redirect } from '@sveltejs/kit';
import { findOne } from '../../../../lib/db/controllers/Utilisateurs.controller.js';
import { log } from '../../../../lib/outils/debug.js';
import { findAllWhere } from '../../../../lib/db/controllers/Evenements.controller.js';

export async function load({cookies}){
    const villes = await findAll();
    const role = cookies.get('role');

    if (!role || role == 3 || role == 4){
        redirect(302, '/connexion');
    }
    //Sécurité pour éviter d'y accéder par l'url si plus de 5 événements abonné
    const evenementsPayant = await findAllWhere({utilisateur_id: cookies.get('id'), payant: true});
    if(evenementsPayant.length >= 5)
        redirect(302,'/repertoire_evenements/inscription_evenement_gratuit');
 
    return {villes:villes};
}