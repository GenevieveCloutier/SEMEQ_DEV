import { findAll as findAllVilles} from '$lib/db/controllers/Villes.controller.js'; 
import { findAll as findAllUsers} from "$lib/db/controllers/Utilisateurs.controller";
import { redirect } from '@sveltejs/kit';

export async function load({cookies}){
    const villes = await findAllVilles();   

    // aller chercher tous les utilisateurs de la BD
    const users = await findAllUsers();
    const session = cookies.get('session');
    const role = cookies.get('role');

    //pour envoyer sur le formulaire de connexion si l'utilisateur n'a pas de compte / n'est pas connecté
    if (!role){
        redirect(302, '/connexion');
    }
    return {users: users, session: session, role:role, villes:villes}; //tous les utilisateurs

}