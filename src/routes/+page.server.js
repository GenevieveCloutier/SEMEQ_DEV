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
import { Categorie } from '../lib/db/models/Categorie.model.js';

//Appel des fonctions des controllers
import { findAll } from '$lib/db/controllers/Utilisateurs.controller.js';
import { newRole } from '../lib/db/controllers/Roles.controller.js';
import { ajoutRegions } from '../lib/db/controllers/Regions.controller.js';
import { adminCreation } from '../lib/db/controllers/Utilisateurs.controller.js';
import { newType } from '../lib/db/controllers/Types.controller.js';
import { newCategorie } from '../lib/db/controllers/Categories.controller.js';

//Appel de fonctions externe
import { redirect } from '@sveltejs/kit';
import { nouveauBillet } from '../lib/db/controllers/Blogs.controller.js';

/**
 * Initialise la base de données en synchronisant les modèles Sequelize.
 * Crée les rôles par défaut si la base de données est vide.
 * Crée les régions par défaut si la base de données est vide.
 * Crée des utilisateurs de tests si administrateur inexistant.
 */
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
    //* J'ai du ajouter un setTimeout parce que le script allais trop vite et créait
    //* les utilisateurs avant d'avoir fini d'ajouter les villes
    //* et vu qu'on as besoin de leur attribuer des villes...
    if(!admin){
        setTimeout(() => {
           adminCreation(); 
        }, 5000);
    }
//Création des types si la bd est vide.    
    const type_abonnement = await Type.findOne({ where: { id: 1 } });
    if (!type_abonnement){
        await newType('Abonnement');
        await newType('Formation');
        await newType('Outil');
    }
//Création des categories si la bd est vide.    
    const categories_partenaires = await Categorie.findOne({ where: { id: 1 } });
    if (!categories_partenaires){
        await newCategorie('Rabais boutique SÉMEQ');
        await newCategorie('Décoration / Design / Accessoires');
        await newCategorie('Emballages / Packaging / Sacs');
        await newCategorie('Graphisme');
        await newCategorie('Impressions - Produits et services');
        await newCategorie('Maquillages');
        await newCategorie('Marketing web');
        await newCategorie('Présentoirs / Ébénisterie');
        await newCategorie('Vidéos et montage - Création de contenu');
    }
}

await initializeDatabase();

export async function load({ params, cookies }) {
    // aller chercher tous les utilisateurs de la BD
    const users = await findAll();
    const session = cookies.get('session');
    const role = cookies.get('role');
 
    return {users: users, session: session, role:role}; //tous les utilisateurs
}
