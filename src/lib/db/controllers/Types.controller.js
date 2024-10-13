import { Type } from "../models/Type.model";

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