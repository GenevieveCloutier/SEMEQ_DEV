import { findAll as findAllVilles} from '$lib/db/controllers/Villes.controller.js'; 
import { findAll as findAllUsers} from "$lib/db/controllers/Utilisateurs.controller";
import { redirect } from '@sveltejs/kit';

export async function load({cookies}){
    const villes = await findAllVilles();   

    // aller chercher tous les utilisateurs de la BD
    const users = await findAllUsers();
    const session = cookies.get('session');
    const role = cookies.get('role');
    //* si le cookie existe, c'est que la personne viens de la, donc on le détruit et on le laisse acceder a la page
    if ( cookies.get('origine'))
        cookies.delete('origine', {path: '/'});
    else //* si il n'existe pas on le créé avec le lien de la page actuelle
        cookies.set('origine', '/repertoire_evenements/inscription_evenement_gratuit', 
            {
                path: '/',
                httpOnly: false, //! false permet d'acceder au cookie depuis le front
                maxAge: 60 * 60 * 24
            }
        );

    //pour envoyer sur le formulaire de connexion si l'utilisateur n'a pas de compte / n'est pas connecté
    if (!role){
        redirect(302, '/connexion');
    }
    return {users: users, session: session, role:role, villes:villes}; //tous les utilisateurs

}