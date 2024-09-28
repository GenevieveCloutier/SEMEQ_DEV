import { Types } from "../models/types.model";

/**
 * Va chercher tous les types
 *
 * @export
 * @async
 * @returns {Object}
 */
export async function findAll(){
    return await Types.findAll().then(resultat => {
        return resultat.map(Type => Type.dataValues);
    })
    .catch((error)=>{
        throw error;
    });
};