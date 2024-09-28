

 import { findAll } from '$lib/db/controllers/Utilisateurs.controller.js'

export async function load({ params }) {

    // aller chercher tous les utilisateurs de la BD
    const users = await findAll(); 


    return { 
        users: users,  //tous les utilisateurs

    };
}
