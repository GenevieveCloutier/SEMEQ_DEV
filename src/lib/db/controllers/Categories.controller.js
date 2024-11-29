import { Categorie } from "../models/Categorie.model";

/**
 * Crée une nouvelle catégorie avec le nom spécifié.
 * 
 * Retourne les valeurs de la catégorie créée.
 * 
 * @param {string} p_nom - Le nom de la catégorie à créer.
 * 
 * @returns {Object} Les valeurs de la catégorie créée.
 */
export async function newCategorie(p_nom){
    Categorie.create({
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
 * Récupère toutes les catégories de la base de données.
 * 
 * Retourne un tableau contenant les valeurs de chaque catégorie trouvée.
 * 
 * @returns {Array<Object>} Un tableau des valeurs de chaque catégorie.
 */
export async function findAll(){
    return await Categorie.findAll().then(resultat => {
        return resultat.map(categorie => categorie.dataValues);
    })
    .catch((error)=>{
        throw error;
    });
};

/**
 * Trouve une catégorie unique en fonction des conditions spécifiées.
 * 
 * Retourne les valeurs de la catégorie trouvée.
 * 
 * @param {Object} p_where - Les conditions utilisées pour rechercher la catégorie.
 * 
 * @returns {Object} Les valeurs de la catégorie trouvée.
 */
export async function findOne(p_where){
    return await Categorie.findOne({ where: p_where })
    .then(res => {
        return res.dataValues;
    }).catch((error) => {
        throw error;
    });
}