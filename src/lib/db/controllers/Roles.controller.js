import { Role } from "../models/Role.model";


/**
 * Crée un nouveau rôle avec le nom spécifié.
 * 
 * Retourne les valeurs du rôle créé.
 * 
 * @param {string} p_nom - Le nom du rôle à créer.
 * 
 * @returns {Object} Les valeurs du rôle créé.
 */
export async function newRole(p_nom){
    Role.create({
        nom: p_nom
    })
    .then(resultat => {
        return resultat.dataValues;
    })
    .catch((error)=>{
        throw error;
    });
}

/**
 * Récupère tous les rôles de la base de données.
 * 
 * Retourne un tableau contenant les valeurs de chaque rôle trouvé.
 * 
 * @returns {Array<Object>} Un tableau des valeurs de chaque rôle.
 */
export async function findAll(){
    return await Role.findAll().then(resultat => {
        return resultat.map(role => role.dataValues);
    })
    .catch((error)=>{
        throw error;
    });
}

/**
 * Trouve un rôle unique en fonction des conditions spécifiées.
 * 
 * Retourne les valeurs du rôle trouvé.
 * 
 * @param {Object} p_where - Les conditions utilisées pour rechercher le rôle.
 * 
 * @returns {Object} Les valeurs du rôle trouvé.
 */
export async function findOne(p_where){
    return await Role.findOne({ where: p_where })
    .then(res => {
        return res.dataValues;
    }).catch((error) => {
        throw error;
    });
}