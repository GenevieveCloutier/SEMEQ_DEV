import { Utilisateur } from "../models/Utilisateur.model";
import { Role } from "../models/Role.model";
import { Ville } from "../models/Ville.model";
import { error } from "@sveltejs/kit";
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { log } from "../../outils/debug";


/**
 * Récupère tous les utilisateurs, incluant leurs rôles et villes associés.
 *
 * Cette fonction retourne tous les utilisateurs présents dans la base de données,
 * avec leurs informations de rôle et de ville associées, si disponibles.
 *
 * @return {Array<Object>} resultat - Un tableau d'objets utilisateur avec les rôles et villes associés.
 *
 * @throws {Error} - Lance une erreur en cas de problème lors de la récupération.
 */
export async function findAll(){
    return  Utilisateur.findAll({
        include: [
            { model: Role, as: "role" },
            { model: Ville, as: "ville" }
        ],
    }).then(resultat => {
        if(resultat.length === 0){
            console.log("Aucun utilisateur à afficher")
        }
        return resultat.map(utilisateur => ({
            ...utilisateur.dataValues,
            role: utilisateur.role ? utilisateur.role.dataValues : null,
            ville: utilisateur.ville ? utilisateur.ville.dataValues : null,
        }));
    })
    .catch((error)=>{
        throw error;
    });
};

/**
 * Trouve un utilisateur selon les critères de recherche spécifiés.
 *
 * Cette fonction cherche un utilisateur en fonction des critères passés dans `p_where`.
 * Elle inclut également les informations du rôle associé à l'utilisateur, si disponible.
 *
 * @param {Object} p_where - Critères de recherche pour trouver un utilisateur.
 *
 * @return {Object|null} res - L'objet utilisateur avec son rôle associé, ou `null` si aucun utilisateur n'est trouvé.
 *
 * @throws {Error} - Lance une erreur en cas de problème lors de la recherche.
 */
export async function findOne(p_where){
    return await Utilisateur.findOne({ where: p_where, include: [{
        model: Role,
        as: 'role'
    }]})
    .then(res => {
        if(res)
        return {
            ...res.dataValues,
            role: res.role ? res.role.dataValues : null
        };
        else
            return null;
    }).catch((error) => {;
        throw error;
    });
}

//Faudras mettre a jour avec les autres champs une fois connus
/**
 * Crée un nouvel utilisateur avec les informations fournies.
 *
 * Cette fonction vérifie d'abord si un utilisateur avec le même courriel
 * existe déjà. Si ce n'est pas le cas, elle crée un nouvel utilisateur avec
 * les informations passées en paramètres.
 *
 * @param {string} p_nom - Nom de l'utilisateur.
 * @param {string} p_prenom - Prénom de l'utilisateur.
 * @param {number} p_role_id - ID du rôle de l'utilisateur.
 * @param {string} p_entreprise - Nom de l'entreprise de l'utilisateur (facultatif).
 * @param {string} p_neq - Numéro d'entreprise du Québec (facultatif).
 * @param {string} p_courriel - Courriel de l'utilisateur.
 * @param {string} p_pwd - Mot de passe de l'utilisateur.
 * @param {string} p_site - Site web de l'utilisateur (facultatif).
 * @param {string} p_insta - Compte Instagram de l'utilisateur (facultatif).
 * @param {string} p_tiktok - Compte TikTok de l'utilisateur (facultatif).
 * @param {string} p_domaine - Domaine de travail de l'utilisateur (facultatif).
 * @param {number} p_ville_id - ID de la ville de l'utilisateur.
 * @param {boolean} p_partage - Partage des informations autorisé ou non.
 * @param {boolean} p_affichage - Affichage des informations autorisé ou non.
 * @param {boolean} p_abonne - L'utilisateur est abonné ou non.
 * @param {Date} p_fin_abo - Date de fin d'abonnement (facultatif).
 * @param {string} p_description - Description de l'utilisateur (facultatif).
 * @param {string} p_adresse - Adresse de l'utilisateur.
 * @param {boolean} p_publique - Profil public ou privé.
 * @param {string} p_photo_1 - Photo 1 de l'utilisateur (facultatif).
 * @param {string} p_photo_2 - Photo 2 de l'utilisateur (facultatif).
 * @param {string} p_photo_3 - Photo 3 de l'utilisateur (facultatif).
 * @param {string} p_logo - Logo de l'entreprise de l'utilisateur (facultatif).
 *
 * @return {Object} resultat - Les données de l'utilisateur nouvellement créé.
 *
 * @throws {string} - "Un Compte avec ce courriel existe déjà." si le courriel est déjà utilisé.
 * @throws {Error} - Autre erreur lors de la création de l'utilisateur.
 */
