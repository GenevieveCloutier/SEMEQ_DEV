 
 import { findAll } from '$lib/db/controllers/utilisateurs.controller.js'
 //import { findAll } from '$lib/db/controllers/blogs.controller.js';
 //import { findAll } from "../lib/db/controllers/partenaires.controller";
 //import { findAll } from "../lib/db/controllers/types.controller";
 //import { findAll } from "../lib/db/controllers/produits.controller";
 //import { findAll } from "../lib/db/controllers/paniers.controller";
 //import { findAll } from "../lib/db/controllers/evenements.controller";
 //import { findAll } from "../lib/db/controllers/achats.controller";

export async function load({ params }) {

    // aller chercher tous les utilisateurs de la BD
    const users = await findAll(); 


    return { 
        users: users,  //tous les utilisateurs

    };
}
