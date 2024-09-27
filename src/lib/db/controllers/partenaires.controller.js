import { Partenaires } from "../models/partenaires.model";

/**
 * Va chercher tous les partenaires
 *
 * @export
 * @async
 * @returns {Object}
 */
export async function findAll(){
    return await Partenaires.findAll().then(resultat => {
        return resultat.map(partenaire => partenaire.dataValues);
    })
    .catch((error)=>{
        throw error;
    });
}