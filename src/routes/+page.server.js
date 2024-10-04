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
import { ajoutRegions } from '../lib/db/controllers/Regions.controller.js';
import { ajoutVilles } from '../lib/db/controllers/Villes.controller.js';
import { adminCreation } from '../lib/db/controllers/Utilisateurs.controller.js';

import csv from 'csvtojson';

async function initializeDatabase() {
    
    await sequelize.sync();
//Création des roles si la bd est vide.    
    const role_admin = await Role.findOne({ where: { id: 1 } });
    if (!role_admin){
        await newRole('admin');
        await newRole('organisateur');
        await newRole('exposant');
        await newRole('visiteur');
    }
//Création des regions si la bd est vide.
    const region = await Region.findOne({ where: { id: 1 } });
    if (!region){
        ajoutRegions();
    }
//Création de l'admin si inexistant
    const admin = await Utilisateur.findByPk(1);
    if(!admin)
        adminCreation();
}




await initializeDatabase();




export async function load({ params, cookies }) {


    // aller chercher tous les utilisateurs de la BD
    const users = await findAll();
    const session = cookies.get('session');
    
    
    return {users: users, session: session}; //tous les utilisateurs
        
}

