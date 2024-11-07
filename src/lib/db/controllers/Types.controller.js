import { Type } from "../models/Type.model";

/**
 * Crée un nouveau type avec le nom spécifié.
 * 
 * Retourne les valeurs du type créé.
 * 
 * @param {string} p_nom - Le nom du type à créer.
 * @returns {Object} Les valeurs du type créé.
 */
export async function newType(p_nom){
    Type.create({
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
 * Récupère tous les types de la base de données.
 * 
 * Retourne un tableau contenant les valeurs de chaque type trouvé.
 * 
 * @returns {Array<Object>} Un tableau des valeurs de chaque type.
 */
export async function findAll(){
    return await Type.findAll().then(resultat => {
        return resultat.map(type => type.dataValues);
    })
    .catch((error)=>{
        throw error;
    });
};

/**
 * Trouve un type unique en fonction des conditions spécifiées.
 * 
 * Retourne les valeurs du type trouvé.
 * 
 * @param {Object} p_where - Les conditions utilisées pour rechercher le type.
 * 
 * @returns {Object} Les valeurs du type trouvé.
 */
export async function findOne(p_where){
    return await Type.findOne({ where: p_where })
    .then(res => {
        return res.dataValues;
    }).catch((error) => {
        throw error;
    });
}