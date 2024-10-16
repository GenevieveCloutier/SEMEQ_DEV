import { findAll } from '$lib/db/controllers/Villes.controller.js';
import { redirect } from '@sveltejs/kit';

export async function load({cookies}){
    const villes = await findAll();

    //pour envoyer sur le formulaire de connexion si l'utilisateur n'a pas de rôle, ou si le rôle est 
    //compte gratuit ou compte exposant (laisser passer gestionnaire et organisateur)
    //ajouter l'autorisation pour l'abonnement si il est actif ou non
    const session = cookies.get('session');
    const role = cookies.get('role');

    
   
    if (!role || role == 3 || role == 4){
        redirect(302, '/connexion');
    }
 
    return {session: session, role:role, villes:villes}; //tous les utilisateurs
}