import { Type } from "../models/Type.model";

/**
 * Va chercher tous les types
 *
 * @export
 * @async
 * @returns {Object}
 */
export async function findAll(){
    return await Type.findAll().then(resultat => {
        return resultat.map(type => type.dataValues);
    })
    .catch((error)=>{
        throw error;
    });
}; 