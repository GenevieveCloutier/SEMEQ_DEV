//Appel de tout les models pour génération des tables
import { sequelize } from '../lib/db/db.js';
import { Achat } from '../lib/db/models/Achat.model.js';
import { Blog } from '../lib/db/models/Blog.model.js';
import { Evenement } from '../lib/db/models/Evenement.model.js';
import { Panier } from '../lib/db/models/Panier.model.js';
import { Partenaire } from '../lib/db/models/Partenaire.model.js';
import { Produit } from '../lib/db/models/Produit.model.js';
import { Region } from '../lib/db/models/Region.model.js';
import { Role } from '../lib/db/models/Role.model.js';
import { Session } from '../lib/db/models/Session.model.js';
import { Type } from '../lib/db/models/Type.model.js';
import { Utilisateur } from '../lib/db/models/Utilisateur.model.js';
import { Ville } from '../lib/db/models/Ville.model.js';

//Appel des fonctions des controllers
import { findAll } from '$lib/db/controllers/Utilisateurs.controller.js';
import { newRole } from '../lib/db/controllers/Roles.controller.js';

async function initializeDatabase() {
    
    await sequelize.sync();

    const role_admin = await Role.findOne({ where: { id: 1 } });
    const role_orga = await Role.findOne({ where: { id: 2 } });
    const role_expo = await Role.findOne({ where: { id: 3 } });
    const role_visi = await Role.findOne({ where: { id: 4 } });
    
    if (!role_admin) {
        await newRole('admin');
    }
    if (!role_orga) {
        await newRole('organisateur');
    }
    if (!role_expo) {
        await newRole('exposant');
    }
    if (!role_visi) {
        await newRole('visiteur');
    }
}

await initializeDatabase();

export async function load({ params }) {


    // aller chercher tous les utilisateurs de la BD
    const users = await findAll(); 
    
    return {users: users}; //tous les utilisateurs
        
}