export async function newUser(p_nom,p_prenom, p_role_id, p_entreprise, p_neq, p_courriel, p_pwd, p_site, p_insta, p_tiktok, p_domaine,
                                p_ville_id, p_partage, p_affichage, p_abonne, p_fin_abo, p_description, p_adresse, p_publique,
                                p_photo_1, p_photo_2, p_photo_3, p_logo) {
    try{
        const mail = await Utilisateur.findOne({where: {courriel: p_courriel}});
        if(mail)
            throw "Un Compte avec ce courriel existe déjà.";
        
         const resultat = await Utilisateur.create({
            nom:            p_nom,
            prenom:         p_prenom,
            role_id:        p_role_id,
            entreprise:     p_entreprise,
            neq:            p_neq,
            courriel:       p_courriel,
            pwd:            p_pwd,
            site:           p_site,
            insta:          p_insta,
            tiktok:         p_tiktok,
            domaine:        p_domaine,
            ville_id:       p_ville_id,
            partage:        p_partage,
            affichage:      p_affichage,
            abonne:         p_abonne,
            fin_abo:        p_fin_abo,
            description:    p_description,
            adresse:        p_adresse,
            publique:       p_publique,
            photo_1:        p_photo_1,
            photo_2:        p_photo_2,
            photo_3:        p_photo_3,
            logo:           p_logo
        });
        return resultat.dataValues;
        }catch(error){
            throw error;
        }
}

/**
 * Crée plusieurs utilisateurs avec différents rôles.
 *
 * Cette fonction crée un utilisateur admin, un exposant, un organisateur,
 * et un visiteur, en enregistrant leurs informations dans la base de données.
 * Les erreurs sont loggées pour chaque tentative de création.
 *
 * @return {void}
 *
 * @throws {Error} - Log les erreurs qui surviennent lors de la création des utilisateurs.
 */

export async function adminCreation(){
    try {
        await Utilisateur.create(
            {
                nom: 'Boutin',
                prenom: 'Nancy',
                role_id: 1,
                courriel: 'admin@admin',
                pwd: 'admin'
            }
        );
        console.log('Admin créé');
    } catch (error) {
        console.log(error);
    }
    try {
        await Utilisateur.create(
            {
                nom: 'Peuplu',
                prenom: 'Jean',
                role_id: 3,
                courriel: 'exposant@exposant',
                pwd: 'exposant'
            }
        );
        console.log('Exposant créé');
    } catch (error) {
        console.log(error);
    }
    try {
        await Utilisateur.create(
            {
                nom: 'Dinateur',
                prenom: 'Laure',
                role_id: 2,
                courriel: 'organisateur@organisateur',
                pwd: 'organisateur'
            }
        );
        console.log('Organisateur créé');
    } catch (error) {
        console.log(error);
    }
    try {
        await Utilisateur.create(
            {
                nom: 'Ramènpatoé',
                prenom: 'Lara',
                role_id: 4,
                courriel: 'visiteur@visiteur',
                pwd: 'visiteur'
            }
        );
        console.log('Visiteur créé');
    } catch (error) {
        console.log(error);
    }
}

/**
 * Supprime un utilisateur en fonction de son ID.
 *
 * Cette fonction cherche un utilisateur par son ID et le supprime s'il est trouvé.
 *
 * @param {number} p_id - L'ID de l'utilisateur à supprimer.
 *
 * @return {Object} - Un objet contenant un message confirmant la suppression de l'utilisateur.
 *
 * @throws {Error} - Lance une erreur si l'utilisateur n'est pas trouvé ou si une autre erreur survient.
 */
export async function deleteUser(p_id) {
    try {
        const user = await Utilisateur.findByPk(p_id);
        if (!user)
            throw new Error('Utilisateur non trouvé');
        await user.destroy();
        return { message: 'Succès :Utilisateur supprimé' };
    } catch (error) {
        throw error;
    }
}

/**
 * Authentifie un utilisateur en vérifiant le courriel et le mot de passe.
 *
 * Cette fonction trouve un utilisateur par son courriel, puis vérifie si le mot de passe
 * fourni correspond à celui stocké dans la base de données.
 *
 * @param {string} p_courriel - Le courriel de l'utilisateur.
 * @param {string} p_pwd - Le mot de passe fourni par l'utilisateur.
 *
 * @return {Object} user - Les données de l'utilisateur authentifié si la vérification réussit.
 *
 * @throws {Object} - Lance une erreur avec un message si l'utilisateur n'est pas trouvé ou si le mot de passe est incorrect.
 */

export async function authenticate(p_courriel, p_pwd){
    
    try{
        const user = await findOne({ courriel: p_courriel});
        
        if(!user)
            throw {message:"Utilisateur non trouvé"};

        const goodPassword = await bcrypt.compare(p_pwd, user.pwd);
        
        if(!goodPassword)
            throw {message:"Mot de passe invalide"};
        
        return user;

    }catch(error){
        throw error;
    }
}

/**
 * Génère un jeton de récupération pour un utilisateur et le stocke avec une date d'expiration.
 *
 * Cette fonction trouve l'utilisateur correspondant à l'adresse courriel fournie,
 * puis génère un jeton de récupération et l'associe avec une date d'expiration.
 *
 * @param {string} p_courriel - L'adresse courriel de l'utilisateur.
 *
 * @return {string} jeton - Le jeton de récupération généré pour l'utilisateur.
 *
 * @throws {Object} - Lance une erreur avec un message si l'utilisateur n'est pas trouvé ou en cas de problème.
 */

export async function recuperationMDP(p_courriel){
    const jeton = uuidv4();
    console.log("le jeton = ", jeton);
    const jetonExpiration = new Date(Date.now() + 3600000);
    console.log("lexpiration du jeton = ", jetonExpiration);
    try{
        const utilisateur = await Utilisateur.findOne({where: {courriel: p_courriel}});
        if(!utilisateur)
            throw {message:"Utilisateur non trouvé"};
        console.log("controller utilisateur = ", utilisateur);
        
        await utilisateur.update({
            jeton: jeton,
            jetonExpiration: jetonExpiration
        });
        return jeton;
    }catch(error){
        throw error;
    }
}

/**
 * Modifie le mot de passe d'un utilisateur en fonction de son ID.
 *
 * Cette fonction vérifie si l'utilisateur existe, puis met à jour son mot
 * de passe ainsi que les champs liés au jeton de réinitialisation.
 *
 * @param {number} p_utilisateur_id - L'ID de l'utilisateur.
 * @param {string} p_nouveau_pwd - Le nouveau mot de passe de l'utilisateur.
 *
 * @return {Object} message - Un message confirmant la modification du mot de passe.
 *
 * @throws {Error} - Lance une erreur si l'utilisateur n'est pas trouvé ou en cas de problème.
 */
export async function changementMDP(p_utilisateur_id, p_nouveau_pwd){
    log("controller changementMDP p_utilisateur_id = ", p_utilisateur_id);
    log("controller changementMDP p_nouveau_pwd = ", p_nouveau_pwd);
    try {
        const utilisateur = await Utilisateur.findByPk(p_utilisateur_id);
        if (!utilisateur)
            throw new Error('Utilisateur non trouvé');
        await utilisateur.update({
            pwd: p_nouveau_pwd,
            jeton: null,
            jetonExpiration: null
        });
        return { message: 'Mot de passe modifié' };
    } catch (error) {
        throw error;
    }
}